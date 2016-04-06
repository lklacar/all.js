var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {filename: './build/app.js'},
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"}
        ]
    },
};