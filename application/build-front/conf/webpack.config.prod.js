import { BannerPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
import { plugins as _plugins, copyright, stat } from './webpack.config.app';
import baseWebpackConfig from './webpack.config.base';

export default merge(baseWebpackConfig, {
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
                    test: /[\\/]src[\\/]app[\\/]/,
                    priority: -1,
                    chunks: 'initial',
                    name: 'tinyphp'
                },
                ..._plugins,


            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BannerPlugin(copyright),
        new BundleAnalyzerPlugin({
            analyzerHost: stat.host,
            analyzerPort: stat.port
        })
    ]
});
