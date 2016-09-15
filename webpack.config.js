var webpack = require('webpack');

module.exports = function (opts) {
    'use strict';

    var PROJECT_PATH = opts.PROJECT_PATH;
    var debug = opts.debug;

    var baseConfig = {
        devtool: false,
        watch: !!opts.watch,
        entry: {
            adminstyle: PROJECT_PATH.js + '/base-admin.js'
        },
        output: {
            path: PROJECT_PATH.js + '/dist/',
            filename: 'bundle.[name].min.js',
            chunkFilename: 'bundle.[name].min.js',
            jsonpFunction: 'cmsWebpackJsonp'
        },
        plugins: [],
        resolve: {
            extensions: ['', '.js'],
            alias: {
                'jquery': PROJECT_PATH.js + '/libs/jquery.min.js',
                'js-cookie': PROJECT_PATH.js + '/libs/js.cookie-2.1.2.min.js'
            }
        },
        module: {
            loaders: [
                {
                    test: /(modules\/jquery)/,
                    loaders: [
                        'imports?jQuery=jquery'
                    ]
                }
            ]
        }
    };

    if (debug) {
        baseConfig.devtool = 'inline-source-map';
        baseConfig.plugins = baseConfig.plugins.concat([
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                __DEV__: 'true'
            })
        ]);
    } else {
        baseConfig.plugins = baseConfig.plugins.concat([
            new webpack.DefinePlugin({
                __DEV__: 'false'
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compressor: {
                    drop_console: true // eslint-disable-line
                }
            })
        ]);
    }

    return baseConfig;
};
