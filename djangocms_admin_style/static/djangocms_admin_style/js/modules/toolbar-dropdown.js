/**
 * @function toggleClass
 * @param {Element} element
 * @param {String} className
 * @returns {Boolean|void}
 */
function toggleClass(element, className) {
    var classString = element.className;
    var nameIndex = classString.indexOf(className);

    if (!element || !className) {
        return false;
    }

    if (nameIndex === -1) {
        classString += ' ' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }

    element.className = classString;
}

/**
 * Initializes the toolbar dropdown
 *
 * @function init
 * @public
 */
function init() {
    var submenu = document.getElementsByClassName('submenu')[0];
    var menuItem = document.getElementsByClassName('menu-item')[0];
    var html = document.getElementsByTagName('html')[0];

    if (!submenu || !menuItem) {
        return;
    }

    menuItem.addEventListener('click', function (event) {
        var evt = event || window.event;

        evt.preventDefault();

        toggleClass(submenu, 'submenu-open');
        toggleClass(menuItem, 'menu-item-open');
    });

    html.addEventListener('click', function (event) {
        if (event.target !== menuItem) {
            var submenuOpen = document.getElementsByClassName('submenu-open')[0];
            var menuItemOpen = document.getElementsByClassName('menu-item-open')[0];

            if (submenuOpen && menuItemOpen) {
                submenuOpen.className = submenuOpen.className.replace('submenu-open', '');
                menuItemOpen.className = menuItemOpen.className.replace('menu-item-open', '');
            }
        }
    });
}

module.exports = init;
