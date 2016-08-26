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

        if (links && links.length) {
            wrapper.className += ' widget-wrapper-links-' + links.length;
        }
    });
}

/**
 * init related widget wrappers
 *
 * @public
 */
function init() {
    addsClassNames();
}

module.exports = init;
