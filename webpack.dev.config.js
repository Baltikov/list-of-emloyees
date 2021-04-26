const { merge } = require('webpack-merge')
const base = require('./webpack.config')

module.exports = merge(base, {
    devServer: {
        contentBase: './triton',
        publicPath: '/js',
        host: 'localhost',
        port: 4000,
        hot: true,
    },
})