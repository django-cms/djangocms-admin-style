/**
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */
/* eslint-disable no-console */
/*jshint esversion: 6 */
'use strict';

// #############################################################################
// #IMPORTS#
const gulp = require('gulp');
const gutil = require('gulp-util');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const integrationTests = require('djangocms-casper-helpers/gulp');

const argv = require('minimist')(process.argv.slice(2)); // eslint-disable-line

// #############################################################################
// #SETTINGS#
const options = {
    debug: argv.debug
};
const PROJECT_ROOT = __dirname;
const PROJECT_PATH = {
    sass: PROJECT_ROOT + '/djangocms_admin_style/sass',
    css: PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/css',
    js: PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/js',
    tests: PROJECT_ROOT + '/tests/frontend',
    icons: PROJECT_ROOT + '/djangocms_admin_style/static/djangocms_admin_style/fonts'
};

const PROJECT_PATTERNS = {
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

const INTEGRATION_TESTS = [
    [
        'loginAdmin',
        'dashboard',
        'addNewUser',
        'pagetree'
    ]
];

// #############################################################################
// #TASKS#
const css = () => {
    return (
        gulp.src(PROJECT_PATTERNS.sass)
        .pipe(gulpif(options.debug, sourcemaps.init()))
        .pipe(sass())
        .on('error', function (error) {
            log.error('Error (' + error.plugin + '): ' + error.messageFormatted);
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
        .pipe(gulp.dest(PROJECT_PATH.css))
    );
};

const icons = () => {
    return (
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
        .pipe(gulp.dest(PROJECT_PATH.icons))
    )
};

const lint = () => {
    return (
        gulp
            .src(PROJECT_PATTERNS.js)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
    )
};


const webpackBundle = function (opts) {
    const webpackOptions = opts || {};

    webpackOptions.PROJECT_PATH = PROJECT_PATH;
    webpackOptions.debug = options.debug;

    return function (done) {
        const config = require('./webpack.config')(webpackOptions);

        webpack(config, function (err, stats) {
            if (err) {
                throw new PluginError('webpack', err);
            }
            log('[webpack]', stats.toString({ colors: true }));
            if (typeof done !== 'undefined' && (!opts || !opts.watch)) {
                done();
            }
        });
    };
};

// #######################################
// #TESTS#

const testsIntegration = () => {
    integrationTests({
        tests: INTEGRATION_TESTS,
        pathToTests: PROJECT_PATH.tests,
        argv: argv,
        dbPath: 'testdb.sqlite',
        serverCommand: 'tests/settings-docker.py',
        logger: gutil.log.bind(gutil),
        waitForMigrations: 5 // seconds
    });
};


// #############################################################################
// #COMMANDS#
const watchFiles = () => {
    browserSync.init();
    gulp.watch(PROJECT_PATTERNS.sass, css);
    gulp.watch(PROJECT_PATTERNS.js, lint);
};

gulp.task("sass", css);
gulp.task("icons", icons);
gulp.task("lint", lint);
gulp.task('watch', gulp.parallel(watchFiles));
gulp.task('bundle:watch', webpackBundle({ watch: true }));
gulp.task('bundle', webpackBundle());
gulp.task('tests', testsIntegration());
