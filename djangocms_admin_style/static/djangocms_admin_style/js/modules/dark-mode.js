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

    if (!CMS) {
        return;
    }

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
    var colorScheme = document.documentElement.dataset.theme;

    if (!colorScheme) {
        colorScheme = localStorage.getItem('theme');
        if (!colorScheme) {
            if (!document.documentElement.dataset.colorScheme) {
                var cms_window = getTopWindow();

                if (cms_window.CMS) {
                    colorScheme = getColorSchemeFromSettings(cms_window.CMS);
                } else {
                    // CMS not loaded: set color scheme for admin site according to settings
                    colorScheme = JSON.parse(localStorage.getItem('cms_cookie') || '{}').color_scheme;
                }
            }
        }
    }
    if (colorScheme) {
        document.documentElement.dataset.theme = colorScheme;
    }
}

module.exports = darkModeSettings;
