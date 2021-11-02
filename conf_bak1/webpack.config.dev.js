const webpack = require('webpack');
const { merge } = require('webpack-merge');
const tconfig = require('./tinyphp.config.js');
const baseWebpackConfig = require('./webpack.config.base.js');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        inline: false,
       contentBase:tconfig.path.distDir,    
        watchOptions: {
            poll: 1000, // 每秒询问多少次
            aggregateTimeout: 500,  // 防抖 多少毫秒后再次触发
            ignored: /node_modules/ // 忽略时时监听
        },
        open: true, // 自动打开浏览器
        publicPath: '',
        compress: true,
        
        host: tconfig.dev.host, // 0.0.0.0 localhost
        port: tconfig.dev.port,
        overlay: {
            warnings: true,
            errors: true
        }
    }
});

console.log(tconfig.path.distDir)