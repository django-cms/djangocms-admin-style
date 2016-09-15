var $ = require('jquery');
var Cookies = require('js-cookie');
var RELEASES_URL = 'https://releases.django-cms.org/';
var MAIN_COOKIE_EXPIRATION = 365; // ~1 year
var REQUEST_COOKIE_EXPIRATION = 14; // check only every two weeks

/**
 * @function getLatestVersionData
 * @private
 * @param {Object} data additional data to send as get params
 * @returns {$.Deferred}
 */
function getLatestVersionData(data) {
    return $.ajax({
        url: RELEASES_URL,
        data: data
    });
}

/**
 * @function compareVersion
 * @param {String} a
 * @param {String} b
 * @returns {Number}
 */
function compareVersion(a, b) {
    var i;
    var cmp;
    var len;
    var re = /(\.0)+[^\.]*$/;

    a = (a + '').replace(re, '').split('.'); // eslint-disable-line no-param-reassign
    b = (b + '').replace(re, '').split('.'); // eslint-disable-line no-param-reassign
    len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        cmp = parseInt(a[i], 10) - parseInt(b[i], 10);

        if (cmp !== 0) {
            return cmp;
        }
    }

    return a.length - b.length;
}

/**
 * is first version greater than second version?
 *
 * @function greaterThanVersion
 * @param {String} a
 * @param {String} b
 * @returns {Boolean} true if a > b or a === b but a is a dev/rc version
 */
function greaterThanVersion(a, b) {
    var cmp = compareVersion(a, b);

    if (cmp > 0) {
        return true;
    } else if (cmp === 0) {
        if (b.match(/[^\.\d]+/)) {
            return true;
        }
        return false;
    }

    return false;
}

/**
 * @function injectMessage
 * @param {Object} versionObject
 * @param {String} versionObject.version
 * @param {String} versionObject.url
 * @param {String} checkType patch or minor/major
 */
function injectMessage(versionObject, checkType) {
    var messageTmpl = $($('#cms-update-notification').html());

    messageTmpl.find('.js-latest-version').text(versionObject.version);
    messageTmpl.find('.js-release-notes-link').attr('href', versionObject.url);
    messageTmpl.find('.close').on('click', function (e) {
        e.preventDefault();

        Cookies.set(
            'cms_upgrade_notification_closed',
            JSON.stringify({
                version: versionObject.version,
                type: checkType
            }),
            {
                expires: MAIN_COOKIE_EXPIRATION
            }
        );

        Cookies.set(
            'cms_upgrade_notification_closed_recently',
            true,
            {
                expires: REQUEST_COOKIE_EXPIRATION
            }
        );

        messageTmpl.slideUp('fast', function () {
            messageTmpl.remove();
        });
    });

    messageTmpl.prependTo('#content').slideDown('fast');
}

/**
 * @function shouldShowMessage
 * @private
 * @param {Object} versionObj
 * @param {String} versionObj.version
 * @param {String} currentVersion
 * @param {String} checkType
 * @returns {Boolean}
 */
function shouldShowMessage(versionObj, currentVersion, checkType) {
    var cookie = Cookies.get('cms_upgrade_notification_closed');

    if (cookie) {
        cookie = JSON.parse(cookie);
    }

    if (cookie && cookie.type === checkType && cookie.version === versionObj.version) {
        return false;
    }

    return greaterThanVersion(versionObj.version, currentVersion);
}

/**
 * @function init
 * @public
 */
function init() {
    var metaVersion = $('meta[name="djangocms_version"]');

    if (!metaVersion.length || Cookies.get('cms_upgrade_notification_closed_recently')) {
        return;
    }

    var currentVersion = metaVersion.attr('content');
    var checkType = $('meta[name="djangocms_version_check_type"]').attr('content');

    getLatestVersionData({
        version: currentVersion,
        type: checkType
    }).done(function (response) {
        if (typeof response === 'string') {
            try {
                // eslint-disable-next-line
                response = JSON.parse(response);
            } catch (e) { }
        }

        var versionObj = response.latest;

        if (checkType === 'patch') {
            response.patches.forEach(function (patch) {
                if (patch.version.match(new RegExp('^' + currentVersion.replace(/\.[^\.]+$/, '')))) {
                    versionObj = patch;
                }
            });
        }

        if (shouldShowMessage(versionObj, currentVersion, checkType)) {
            injectMessage(versionObj, checkType);
        }
    });
}

module.exports = init;
