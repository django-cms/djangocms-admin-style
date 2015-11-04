(function () {
    // native javascript which opens menu on click
    function toggleClass(element, className) {

        var classString = element.className;
        var nameIndex = classString.indexOf(className);

        if (!element || !className) {
            return true;
        }

        if (nameIndex === -1) {
            classString += ' ' + className;
        } else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
        }

        element.className = classString;
    }

    var submenu = document.getElementsByClassName('submenu')[0];
    var menuItem = document.getElementsByClassName('menu-item')[0];
    var html = document.getElementsByTagName('html')[0];


    menuItem.addEventListener('click', function (event) {
        event = event || window.event;
        event.preventDefault();

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

    // Back to link
    try {
        var cmsFrameData = JSON.parse(window.name);
        var headerLink = document.getElementsByClassName('js-header-link')[0];

        if (cmsFrameData.name && cmsFrameData.name === 'cms_frame') {
            headerLink.setAttribute('href', cmsFrameData.url);
        }
    } catch (error) {

    }

    if (window.jQuery || (window.django && window.django.jQuery)) {
        // scopes the jQuery
        (function ($) {
            // waits for the document.ready
            $(function () {
                // calls touch support function
                if ($.fn.touchSupport && $('.drag-handler').length) {
                    $(window).touchSupport();
                }
                if ($('.sorted').length) {
                    var sortAmount = $('.sorted').length;
                    var tooltipTrigger = $('.sortpriority');

                    var tooltip = '';
                    for (var i = 0; i < sortAmount; i++) {
                         tooltip += '<li><a href="#">' + [i+1] + '</a></li>';
                    }
                    tooltip = '<div class="sort-tooltip"><ul>' + tooltip + '</ul></div>';

                    console.log(tooltip);

                    tooltipTrigger.on('mouseenter', function () {
                        $(this).append(tooltip)
                    });
                    tooltipTrigger.on('mouseleave', function () {
                        $('.sort-tooltip').remove();
                    });
                }

            });
        })(window.jQuery || window.django.jQuery);
    }
})();
