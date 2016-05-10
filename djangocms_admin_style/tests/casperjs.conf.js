'use strict';
var phantomcss = require('phantomcss');

// #############################################################################
// CasperJS options

module.exports = {
    init: function () {
        this.viewportSize();
        this.timeout(20000);
        this.phantomcss();
    },

    viewportSize: function (width, height) {
        var viewportWidth = width || 1280;
        var viewportHeight = height || 1024;

        casper.echo('Current viewport size is ' + viewportWidth + 'x' + viewportHeight + '.', 'INFO');

        casper.options.viewportSize = {
            width: viewportWidth,
            height: viewportHeight
        };
    },
    phantomcss: function () {
        phantomcss.init({
            libraryRoot: './node_modules/phantomcss',
            screenshotRoot: './screenshots/reference',
            failedComparisonsRoot: './screenshots/failures',
            comparisonResultRoot: './screenshots/results',
            cleanupComparisonImages: true,
            mismatchTolerance: 0.05,
            onPass: function (test) {
                casper.test.pass('No changes found for screenshot ' + test.filename);
            },
            fileNameGetter: function (root, filename) {
                 // globally override output filename
                 // files must exist under root
                 // and use the .diff convention
                 var name = root + '/' + filename.replace(/\s+/g, '-').toLowerCase();

                 if (fs.isFile(name + '.png')) {
                     return name + '.diff.png';
                 } else {
                     return name + '.png';
                 }
            },
            onComplete: function (allTests, noOfFails, noOfErrors) {
                allTests.forEach(function (test) {
                    if (test.fail) {
                        console.log(test.filename, test.mismatch);
                    }
                });
            },
            outputSettings: {
                errorColor: {
                    red: 255,
                    green: 0,
                    blue: 0
                },
                errorType: 'movement',
                transparency: 0.3
            }
        });
    },

    timeout: function (timeout) {
        casper.options.waitTimeout = timeout || 10000;
    }
};
