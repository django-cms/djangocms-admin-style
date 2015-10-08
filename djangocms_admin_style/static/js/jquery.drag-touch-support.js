
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
            event.preventDefault();
        }

        function init() {
            var dragHandlers = $('.drag-handler');
            var dragHandler = dragHandlers[0];
            console.log(dragHandler);
            for (var i = 0; i < dragHandler.length; i++) {
                dragHandler[i].addEventListener('touchstart', touchHandler, true);
                dragHandler[i].addEventListener('touchmove', touchHandler, true);
                dragHandler[i].addEventListener('touchend', touchHandler, true);
                dragHandler[i].addEventListener('touchcancel', touchHandler, true);
            }

        }

        init();

    };

    $('.drag-handler').touchSupport();
})(jQuery);
