var $ = require('jquery');

/**
 * init various UI fixes
 *
 * @function init
 * @public
 */
function init() {
    var toplinks = $('.toplinks');

    // this has to be done by javascript because we don't change html markup
    // floats toolbar if actions are visible #275, #285
    if ($('#changelist-form').find('.actions').length) {
        $('#toolbar').addClass('actions-visible');
    }

    // adds class to toplinks if list is empty to remove unnecessary space
    if (toplinks.children().length === 0 && toplinks.parent().hasClass('xfull')) {
        toplinks.parent().addClass('hidden');
    }
}

module.exports = init;
