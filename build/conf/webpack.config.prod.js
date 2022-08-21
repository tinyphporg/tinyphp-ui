const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const tconfig = require('./tinyphp-ui.config');
const baseWebpackConfig = require('./webpack.config.base');
const CopyPlugin = require('copy-webpack-plugin');
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
       new CopyPlugin({
             patterns: tconfig.prod.copypaths
         }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin(tconfig.copyright),
        new BundleAnalyzerPlugin({
            analyzerHost: tconfig.stat.host,
            analyzerPort: tconfig.stat.port
        })
    ]
});
