/**
 * Get color scheme from parent document (if in iframe) else set to white
 *
 * @function darkModeSettings
 * @returns {void}
 */
function darkModeSettings() {
    if (!document.documentElement.dataset.colorScheme) {
        var colorScheme = 'light'; // Default mode
        var cms_window = window;

        while (cms_window.parent !== cms_window) {
            cms_window = cms_window.parent;
        }
        if (cms_window.CMS && cms_window.CMS.config) {
            if (cms_window.CMS.settings.color_scheme) {
                // Use color_scheme from settings.py
                colorScheme = cms_window.CMS.settings.color_scheme;
            } else if (cms_window.CMS.config.color_scheme) {
                // If overwritten by config use config. This is the toggle button
                colorScheme = cms_window.CMS.config.color_scheme;
            }
        }
        if (colorScheme !== 'auto') {
            document.documentElement.dataset.colorScheme = colorScheme;
        }
    }
}

module.exports = darkModeSettings;
