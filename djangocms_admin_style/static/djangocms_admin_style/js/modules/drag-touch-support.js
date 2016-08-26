if (window.jQuery || (window.django && window.django.jQuery)) {
    (function ($) {
        $.fn.touchSupport = function () {
            /**
             * Simulates mouse events out of touch events for TreeBeard
             *
             * @function touchHandler
             * @param {Event} event
             */
            function touchHandler(event) {
                var touch = event.originalEvent.changedTouches[0];
                var simulatedEvent = document.createEvent('MouseEvent');

                simulatedEvent.initMouseEvent({
                    touchstart: 'mousedown',
                    touchmove: 'mousemove',
                    touchend: 'mouseup'
                }[event.type], true, true, window, 1,
                touch.screenX, touch.screenY,
                touch.clientX, touch.clientY, false,
                false, false, false, 0, null);

                touch.target.dispatchEvent(simulatedEvent);
                event.stopPropagation();
            }

            /**
             * @function init
             * @param {jQuery} elements
             */
            function initSupport(elements) {
                elements.on({
                    touchstart: touchHandler,
                    touchmove: touchHandler,
                    touchend: touchHandler,
                    touchcancel: touchHandler
                });
            }

            initSupport(this);
        };
    })(window.jQuery || window.django.jQuery);
}

/**
 * Initializes drag'n'drop support for TreeBeard
 *
 * @function init
 * @public
 */
function init() {
    if (!window.jQuery || !window.django || !window.django.jQuery) {
        return;
    }

    // scopes the jQuery
    (function ($) {
        // calls touch support function
        if ($.fn.touchSupport && $('.drag-handler').length) {
            $(window).touchSupport();
        }
    })(window.jQuery || window.django.jQuery);
}

module.exports = init;
