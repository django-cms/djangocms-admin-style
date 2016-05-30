(function () {
    /**
     * DOM ready
     *
     * @function ready
     * @param {Function} fn callback
     * @returns {void}
     */
    function ready(fn) {
        if (document.readyState !== 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /**
     * Creates arrays out of array-like collections
     *
     * @function arrayFrom
     * @param {NodeList|HTMLElementsCollection|...} arrayLike
     * @returns {Array<T>}
     */
    function arrayFrom(arrayLike) {
        return [].slice.call(arrayLike);
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
        while (element && element.nodeType === 1) {
            if (element.classList.contains(className)) {
                return element;
            }

            element = element.parentNode;
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

        return arrayFrom(datetimeWidgets).map(function (input) {
            if (input.classList.contains('vDateField') || input.classList.contains('vTimeField')) {
                return input;
            }
        }).filter(function (item) {
            return item;
        });
    }

    /**
     * Wraps each date and time input inside of ".datetime" into own
     * field boxes.
     *
     * @function reorganizeMarkup
     */
    function reorganizeMarkup() {
        var dateTimeFields = getDateTimeFields();

        dateTimeFields.forEach(function (field) {
            var closestBox = closest(field, 'field-box');

            if (!closestBox) {
                var parent = field.parentNode;

                if (!parent) {
                    return;
                }

                if (parent.classList.contains('datetime')) {
                    var markup = parent.innerHTML.split(/<br ?\/*>/);

                    markup.forEach(function (part) {
                        if (document.body.contains(parent)) {
                            parent.insertAdjacentHTML('beforebegin', '<div class="field-box">' + part + '</div>');
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
            var closestBox = closest(field, 'field-box');

            arrayFrom(closestBox.childNodes).forEach(function (node) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                    var label = document.createElement('label');
                    label.appendChild(document.createTextNode(node.textContent));
                    node.parentNode.replaceChild(label, node);
                }
            });
        });
    }

    ready(function () {
        reorganizeMarkup();
        ensureLabelsExist();
    });
})();
