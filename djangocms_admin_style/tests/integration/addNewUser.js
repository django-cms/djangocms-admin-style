/* globals localStorage */
'use strict';

// #############################################################################
// User login via the admin panel

var helpers = require('djangocms-casper-helpers');
var globals = helpers.settings;
var cms = helpers();
var casperjs = require('casper');
var xPath = casperjs.selectXPath;
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

casper.test.begin('Add new user', function (test) {
    casper
        .start(globals.adminUrl)
        .waitForSelector('.dashboard', function () {

            test.assertExists('.addlink', 'Add User Button exists');

            // clicks on add user
            this.click('.model-user a[href$="/en/admin/auth/user/add/"]');
        })

        // inserts the username and pw in the form fields
        .waitUntilVisible('.form-row', function () {
            test.assertExists('#user_form', 'Username input field exists');
        })
        .wait(1000)
        .then(function () {
            phantomcss.screenshot('html', 'add user form');

            this.fill('#user_form', {
                username: globals.user.username,
                password1: globals.user.password,
                password2: globals.user.password
            }, true);
        })

        .waitForSelector('#user_form', function () {
            test.assertField(
                'username',
                globals.user.username,
                'Username has been added'
            );
        })
        .waitForSelector('.success', function () {

            test.assertExists('.success', 'The user was added successfully. You may edit it again below.');

            // adds firs name, last name, email and enables superuser and stuff
            this.fill('#user_form', {
                first_name: globals.user.firstName,
                last_name: globals.user.lastName,
                email: globals.user.userEmail,
                is_staff: true,
                is_superuser: true
            }, true);
        })

        // checks if the user has been added to the list
        .waitForSelector('#changelist-form', function () {
            test.assertSelectorHasText(
                '#changelist-form .field-email',
                globals.user.userEmail,
                'The User has been updated'
            );

            phantomcss.screenshot('html', 'user list success');
        })

        .waitForSelector('.field-username', function () {
            this.mouse.click(
                // xPath searches the th tag with an a tag which contains the name of the user "test-add-user"
                xPath('//th[@class="field-username"][./a[text()[contains(.,"test-add-user")]]]/a')
            );
        })

        // delete button gets clicked
        .waitForSelector('#user_form', function () {
            test.assertExists('#user_form', 'User Form has been loaded');
            this.click('.deletelink');
        })

        .waitForSelector('.delete-confirmation', function () {
            test.assertExists('.delete-confirmation', 'Delete confirmation exists');

            phantomcss.screenshot('html', 'user delete confirmation');
        })

        // confirming that the user gets deleted
        .waitForSelector('.delete-confirmation', function () {
            test.assertExists('.delete-confirmation', 'Delete button clicked confirmed');

            this.click('input[type="submit"]');
        })

        // checks if user is removed from the list
        .waitForSelector('.success', function () {
            test.assertDoesntExist(
                xPath('//th[@class="field-username"][./a[text()[contains(.,"test-add-user")]]]'),
                'deleted successfully');
        })
        // logins again with the admin user
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});
