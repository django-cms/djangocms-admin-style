/* globals localStorage */
'use strict';

// #############################################################################
// User login via the admin panel

var helpers = require('djangocms-casper-helpers');
var globals = helpers.settings;
var cms = helpers();
var phantomcss = require('phantomcss');

casper.test.setUp(function (done) {
    casper.start()
        .then(cms.login())
        .run(done);
});
casper.test.tearDown(function (done) {
    casper.start()
        .then(cms.logout())
        .run(done);
});

casper.test.begin('Dashboard view', function (test) {
    casper
        .start(globals.adminUrl)
        .waitForSelector('.dashboard', function () {
            test.assertExists('.dashboard', 'dashboard exists');

            phantomcss.screenshot('html', 'Dashboard');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});
