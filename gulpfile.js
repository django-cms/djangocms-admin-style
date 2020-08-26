/**
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */
/* eslint-disable no-console */

'use strict';

// #############################################################################
// #IMPORTS#
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var eslint = require('gulp-eslint');
var integrationTests = require('djangocms-casper-helpers/gulp');
var webpack = require('webpack');
var PluginError = require('plugin-error');

var argv = require('minimist')(process.argv.slice(2));

// #############################################################################
// #SETTINGS#
var options = {
    debug: argv.debug
};
var PROJECT_ROOT = __dirname;
var PROJECT_PATH = {
    sass: PROJECT_ROOT + '/djangocms_admin_style/sass',
    css: PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/css',
    js: PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/js',
    tests: PROJECT_ROOT + '/tests/frontend',
    icons: PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/fonts'
};

var PROJECT_PATTERNS = {
    sass: [PROJECT_PATH.sass + '/**/*.{scss,sass}'],
    icons: [PROJECT_PATH.icons + '/src/*.svg'],
    js: [
        PROJECT_PATH.js + '/**/*.js',
        PROJECT_PATH.tests + '/**/*.js',
        '!' + PROJECT_PATH.js + '/**/jquery.*.js',
        '!' + PROJECT_PATH.js + '/libs/**/*.js',
        '!' + PROJECT_PATH.js + '/dist/**/*.js',
        'gulpfile.js'
    ]
};

var INTEGRATION_TESTS = [
    [
        'loginAdmin',
        'dashboard',
        'addNewUser',
        'pagetree'
    ]
];

// #############################################################################
// #TASKS#
gulp.task('sass', function () {
    gulp.src(PROJECT_PATTERNS.sass)
        .pipe(gulpif(options.debug, sourcemaps.init()))
        .pipe(sass())
        .on('error', function (error) {
            console.log('Error (' + error.plugin + '): ' + error.messageFormatted);
        })
        .pipe(
            postcss([
                autoprefixer({
                    cascade: false
                })
            ])
        )
        .pipe(
            minifyCss({
                rebase: false
            })
        )
        .pipe(gulpif(options.debug, sourcemaps.write()))
        .pipe(gulp.dest(PROJECT_PATH.css));
});

gulp.task('icons', function () {
    gulp.src(PROJECT_PATTERNS.icons)
        .pipe(
            iconfontCss({
                fontName: 'django-admin-iconfont',
                fontPath: '../fonts/',
                path: PROJECT_PATH.sass + '/libs/_iconfont.scss',
                targetPath: '../../../sass/components/_iconography.scss'
            })
        )
        .pipe(
            iconfont({
                fontName: 'django-admin-iconfont',
                normalize: true
            })
        )
        .on('glyphs', function (glyphs, opts) {
            console.log(glyphs, opts);
        })
        .pipe(gulp.dest(PROJECT_PATH.icons));
});

gulp.task('lint', ['lint:javascript']);
gulp.task('lint:javascript', function () {
    // DOCS: http://eslint.org
    return gulp.src(PROJECT_PATTERNS.js).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
});

var webpackBundle = function (opts) {
    var webpackOptions = opts || {};

    webpackOptions.PROJECT_PATH = PROJECT_PATH;
    webpackOptions.debug = options.debug;

    return function (done) {
        var config = require('./webpack.config')(webpackOptions);

        webpack(config, function (err, stats) {
            if (err) {
                throw new PluginError('webpack', err);
            }
            console.log('[webpack]', stats.toString({ colors: true }));
            if (typeof done !== 'undefined' && (!opts || !opts.watch)) {
                done();
            }
        });
    };
};

gulp.task('bundle:watch', webpackBundle({ watch: true }));
gulp.task('bundle', webpackBundle());

// #######################################
// #TESTS#
gulp.task('tests', ['tests:integration']);

// gulp tests:integration [--clean] [--screenshots] [--tests=loginAdmin,toolbar]
gulp.task(
    'tests:integration',
    integrationTests({
        tests: INTEGRATION_TESTS,
        pathToTests: PROJECT_PATH.tests,
        argv: argv,
        dbPath: 'testdb.sqlite',
        serverCommand: 'tests/settings-docker.py',
        logger: console.log.bind(console)
    })
);

// #############################################################################
// #COMMANDS#
gulp.task('watch', function () {
    gulp.start('bundle:watch');
    gulp.watch(PROJECT_PATTERNS.sass, ['sass']);
    gulp.watch(PROJECT_PATTERNS.js, ['lint']);
});

gulp.task('default', ['sass', 'lint', 'watch']);
