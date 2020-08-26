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
 * @function hasClass
 * @param {Element} element
 * @param {String} className only accepts single class name
 * @returns {Boolean}
 */
function hasClass(element, className) {
    return !!(element.className && element.className.match(new RegExp(className)));
}

/**
 * Finds closest element that has a provided class name.
 * NOT the real "closest"
 *
 * @function closest
 * @param {Element} element html element
 * @param {String} className class name to match
 * @returns {Element|null}
 */
function closest(element, className) {
    var el = element;

    while (el && el.nodeType === 1) {
        if (hasClass(el, className)) {
            return el;
        }

        el = el.parentNode;
    }

    return null;
}

/**
 * Finds date and time inputs
 *
 * @function getDateTimeFields
 * @returns {Array<Element>}
 */
function getDateTimeFields() {
    var datetimeWidgets = document.getElementsByTagName('input');

    return arrayFrom(datetimeWidgets)
        .map(function (input) {
            if (hasClass(input, 'vDateField') || hasClass(input, 'vTimeField')) {
                return input;
            }
        })
        .filter(function (item) {
            return !!item;
        });
}

/**
 * Wraps each date and time input inside of ".datetime" into own
 * field boxes. But not the ones that already have ".fieldBox" as a parent somewhere up the tree.
 *
 * @function reorganizeMarkup
 */
function reorganizeMarkup() {
    var dateTimeFields = getDateTimeFields();

    dateTimeFields.forEach(function (field) {
        var closestBox = closest(field, 'fieldBox');
        var closestDateTime = closest(field, 'datetime');
        var closestBoxToDateTime;

        if (closestDateTime) {
            closestBoxToDateTime = closest(closestDateTime, 'fieldBox');
        }

        if (closestBoxToDateTime && closestBoxToDateTime === closestBox) {
            return;
        }

        if (!closestBox) {
            var parent = field.parentNode;

            if (!parent) {
                return;
            }

            if (hasClass(parent, 'datetime')) {
                var markup = parent.innerHTML.split(/<br ?\/*>/);

                markup.forEach(function (part) {
                    if (document.body.contains(parent)) {
                        parent.insertAdjacentHTML('beforebegin', '<div class="fieldBox">' + part + '</div>');
                    }
                });

                if (document.body.contains(parent)) {
                    parent.parentNode.removeChild(parent);
                    parent = null;
                }
            }
        }
    });
}

/**
 * Wraps first non-empty text node preceding date or time input
 * into a label.
 *
 * @function ensureLabelsExist
 */
function ensureLabelsExist() {
    var dateTimeFields = getDateTimeFields();

    dateTimeFields.forEach(function (field) {
        var closestBox = closest(field, 'datetime');

        if (!closestBox) {
            closestBox = closest(field, 'fieldBox');
        }

        if (!closestBox) {
            return;
        }

        arrayFrom(closestBox.childNodes).forEach(function (node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                var label = document.createElement('label');

                label.appendChild(document.createTextNode(node.textContent));
                node.parentNode.replaceChild(label, node);
            }
        });
    });
}

/**
 * Initialize module
 *
 * @function init
 * @public
 */
function init() {
    reorganizeMarkup();
    ensureLabelsExist();
}

module.exports = init;
