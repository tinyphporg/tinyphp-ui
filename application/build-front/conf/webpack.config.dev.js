const webpack = require('webpack');
const {merge} = require('webpack-merge');
const tconfig = require('./tinyphp.config.js');
const baseWebpackConfig = require('./webpack.config.base.js');

module.exports =  merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        open: true, // 自动打开浏览器
        contentBase: tconfig.path.publicDir,
        publicPath: '',
        compress: true,
        hot: true,
        host: tconfig.dev.host, // 0.0.0.0 localhost
        port: tconfig.dev.port,
        overlay: {
            warnings: true,
            errors: true
        }
    }
});