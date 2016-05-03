/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';

// #############################################################################
// #IMPORTS#
var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var gulpif = require('gulp-if');
var karma = require('karma').server;
var sass = require('gulp-sass');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var protractor = require('gulp-protractor').protractor;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

var argv = require('minimist')(process.argv.slice(2));

// #############################################################################
// #SETTINGS#
var options = {
    debug: argv.debug
};
var PROJECT_ROOT = __dirname;
var PROJECT_PATH = {
    'sass': PROJECT_ROOT + '/djangocms_admin_style/sass',
    'css': PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/css',
    'tests': PROJECT_ROOT + 'djangocms_admin_style/tests',
    'icons': PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/fonts'
};

var PROJECT_PATTERNS = {
    'sass': [
        PROJECT_PATH.sass + '/**/*.{scss,sass}'
    ],
    icons: [
        PROJECT_PATH.icons + '/src/*.svg'
    ]
};

var INTEGRATION_TESTS = [
    [
        'loginAdmin',
        'toolbar',
        'addFirstPage',
        'wizard',
        'editMode',
        'sideframe',
        'createContent',
        'users',
        'addNewUser',
        'newPage',
        'pageControl',
        'modal',
        'permissions',
        'logout',
        'clipboard'
    ],
    [
        'pageTypes',
        'switchLanguage',
        'editContent',
        'editContentTools',
        'publish',
        'loginToolbar',
        'changeSettings',
        'toolbar-login-apphooks',
        {
            serverArgs: '--CMS_PERMISSION=False --CMS_TOOLBAR_URL__EDIT_ON=test-edit',
            file: 'copy-from-language'
        },
        {
            serverArgs: '--CMS_PERMISSION=False --CMS_TOOLBAR_URL__EDIT_ON=test-edit',
            file: 'pagetree-no-permission'
        }
    ],
    [
        'pagetree',
        'disableToolbar',
        'dragndrop',
        'copy-apphook-page',
        'history',
        'revertLive',
        'narrowScreen'
    ]
];

var CMS_VERSION = fs.readFileSync('cms/__init__.py', { encoding: 'utf-8' })
    .match(/__version__ = '(.*?)'/)[1];

// #############################################################################
// #TASKS#
gulp.task('sass', function () {
    gulp.src(PROJECT_PATTERNS.sass)
        .pipe(gulpif(options.debug, sourcemaps.init()))
        .pipe(sass())
        .on('error', function (error) {
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.messageFormatted));
        })
        .pipe(autoprefixer({
            // browsers are coming from browserslist file
            cascade: false
        }))
        .pipe(minifyCss({
            rebase: false
        }))
        .pipe(gulpif(options.debug, sourcemaps.write()))
        .pipe(gulp.dest(PROJECT_PATH.css));
});

gulp.task('icons', function () {
    gulp.src(PROJECT_PATTERNS.icons)
    .pipe(iconfontCss({
        fontName: 'django-admin-iconfont',
        fontPath: '../fonts/',
        path: PROJECT_PATH.sass + '/libs/_iconfont.scss',
        targetPath: '../../../sass/components/_iconography.scss'
    }))
    .pipe(iconfont({
        fontName: 'django-admin-iconfont',
        normalize: true
    }))
    .on('glyphs', function (glyphs, options) {
        gutil.log.bind(glyphs, options);
    })
    .pipe(gulp.dest(PROJECT_PATH.icons));
});

// #######################################
// #TESTS#
gulp.task('tests', ['tests:integration']);

var integrationTests = {
    /**
     * Runs pyhon testserver.py and sleeps for a minute to let it run migrations.
     * Respects `clean` cli argument to remove the existing local database.
     *
     * @method startServer
     * @param {String} args plain string of arguments to be passed to testserver.py (space separated)
     * @returns {Promise} fullfilled when sleep ends
     */
    startServer: function startServer(args) {
        return new Promise(function (resolve) {
            if (argv && argv.clean) {
                child_process.execSync('rm -rf testdb.sqlite');
            }
            if (argv && argv.server === false) {
                resolve(false);
                return;
            }
            var server = spawn('python', ['testserver.py'].concat(args.split(' ')));
            gutil.log('Starting a server');
            server.stdout.on('data', function (data) {
                console.log(data.toString().slice(0, -1));
            });

            server.stderr.on('data', function (data) {
                gutil.log('Server: ', data.toString().slice(0, -1));
            });

            var sleep = spawn('sleep', ['90']);

            sleep.on('close', function () {
                resolve(server.pid);
            });
        });
    },

    /**
     * Prepares files for consumption by casper. Input given
     * as array of buckets, buckets being array of strings (file names) or
     * objects (filename + custom server args). Converts strings to objects
     * with { file: originalString, serverArgs: '' }
     *
     * @method prepareBuckets
     * @returns {Array<Array<Object>>} modified buckets
     * @example
     * input:
     * [
     *     [ 'file1', 'file2' ],
     *     [ 'file3', { file: 'file4', serverArgs: '--something' } ]
     * ]
     *
     * output:
     * [
     *     [ { file: 'file1', serverArgs: '' }, { file: 'file2', serverArgs: '' } ],
     *     [ { file: 'file3', serverArgs: '' }, { file: 'file4', serverArgs: '--something' } ]
     * ]
     */
    prepareBuckets: function prepareBuckets() {
        return INTEGRATION_TESTS.map(function (bucket) {
            return bucket.map(function (test) {
                if (typeof test === 'object') {
                    return test;
                }

                return {
                    file: test,
                    serverArgs: ''
                };
            });
        });
    },

    /**
     * Prepares files for testing. Respects INTEGRATION_TESTS_BUCKET env
     * variable (on travis we run tests in separate jobs to speed up the whole suite)
     * and cli arguments. If there are multiple tests that require same server (same server arguments)
     * it would group them together for speed.
     *
     * @method prepareFiles
     * @returns {Promise} immediately resolved with prepared files object
     * @example {
     *     "": [ { file: 'path1', serverArgs: "" } ],
     *     "--something": [ { file: 'path2', serverArgs: "--something" } ]
     * }
     */
    prepareFiles: function prepareFiles() {
        var buckets = this.prepareBuckets();

        var files = [];

        // on travis we split up integration tests into three buckets,
        // and set which bucket will be used through environment variable
        switch (process.env.INTEGRATION_TESTS_BUCKET) {
            case '1':
            case '2':
            case '3':
                files = buckets[Number(process.env.INTEGRATION_TESTS_BUCKET) - 1];
                break;
            default:
                files = buckets.reduce(function (memo, bucket) {
                    return memo.concat(bucket);
                }, []);
        }

        var pre = [{
            file: PROJECT_PATH.tests + '/integration/setup.js'
        }];

        var fileNames;
        if (argv && argv.tests) {
            fileNames = argv.tests.split(',');
            gutil.log('Running tests for ' + fileNames.join(', '));
            files = fileNames.map(function (fileName) {
                return _.find(files, function (file) {
                    return file.file === fileName;
                }) || {
                    file: fileName,
                    serverArgs: ''
                };
            });
        }

        var tests = files.map(function (file) {
            return _.merge({}, file, {
                file: PROJECT_PATH.tests + '/integration/' + file.file + '.js'
            });
        });

        var groupedTests = _.mapValues(_.groupBy(tests, 'serverArgs'), function (testsArray) {
            return pre.concat(testsArray);
        });

        return Promise.resolve(groupedTests);
    },

    /**
     * Runs casperjs process with tests passed as arguments to it and logs output.
     *
     * @method runTests
     * @param {String[]} tests paths to tests
     * @returns {Promise} resolves with casper exit code (0 or 1)
     */
    runTests: function (tests) {
        return new Promise(function (resolve) {
            var casperChild = spawn('./node_modules/.bin/casperjs', ['test', '--web-security=no'].concat(tests));

            casperChild.stdout.on('data', function (data) {
                gutil.log('CasperJS:', data.toString().slice(0, -1));
            });

            casperChild.on('close', function (code) {
                resolve(code);
            });
        });
    },

    /**
     * When used --screenshots it will generate instrumented files that captures the
     * screenshot of current state on every step. Useful for local debugging.
     * Requires you to install casper-sumomner (npm install -g casper-summoner).
     *
     * @method createScreenshotFiles
     * @param {String[]} tests array of paths to instrument
     * @returns {String[]} array of paths to instrumented tests
     */
    createScreenshotFiles: function (tests) {
        if (argv && argv.screenshots) {
            child_process.execSync('casper-summoner ' + tests.join(' '));
            tests = tests.map(function (file) {
                return file.replace('.js', '.summoned.js');
            });
        }

        return tests;
    },

    /**
     * Cleans up instrunented tests
     *
     * @method removeScreenshotFiles
     * @see createScreenshotFiles
     * @param {String[]} tests array of paths to instrumented tests
     */
    removeScreenshotFiles: function (tests) {
        if (argv && argv.screenshots) {
            child_process.execSync('rm ' + tests.join(' '));
        }
    }
};

// gulp tests:integration [--clean] [--screenshots] [--tests=loginAdmin,toolbar]
gulp.task('tests:integration', function (done) {
    process.env.PHANTOMJS_EXECUTABLE = './node_modules/.bin/phantomjs';

    integrationTests
        .prepareFiles()
        .then(function (groupedTests) {
            return Promise.reduce(Object.keys(groupedTests), function (items, serverArgs) {
                var tests = groupedTests[serverArgs].map(function (obj) {
                    return obj.file;
                });
                var serverPid;

                return integrationTests.startServer(serverArgs)
                    .then(function (pid) {
                        serverPid = pid;
                        tests = integrationTests.createScreenshotFiles(tests);
                    })
                    .then(function () {
                        return integrationTests.runTests(tests).tap(function () {
                            integrationTests.removeScreenshotFiles(tests);
                        });
                    })
                    .then(function (exitCode) {
                        return new Promise(function (resolve, reject) {
                            var finish = function () {
                                if (exitCode === 0) {
                                    resolve(items);
                                } else {
                                    reject('Failure');
                                }
                            };
                            if (serverPid) {
                                terminate(serverPid, finish);
                            } else {
                                finish();
                            }
                        });
                    });
            }, []);
        })
        .then(function () {
            done(0);
        })
        .catch(function (e) {
            console.log(e);
            done(1);
        });
});

// #############################################################################
// #COMMANDS#
gulp.task('watch', function () {
    gulp.watch(PROJECT_PATTERNS.sass, ['sass']);
});

gulp.task('default', ['sass', 'watch']);
