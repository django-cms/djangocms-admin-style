/* globals localStorage */
'use strict';

// #############################################################################
// User login via the admin panel

var globals = require('./settings/globals');
var cms = require('./helpers/cms')();
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

casper.test.begin('User Login (via Admin Panel)', function (test) {
    casper
        .start(globals.adminUrl)
        .waitForSelector('.dashboard', function () {
            test.assertExists('.dashboard', 'dashboard exists');

            phantomcss.screenshot('.dashboard', 'Dashboard');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});
