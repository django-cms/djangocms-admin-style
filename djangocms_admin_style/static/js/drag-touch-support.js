if (window.jQuery || (window.django && window.django.jQuery)) {
    (function ($) {
        $.fn.touchSupport = function () {
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

            function init(elements) {
                elements.on({
                    touchstart: touchHandler,
                    touchmove: touchHandler,
                    touchend: touchHandler,
                    touchcancel: touchHandler
                });
            }

            init(this);
        };
    })(window.jQuery || window.django.jQuery);
}
