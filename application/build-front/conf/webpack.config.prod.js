const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const tconfig = require('./tinyphp.config');
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
                    name: 'tinyphp-lib'
                },
                app: {
                    test: /[\\/]src[\\/]lib[\\/]/,
                    priority: -1,
                    chunks: 'initial',
                    name: 'tinyphp'
                },
                ...tconfig.plugins,


            }
        }
    },
    plugins: [
        new webpack.ids.HashedModuleIdsPlugin({
            context: __dirname,
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin(tconfig.copyright),
        new BundleAnalyzerPlugin({
            analyzerHost: tconfig.stat.host,
            analyzerPort: tconfig.stat.port
        })
    ]
});
