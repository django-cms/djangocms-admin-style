const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (opts) => {
    'use strict';

    const PROJECT_PATH = opts.PROJECT_PATH;
    const debug = opts.debug;

    const baseConfig = {
        devtool: false,
        watch: !!opts.watch,
        entry: {
            adminstyle: path.join(PROJECT_PATH.js, 'base-admin.js'),
        },
        output: {
            path: path.join(PROJECT_PATH.js, 'dist'),
            filename: 'bundle.[name].min.js',
            chunkFilename: 'bundle.[name].min.js',
            publicPath: 'auto',
            chunkLoadingGlobal: 'cmsWebpackJsonp',
        },
        plugins: [],
        resolve: {
            extensions: ['.js'],
            alias: {
                'jquery': path.join(PROJECT_PATH.js, 'libs', 'jquery.min.js'),
                'js-cookie': path.join(PROJECT_PATH.js, 'libs', 'js.cookie-2.1.2.min.js'),
            },
        },
        module: {
            rules: [
                {
                    test: /(modules\/jquery)/,
                    use: [
                        {
                            loader: 'imports-loader',
                            options: {
                                additionalCode: 'var jQuery = require("jquery");',
                            },
                        }
                    ]
                }
            ],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: !debug,
                        },
                    },
                }),
            ],
        },
    };

    if (debug) {
        baseConfig.devtool = 'inline-source-map';
        baseConfig.mode = 'development';
    } else {
        baseConfig.mode = 'production';
    }

    baseConfig.plugins.push(
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(debug),
        })
    );

    return baseConfig;
};
