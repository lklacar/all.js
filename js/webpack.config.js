var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {filename: '../templates/bundle.js'},
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
};