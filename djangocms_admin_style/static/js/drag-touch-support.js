
(function ($) {
    $.fn.touchSupport = function(){
        function touchHandler(event) {
            var touch = event.changedTouches[0];
            var simulatedEvent = document.createEvent('MouseEvent');

            simulatedEvent.initMouseEvent( {
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

        function init() {
            var that = $(this);
            for (var i = 0; i < $(this).length; i++) {
                that[i].addEventListener('touchstart', touchHandler, true);
                that[i].addEventListener('touchmove', touchHandler, true);
                that[i].addEventListener('touchend', touchHandler, true);
                that[i].addEventListener('touchcancel', touchHandler, true);
            }
        }
        init();
    };
    $('.drag-handler').touchSupport();
})(jQuery);
