/* globals localStorage */
'use strict';

// #############################################################################
// User login via the admin panel

var helpers = require('djangocms-casper-helpers');
var globals = helpers.settings;
var cms = helpers();
var phantomcss = require('phantomcss');

casper.test.setUp(function (done) {
    casper.start().then(cms.login()).run(done);
});
casper.test.tearDown(function (done) {
    casper.start().then(cms.logout()).run(done);
});

casper.test.begin('Pagetree', function (test) {
    casper
        .start(globals.adminUrl)
        .waitForSelector('.dashboard', function () {
            test.assertExists('.model-page', 'Pages menu link exists');

            this.click('.model-page a[href$="/en/admin/cms/page/"]');
        })

        // go to the pagetree overview
        .waitUntilVisible('.cms-pagetree-empty', function () {
            test.assertExists('.cms-pagetree-empty em', 'There is no page around yet.');
            test.assertExists('.cms-pagetree a[href$="/en/admin/cms/page/add/"]', 'Page can be added.');
        })
        .thenEvaluate(function () {
            if (window.django && window.django.jQuery('.sticky').length) {
                window.django.jQuery('.sticky').remove();
            }
        })
        .then(function () {
            phantomcss.screenshot('html', 'pagetree empty');
        })

        // now we want to add a new page and populate the data
        .then(function () {
            this.click('.cms-pagetree a[href$="/en/admin/cms/page/add/"]');
        })
        .waitForSelector('#page_form', function () {
            test.assertExists('#page_form', 'Form is displayed.');
        })
        .thenEvaluate(function () {
            if (window.django && window.django.jQuery('.sticky').length) {
                window.django.jQuery('.sticky').remove();
            }
        })
        .then(function () {
            phantomcss.screenshot('html', 'add page');
        })

        // populate the pagetree and save
        .then(function () {
            this.fill('#page_form', {
                title: globals.content.page.title,
                slug: 'first_page'
            }, true);
        })
        .waitUntilVisible('.cms-pagetree-container', function () {
            test.assertExists('.jstree-container-ul', 'Pagetree is rendered.');
        })
        .thenEvaluate(function () {
            if (window.django && window.django.jQuery('.sticky').length) {
                window.django.jQuery('.sticky').remove();
            }
        })
        .then(function () {
            phantomcss.screenshot('html', 'pagetree populated');
        })

        // compare screenshots
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});
