const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const appConfig = require('./webpack.config.app');

let entry = {};
let plugins = [];
let isProd = appConfig.isProd;
let appPath = appConfig.path;
let publicPath = isProd ? appConfig.prod.publicPath : appConfig.dev.publicPath;

// multi entry
appConfig.path.viewPages.forEach(page => {
	entry[page.id] = page.entry;
	plugins.push(
		new HtmlWebpackPlugin({
			favicon: appConfig.path.faviconDir,
			filename: path.resolve(appPath.distDir, `./html/${page.id}.html`),
			template: page.template,
			chunks: [page.id],
			chunksSortMode: 'manual',
			versionPath: 'v12.1',
			//scriptLoading: 'blocking',
			//inject:'head',
			minify: {
				collapseWhitespace: false,
				keepClosingSlash: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		})
	);
});

if (isProd) {
	plugins.push(
		new MiniCssExtractPlugin({
			filename: 'css/' + (isProd ? '[name].min.css' : '[name].css'),
			chunkFilename: 'css/' + (isProd ? '[name].chunk.min.css' : '[name].chunk.css'),
		})
	);
}


module.exports = {
	entry: entry,
	output: {
		publicPath: publicPath,
		path: appConfig.path.distDir,
		filename: 'js/' + (isProd ? '[name].min.js' : '[name].js'),
		chunkFilename: 'js/' + (isProd ? '[name].chunk.min.js' : '[name].chunk.js'),
		clean: true,
	},
	externals: {
	},
	resolve: {
		extensions: ['.js', '.json', '.scss', '.html'],
		alias: appPath.alias
	},
	module: {
		rules: [{
			test: require.resolve("jquery"),
			loader: "expose-loader",
			options: {
				exposes: [{
					globalName: '$',
					override: true,
				},
				{
					globalName: 'jQuery',
					override: true,
				}]
			}
		},
		{
			test: /\.(html|htm)$/,
			use: ['html-withimg-loader?min=false']
		},
		{
			test: /\.(png|jpg|jpe?g|gif)$/,
			use: ['file-loader?limit=4096&esModule=false&name=[name].[ext]&outputPath=img/&&publicPath=' + publicPath + '/img', {
				loader: 'image-webpack-loader',
				options: {
					bypassOnDebug: true, // webpack@1.x
					disable: true, // webpack@2.x and newer
					mozjpeg: {
						progressive: true,
						quality: 65
					},
					// optipng.enabled: false will disable optipng
					optipng: {
						enabled: false,
					},
					pngquant: {
						quality: [0.65, 0.90],
						speed: 4
					},
					gifsicle: {
						interlaced: false,
					},
					// the webp option will enable WEBP
					webp: {
						quality: 75
					}
				}
			},
			]

		},
		{
			test: /\.(webp)$/,
			use: ['file-loader?name=[name].[ext]&outputPath=img/&publicPath=' + publicPath + 'img']
		},
		{
			test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)/,
			use: ['file-loader?name=[name].[ext]&outputPath=font/&publicPath=' + publicPath + 'font']
		},
		{
			test: /\.(css)$/,
			use: [isProd ? ({
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: '../'
				}
			}) : 'style-loader', 'css-loader']
		},
		{
			test: /\.(scss)$/,
			use: [isProd ? ({
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: '../'
				}
			}) : 'style-loader', 'css-loader', {
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: [
							[
								'autoprefixer',
							],
						],
					}
				}
			}, 'sass-loader']
		},
		{
			enforce: 'pre',
			test: /\.js$/,
			include: [path.resolve(__dirname, '../src/views'), path.resolve(__dirname, '../src/app')], // 指定eslint检查的目录
			loader: 'eslint-loader',
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["@babel/plugin-transform-runtime"]
				}
			}
		}
		]
	},
	plugins: [
		...plugins,
	new CopyPlugin({
      patterns: [
        {
          from: "node_modules/admin-lte/plugins",
          to: "plugins/",
        },
        {
	       from : path.resolve(__dirname, '../src/plugins'),
           to : 'plugins/',
        }	
      ],
    })		
	],
};