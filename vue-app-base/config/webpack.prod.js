const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        // publicPath: ''
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'public/favicon.ico', to: 'public'}
            ]
        }),
        new CleanWebpackPlugin(),
    ]

})