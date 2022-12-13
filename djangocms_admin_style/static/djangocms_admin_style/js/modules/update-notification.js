var $ = require('jquery');
var Cookies = require('js-cookie');
var RELEASES_URL = 'https://pypi.org/pypi/django-cms/json';
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
    if (versionObj !== undefined) {
        var cookie = Cookies.get('cms_upgrade_notification_closed');

        if (cookie) {
            cookie = JSON.parse(cookie);
        }
        if (cookie && cookie.type === checkType && cookie.version === versionObj.version) {
            return false;
        }
        return greaterThanVersion(versionObj.version, currentVersion);
    }
    return false;
}

/**
 * @function getVersionObject
 * @private
 * @param {Object} versions
 * @param {String} currentVersion
 * @param {String} checkType
 * @returns {Object}
 */
function getVersionObject(versions, currentVersion, checkType) {
    var comparison = currentVersion.split('rc')[0].split('.');
    var version;
    var c;

    for (var v in versions) {
        if (!v.includes('rc')) {
            c = v.split('.');
            if (c[0] === comparison[0] && (checkType !== 'patch' || c[1] === comparison[1])) {
                if (version === undefined || greaterThanVersion(v, version)) {
                    version = v;
                }
            }
        }
    }
    if (version) {
        return {
            version: version,
            url: 'https://github.com/django-cms/django-cms/blob/' + version + '/CHANGELOG.rst'
        };
    }
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

    var currentVersion = metaVersion.attr('content').split('rc')[0];
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

        var versionObj = getVersionObject(response.releases, currentVersion, checkType);

        if (shouldShowMessage(versionObj, currentVersion, checkType)) {
            injectMessage(versionObj, checkType);
        }
    });
}

module.exports = init;
