(function () {
    /**
     * DOM ready
     *
     * @function ready
     * @param {Function} fn callback
     * @returns {void}
     */
    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    /**
     * Creates arrays out of array-like collections
     *
     * @function arrayFrom
     * @param {NodeList|HTMLElementsCollection} arrayLike
     * @returns {Array}
     */
    function arrayFrom(arrayLike) {
        return [].slice.call(arrayLike);
    }

    /**
     * Finds related widget wrapper divs
     *
     * @function getRelatedWidgetWrappers
     * @returns {Array<Element>}
     */
    function getRelatedWidgetWrappers() {
        var relatedWidgetWrapperLinks = document.getElementsByClassName('related-widget-wrapper');

        return arrayFrom(relatedWidgetWrapperLinks).map(function (link) {
            return link;
        }).filter(function (item) {
            return !!item;
        });
    }

    /**
     * counts links and adds related class to updates select width
     *
     * @function addsClassNames
     */
    function addsClassNames() {
        var relatedWidgetWrappers = getRelatedWidgetWrappers();

        relatedWidgetWrappers.forEach(function (wrapper) {
            var links = wrapper.getElementsByClassName('related-widget-wrapper-link');

            if (links.length === 1) {
               wrapper.classList.add('widget-wrapper-links-1');
            } else if (links.length === 2) {
                wrapper.classList.add('widget-wrapper-links-2');
            } else {
               wrapper.classList.add('widget-wrapper-links-3');
            }
        });
    }

    ready(function () {
        addsClassNames();
    });
})();
