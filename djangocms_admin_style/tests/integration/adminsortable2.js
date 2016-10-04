'use strict';

var helpers = require('djangocms-casper-helpers');
var globals = helpers.settings;
var casperjs = require('casper');
var cms = helpers(casperjs);
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

casper.test.begin('Creation / deletion of the apphook', function (test) {
    casper
        .start(globals.adminUrl)
        .waitUntilVisible('#content', function () {
            test.assertVisible('#content', 'Admin loaded');

            this.click(
                xPath(cms.getXPathForAdminSection({
                    section: 'Aldryn Jobs',
                    row: 'Aldryn Jobs configurations',
                    link: 'Add'
                }))
            );
        })
        .waitForUrl(/add/)
        .waitUntilVisible('#jobsconfig_form')
        .then(function () {
            test.assertVisible('#jobsconfig_form', 'Apphook creation form loaded');

            this.fill('#jobsconfig_form', {
                namespace: 'Test namespace'
            }, true);
        })
        .waitUntilVisible('.success', function () {
            test.assertSelectorHasText(
                '.success',
                'The Aldryn Jobs configuration "Jobs / Test namespace" was added successfully.',
                'Apphook config has been created'
            );

            test.assertElementCount(
                '#result_list tbody tr',
                2,
                'There are 2 apphooks now'
            );

            phantomcss.screenshot('html', 'Apphooks');
        })
        .then(function () {
            this.clickLabel('Jobs / Test namespace', 'a');
        })
        .waitUntilVisible('.deletelink', function () {
            this.click('.deletelink');
        })
        .waitForUrl(/delete/, function () {
            this.click('input[value="Yes, I\'m sure"]');
        })
        .waitUntilVisible('.success', function () {
            test.assertSelectorHasText(
                '.success',
                'The Aldryn Jobs configuration "Jobs / Test namespace" was deleted successfully.',
                'Apphook config has been deleted'
            );
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});

[
    [800, 1024],
    [768, 1024],
    [480, 1024],
    [1280, 1024]
].forEach(function (dimensions) {
    casper.test.begin('Apphook config list ' + JSON.stringify(dimensions), function (test) {
        casper
            .start(globals.adminUrl)
            .viewport(dimensions[0], dimensions[1])
            .then(function () {
                this.click(
                    xPath(cms.getXPathForAdminSection({
                        section: 'Aldryn Jobs',
                        row: 'Aldryn Jobs configurations'
                    }))
                );
            })
            .waitForSelector('#result_list')
            .then(function () {
                phantomcss.screenshot('html', 'Apphooks ' + dimensions[0]);
            })
            .then(function () {
                phantomcss.compareSession();
            })
            .run(function () {
                test.done();
            });
    });
});

casper.test.begin('Creation of a new jobs category', function (test) {
    casper
        .start(globals.adminUrl)
        .waitUntilVisible('#content', function () {
            this.click(
                xPath(cms.getXPathForAdminSection({
                    section: 'Aldryn Jobs',
                    row: 'Job categories',
                    link: 'Add'
                }))
            );
        })
        .waitForUrl(/add/)
        .waitUntilVisible('#jobcategory_form')
        .then(function () {
            test.assertVisible('#jobcategory_form', 'Jobs category creation form has been loaded');

            phantomcss.screenshot('html', 'Job category form');
        })
        .then(function () {
            this.fill('#jobcategory_form', {
                name: 'Test category'
            }, true);
        })
        .waitUntilVisible('.success', function () {
            test.assertSelectorHasText(
                '.success',
                'The job category "Test category" was added successfully.',
                'New jobs category has been created'
            );

            phantomcss.screenshot('html', 'Job category list');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});

casper.test.begin('Creation of a new job opening', function (test) {
    casper
        .start(globals.adminUrl)
        .waitUntilVisible('#content', function () {
            this.click(
                xPath(cms.getXPathForAdminSection({
                    section: 'Aldryn Jobs',
                    row: 'Job openings',
                    link: 'Add'
                }))
            );
        })
        .waitForUrl(/add/)
        .waitUntilVisible('#jobopening_form')
        .then(function () {
            test.assertVisible('#jobopening_form', 'Job opening creation form has been loaded');
        })
        .wait(2000, function () {
            phantomcss.screenshot('html', 'Job opening form');
        })
        .then(function () {
            this.fill('#jobopening_form', {
                title: 'Test job',
                category: 'Jobs / aldryn_jobs / Test category'
            }, false);
        })
        .wait(3000, function () {
            this.click('input[value="Save and add another"]');
        })
        .waitUntilVisible('.success', function () {
            test.assertSelectorHasText(
                '.success',
                'The job opening "Test job" was added successfully.',
                'New job opening has been created'
            );

            this.fill('#jobopening_form', {
                title: 'Test job 2',
                category: 'Jobs / aldryn_jobs / Test category'
            }, true);
        })
        .waitUntilVisible('.success', function () {
            phantomcss.screenshot('html', 'job openings list');
        })
        .then(function () {
            this.click('.column-category.sortable .text a');
        })
        .waitUntilVisible('.sortpriority', function () {
            phantomcss.screenshot('html', 'different sorting');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});

casper.test.begin('Submission of a job opening', function (test) {
    casper.start()
        .then(cms.addPage({ title: 'Home' }))
        .then(cms.addPage({ title: 'Jobs' }))
        .then(cms.addApphookToPage({
            page: 'Jobs',
            apphook: 'JobsApp'
        }))
        .then(cms.publishPage({
            page: 'Jobs'
        }))
        .thenOpen(globals.baseUrl + 'jobs/')
        .waitForSelector('article', function () {
            this.clickLabel('Test job');
        })
        .waitForSelector('form', function () {
            this.fill('form', {
                salutation: 'male',
                first_name: 'Vadim',
                last_name: 'Sikora',
                email: 'vadim.sikora@divio.com',
                cover_letter: 'Oh boy, I am amazing!'
            }, true);
        })
        .waitForSelector('.cms-messages-inner', function () {
            test.assertSelectorHasText('.cms-messages-inner', 'You have successfully applied for');
        })
        .thenOpen(globals.adminUrl)
        .waitUntilVisible('#content', function () {
            this.click(
                xPath(cms.getXPathForAdminSection({
                    section: 'Aldryn Jobs',
                    row: 'Job openings',
                    link: 'Change'
                }))
            );
        })
        .waitForUrl(/jobopening/)
        .waitForSelector('#changelist-form', function () {
            this.clickLabel('Test job');
        })
        .waitUntilVisible('#jobopening_form')
        .wait(2000, function () {
            phantomcss.screenshot('html', 'Job opening with submissions');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .then(cms.removePage())
        .then(cms.removePage())
        .run(function () {
            test.done();
        });
});

casper.test.begin('Deletion of a job opening', function (test) {
    casper
        .start(globals.adminUrl)
        .waitUntilVisible('#content', function () {
            this.click(
                xPath(cms.getXPathForAdminSection({
                    section: 'Aldryn Jobs',
                    row: 'Job openings',
                    link: 'Change'
                }))
            );
        })
        .waitForUrl(/jobopening/)
        .waitForSelector('#changelist-form', function () {
            this.click('th input[type="checkbox"]');
            this.fill('#changelist-form', {
                action: 'delete_selected'
            }, true);

        })
        .waitForSelector('.delete-confirmation', function () {
            this.click('input[value="Yes, I\'m sure"]');
        })
        .waitForSelector('.success', function () {
            phantomcss.screenshot('html', 'Empty Job opening list');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});

casper.test.begin('Deletion of a job category', function (test) {
    casper
        .start(globals.adminUrl)
        .waitUntilVisible('#content', function () {
            this.click(
                xPath(cms.getXPathForAdminSection({
                    section: 'Aldryn Jobs',
                    row: 'Job categories',
                    link: 'Change'
                }))
            );
        })
        .waitForUrl(/jobcategory/)
        .waitUntilVisible('#result_list', function () {
            test.assertElementCount(
                '#result_list tbody tr',
                1,
                'The job category is available'
            );

            this.clickLabel('Test category', 'a');
        })
        .waitUntilVisible('.deletelink', function () {
            this.click('.deletelink');
        })
        .waitForUrl(/delete/, function () {
            this.click('input[value="Yes, I\'m sure"]');
        })
        .waitUntilVisible('.success', function () {
            test.assertSelectorHasText(
                '.success',
                'The job category "Test category" was deleted successfully.',
                'The job category has been deleted'
            );
        })
        .thenOpen(globals.adminUrl, function () {
            phantomcss.screenshot('html', 'Dashboard with actions');
        })
        .then(function () {
            phantomcss.compareSession();
        })
        .run(function () {
            test.done();
        });
});
