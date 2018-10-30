var $ = require('jquery');

// eslint-disable-next-line
function preventDoubleFormSubmissions() {
    $(document).on('submit', 'form', function (e) {
        if (e.isDefaultPrevented()) {
            return;
        }
        var form = $(e.target);

        form.on('submit', function (event) {
            event.preventDefault();
        });
    });
}

module.exports = preventDoubleFormSubmissions;
