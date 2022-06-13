var $ = require('jquery');
var initDateTimeFields = require('./modules/datetimefields');
var initDragAndDropSupportForTreeBeard = require('./modules/drag-touch-support');
var initUIFixes = require('./modules/ui-fixes');
var initRelatedWidgetWrappers = require('./modules/related-widget-wrapper');
var initToolbarDropdown = require('./modules/toolbar-dropdown');
var initUpdateNotification = require('./modules/update-notification');
var preventDoubleFormSubmissions = require('./modules/form-submit');
var darkModeSettings = require('./modules/dark-mode');

// this attaches to global jQuery because
// we need to touch punch the things like sortedm2m
// which use django jquery
//
// also, it's a custom script, so be careful with updating
require('./modules/jquery.ui.touch-punch.min');

$(function () {
    initDateTimeFields();
    initDragAndDropSupportForTreeBeard();
    initUIFixes();
    initRelatedWidgetWrappers();
    initToolbarDropdown();
    initUpdateNotification();
    preventDoubleFormSubmissions();
    darkModeSettings();
});
