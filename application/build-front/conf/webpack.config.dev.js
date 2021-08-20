const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const appConfig = require('./webpack.config.app');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
	devtool: 'eval-source-map',
	devServer: {
		inline: true,
		open: true, // 自动打开浏览器
		contentBase: appConfig.path.publicDir,
		publicPath: '',
		compress: true,
		hot: true,
		host: appConfig.dev.host, // 0.0.0.0 localhost
		port: appConfig.dev.port,
		overlay: {
			warnings: true,
			errors: true
		}
	}
});