/* globals localStorage */
'use strict';

// #############################################################################
// User login via the admin panel

var helpers = require('djangocms-casper-helpers');
var globals = helpers.settings;
var cms = helpers();
var phantomcss = require('phantomcss');

casper.test.setUp(function () {});
casper.test.tearDown(function (done) {
    casper.start()
        .then(cms.logout())
        .run(done);
});

casper.test.begin('User Login (via Admin Panel)', function (test) {
    casper
        .start(globals.adminUrl, function () {
            // we explicitly kill the session id cookie to reset the login state
            // and localstorage data to reset the ui state (sideframe, toolbar, etc)
            this.page.deleteCookie('sessionid');
            this.evaluate(function () {
                localStorage.clear();
            });

            this.echo('The currently set cookies are: ' + JSON.stringify(this.page.cookies), 'INFO');
        })
        .then(function () {
            var titleRegExp = new RegExp(globals.adminTitle, 'g');

            test.assertTitleMatch(titleRegExp, 'The CMS is available and admin panel title is correct');
            test.assertExists('#login-form', 'Admin login form is available');

            this.fill('#login-form', {
                username: 'fake',
                password: 'credentials'
            }, true);
        })
        .waitForSelector('.errornote', function () {
            test.assertExists('.errornote', 'login with wrong credentials failed');

            phantomcss.screenshot('#container', 'Login form error');
        })
        .then(function () {
            this.fill('#login-form', globals.credentials, true);
        })
        .waitForResource(/login/)
        .thenOpen(globals.baseUrl, function () {
            test.assertExists('.cms-toolbar', 'Login via the admin form done');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});
