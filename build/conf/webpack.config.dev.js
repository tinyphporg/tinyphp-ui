const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// import config
const webpackBaseConfig = require('./webpack.config.base')
const tconfig = require('./tinyphp-ui.config')

// define
const DEV_COPY_PATHS = tconfig.dev.copypaths
const DEV_STATIC_DIRS = tconfig.dev.staticDirs
const DEV_HTML_DIR = tconfig.dev.htmlDir
const DEV_HOST = tconfig.dev.host
const DEV_PORT = tconfig.dev.port
const DEV_WRITE_DISK = tconfig.dev.writedisk

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: DEV_COPY_PATHS
        }),
        
    ],
    watchOptions: {
        poll: 2000, 
        aggregateTimeout: 2500,  
        ignored: /(build\/htmls)/ 
    },
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        devMiddleware: {
            index: true,
            mimeTypes: { phtml: 'text/html' },
            serverSideRender: true,
            writeToDisk: filepath => {
                if (filepath.indexOf(DEV_HTML_DIR) > -1 && DEV_WRITE_DISK.test(filepath)) {
                    return true
                }
                return
            },
        },
        static: DEV_STATIC_DIRS,
        open: false, 
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