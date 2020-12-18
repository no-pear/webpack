const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = merge(common, {
    mode: 'development',
    target: 'web',
    output: {
        // publicPath: '/dist/',
    },
    devServer: {
        port: 8000,
        hot: true,
        open: true,
        // publicPath: '/dist/',
        // contentBase: '../'
        
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ]
})