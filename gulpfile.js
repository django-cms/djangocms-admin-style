/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';

// #############################################################################
// #IMPORTS#
var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var gutil = require('gulp-util');
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
    'tests': PROJECT_ROOT + '/tests',
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
gulp.task('tests', ['tests:unit', 'tests:integration']);
gulp.task('tests:unit', function (done) {
    // run javascript tests
    karma.start({
        configFile: PROJECT_PATH.tests + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('tests:webdriver', webdriverUpdate);
gulp.task('tests:integration', ['tests:webdriver'], function () {
    return gulp.src([PROJECT_PATH.tests + '/integration/specs/*.js'])
        .pipe(protractor({
            configFile: PROJECT_PATH.tests + '/protractor.conf.js',
            args: []
        }))
        .on('error', function (error) {
            gutil.log(gutil.colors.red(
                'Error (' + error.plugin + '): ' + error.message)
            );
        });
});

gulp.task('tests:watch', function () {
    // run javascript tests
    karma.start({
        configFile: PROJECT_PATH.tests + '/karma.conf.js'
    });
});

// #############################################################################
// #COMMANDS#
gulp.task('watch', function () {
    gulp.watch(PROJECT_PATTERNS.sass, ['sass']);
});

gulp.task('default', ['sass', 'watch']);
