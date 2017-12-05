const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  './resources/js/entry.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader", // Will inject the style tag if plugin fails
                  use: ["css-loader", "sass-loader"]
                }),/*
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]*/

            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(svg|gif|png|eot|woff|ttf|jpg|jpeg|ttf)$/,
                loaders: [
                    'url-loader'
                ]
            },
            {
                test: /\.(woff2|woff|svg|eot|ttf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    'url-loader?limit=10000'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            Util: "exports-loader?Util!bootstrap/bj/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        }),
        new ExtractTextPlugin('styles.css')
    ]
}