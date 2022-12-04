/**
 * Get top most window (from iframe)
 *
 * @function getTopWindow
 * @returns {window}
 */
function getTopWindow() {
    var cms_window = window;

    while (cms_window.parent !== cms_window) {
        cms_window = cms_window.parent;
    }
    return cms_window;
}

/**
 * Get color scheme from CMS settings
 *
 * @function getColorSchemeFromSettings
 * @param {object} CMS
 * @returns {string}
 */
function getColorSchemeFromSettings(CMS) {
    var colorScheme;

    if (CMS.settings && CMS.settings.color_scheme) {
        // Use color_scheme from settings.py
        colorScheme = CMS.settings.color_scheme;
    } else if (CMS.config && CMS.config.color_scheme) {
        // If overwritten by config use config. This is the toggle button
        colorScheme = CMS.config.color_scheme;
    }
    return colorScheme;
}

/**
 * Get color scheme from parent document (if in iframe) else set to white
 *
 * @function darkModeSettings
 * @returns {void}
 */
function darkModeSettings() {
    if (!document.documentElement.dataset.colorScheme) {
        var colorScheme = 'auto'; // Default mode
        var cms_window = getTopWindow();

        if (cms_window.CMS) {
            colorScheme = getColorSchemeFromSettings(cms_window.CMS);
        } else if (window.localStorage) {
            // CMS not loaded: set color scheme for admin site according to settings
            colorScheme = JSON.parse(localStorage.getItem('cms_cookie') || '{}').color_scheme;
        }
        if (colorScheme === 'auto' || colorScheme === undefined) {
            delete document.documentElement.dataset.colorScheme;
        } else {
            document.documentElement.dataset.colorScheme = colorScheme;
        }
    }
}

module.exports = darkModeSettings;
