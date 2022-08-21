const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

// import config
const webpackBaseConfig = require('./webpack.config.base')
const tconfig = require('./tinyphp-ui.config')

// define
const DEV_COPY_PATHS = tconfig.dev.copypaths
const DEV_STATIC_DIRS = tconfig.dev.staticDirs
const DEV_HTML_DIR = tconfig.dev.htmlDir
const DEV_HOST = tconfig.dev.host
const DEV_PORT = tconfig.dev.port

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyPlugin({
            patterns: DEV_COPY_PATHS
        }),
    ],
    watch:true,
    watchOptions: {
        poll: 1000, // 每秒询问多少次
        aggregateTimeout: 500,  // 防抖 多少毫秒后再次触发
        ignored: /node_modules/ // 忽略时时监听
    },

    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        devMiddleware: {
            index: true,
            mimeTypes: { phtml: 'text/html' },
            serverSideRender: true,
            writeToDisk: filepath => {
                if (filepath.indexOf(DEV_HTML_DIR) > -1) {
                    return true
                }
                return
            },
        },
        static: DEV_STATIC_DIRS,
        open: false, // 自动打开浏览器
        compress: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        host: DEV_HOST, // 0.0.0.0 localhost
        port: DEV_PORT,
        client: {
            overlay: {
                warnings: true,
                errors: true
            },
            reconnect: false
        }
    }
})