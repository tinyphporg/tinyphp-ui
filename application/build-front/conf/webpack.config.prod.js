const webpack = require('webpack');
const path = require('path');

const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const appConfig = require('./webpack.config.app');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: {
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 50,
            maxInitialRequests: 30,
            name: false,
            cacheGroups: {
                lib: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -1,
                    chunks: 'initial',
                    name: 'tinyphp-lte'
                },
                app: {
                    test: /[\\/]src[\\/]app[\\/]/,
                    priority: -1,
                    chunks: 'initial',
                    name: 'tinyphp'
                },
                ...appConfig.plugins,


            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin(appConfig.copyright),
        new BundleAnalyzerPlugin({
            analyzerHost: appConfig.stat.host,
            analyzerPort: appConfig.stat.port
        })
    ]
});