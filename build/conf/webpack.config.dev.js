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
    watch: true,  
    watchOptions: {
            poll: 1000, // 每秒询问多少次
            aggregateTimeout: 500,  // 防抖 多少毫秒后再次触发
            ignored: /node_modules/ // 忽略时时监听
    },
	
    devtool: 'eval-source-map',
    devServer: {
        hot: true,

		static: tconfig.dev.staticDirs,
		
        open: false, // 自动打开浏览器
        compress: true,
        headers: {
			'Access-Control-Allow-Origin' : '*',
		},
        host: tconfig.dev.host, // 0.0.0.0 localhost
        port: tconfig.dev.port,
        client: {
			overlay: {
            	warnings: true,
            	errors: true
        	},
			reconnect:false

		}
    }
});