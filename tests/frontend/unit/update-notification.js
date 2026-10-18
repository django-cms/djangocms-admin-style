'use strict';

// Run with: node tests/frontend/unit/update-notification.js

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var sourcePath = path.resolve(__dirname,
    '../../../djangocms_admin_style/static/djangocms_admin_style/js/modules/update-notification.js');

/**
 * Run the updater with the admin page's meta tags and an isolated release response.
 * @param {String} checkType
 * @param {Object} cookies
 * @param {String} version
 * @returns {Object}
 */
function run(checkType, cookies, version) {
    var result = { requests: [], cookies: cookies || {}, shown: false };
    var message = {
        find: function () {
            return {
                text: function (value) {
                    result.version = value;
                },
                attr: function (name, value) {
                    result.url = value;
                },
                on: function (event, handler) {
                    result.close = handler;
                }
            };
        },
        prependTo: function () {
            result.shown = true; return message;
        },
        slideDown: function () {},
        slideUp: function (speed, done) {
            done();
        },
        remove: function () {
            result.removed = true;
        }
    };
    /**
     * Supply the selectors used by the supported admin-page updater.
     * @param {String} selector
     * @returns {Object}
     */
    function jquery(selector) {
        if (selector === 'meta[name="djangocms_version"]') {
            return { length: version === null ? 0 : 1, attr: function () {
                return version || '3.11.1';
            } };
        }
        if (selector === 'meta[name="djangocms_version_check_type"]') {
            return { attr: function () {
                return checkType;
            } };
        }
        if (selector === '#cms-update-notification') {
            return { html: function () {
                return '<div>update</div>';
            } };
        }
        assert.strictEqual(selector, '<div>update</div>');
        return message;
    }

    jquery.ajax = function (options) {
        result.requests.push(options);
        return { done: function (handler) {
            handler({ releases: { '3.11.1': [], '3.11.2': [], '3.12.0': [], '3.13.0rc1': [], '4.0.0': [] } });
        } };
    };
    var context = { module: { exports: {} }, require: function (name) {
        if (name === 'jquery') {
            return jquery;
        }
        assert.strictEqual(name, 'js-cookie');
        return {
            get: function (key) {
                return result.cookies[key];
            },
            set: function (key, value, options) {
                result.cookies[key] = value;
                result[key + '_expires'] = options.expires;
            }
        };
    } };

    vm.runInNewContext(fs.readFileSync(process.argv[2] || sourcePath, 'utf8'), context,
        { filename: sourcePath, timeout: 1000 });
    context.module.exports();
    return result;
}

var patch = run('patch');

assert.strictEqual(patch.requests.length, 1);
assert.strictEqual(patch.requests[0].url, 'https://pypi.org/pypi/django-cms/json');
assert.strictEqual(Object.prototype.hasOwnProperty.call(patch.requests[0], 'data'), false);
assert.strictEqual(patch.version, '3.11.2');
assert.strictEqual(patch.url, 'https://github.com/django-cms/django-cms/blob/3.11.2/CHANGELOG.rst');
patch.close({ preventDefault: function () {} });
assert.deepStrictEqual(JSON.parse(patch.cookies.cms_upgrade_notification_closed), { version: '3.11.2', type: 'patch' });
assert.strictEqual(patch.cms_upgrade_notification_closed_expires, 365);
assert.strictEqual(patch.cms_upgrade_notification_closed_recently_expires, 14);
assert.strictEqual(patch.removed, true);
assert.strictEqual(run('patch', patch.cookies).requests.length, 0);
assert.strictEqual(run('patch', {
    cms_upgrade_notification_closed: '{"version":"3.11.2","type":"patch"}'
}).shown, false);
assert.strictEqual(run('minor', {
    cms_upgrade_notification_closed: '{"version":"3.11.2","type":"patch"}'
}).version, '3.12.0');
assert.strictEqual(run('minor', {}, null).requests.length, 0);
assert.strictEqual(run('patch', {}, '3.12.0').shown, false);
assert.strictEqual(run('patch', {}, '3.12.0').requests.length, 1);
process.stdout.write('update-notification: request, patch/minor selection, dismissal and suppression passed\n');
