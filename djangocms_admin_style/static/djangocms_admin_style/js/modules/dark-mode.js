/**
 * Get color scheme from parent document (if in iframe) else set to white
 *
 * @function darkModeSettings
 * @returns {void}
 */
function darkModeSettings() {
    if (!document.documentElement.dataset.colorScheme) {
        var colorScheme = 'auto'; // Default mode
        var cms_window = window;

        while (cms_window.parent !== cms_window) {
            cms_window = cms_window.parent;
        }
        if (cms_window.CMS) {
            if (cms_window.CMS.settings && cms_window.CMS.settings.color_scheme) {
                // Use color_scheme from settings.py
                colorScheme = cms_window.CMS.settings.color_scheme;
            } else if (cms_window.CMS.config && cms_window.CMS.config.color_scheme) {
                // If overwritten by config use config. This is the toggle button
                colorScheme = cms_window.CMS.config.color_scheme;
            }
        } else if (window.localStorage) {
            // CMS not loaded: set color scheme for admin site according to settings
            colorScheme = JSON.parse(localStorage.getItem('cms_cookie') || '{}').color_scheme;
        }
        if (colorScheme === 'auto') {
            delete document.documentElement.dataset.colorScheme;
        } else {
            document.documentElement.dataset.colorScheme = colorScheme;
        }
    }
}

module.exports = darkModeSettings;
