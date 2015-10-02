function toggleClass (element, className) {

    var classString = element.className, nameIndex = classString.indexOf(className);

    if (!element || !className) {
        return true;
    }

    if (nameIndex == -1) {
        classString += ' ' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
    }

    element.className = classString;
}

var submenu = document.getElementsByClassName('submenu')[0];
var menuItem = document.getElementsByClassName('menu-item')[0];


menuItem.addEventListener('click', function (event) {
    event = event || window.event;
    event.preventDefault();

    toggleClass(submenu, 'menu-open');
    toggleClass(menuItem, 'menu-item-open');

});
