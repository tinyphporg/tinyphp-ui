const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tconfig = require('./tinyphp.config');
const TagsPlugin = require('html-webpack-tags-plugin');

let plugins = [];
let entrys = {};
let isProd = tconfig.isProd;
let appPath = tconfig.path;
let publicPath = isProd ? tconfig.prod.publicPath : tconfig.dev.publicPath;

// multi entry
tconfig.path.pages.forEach(page => {
    entrys[page.id] = page.entry;

    plugins.push(
        new HtmlWebpackPlugin({
            favicon: false,
            filename: page.filename,
            template: page.template,
            chunks: [page.id],
            inject: 'head',
            chunksSortMode: 'manual',
            versionPath: 'v12.1',
            scriptLoading: "blocking",
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
            chunkFilename: 'css/' + (isProd ? '[name].plugin.min.css' : '[name].plugin.css'),
        })
    );
}

console.log(entrys);
module.exports = {
    entry: entrys,
    output: {
        publicPath: publicPath,
        path: tconfig.path.distDir,
        filename: 'js/' + (isProd ? '[name].min.js' : '[name].js'),
        chunkFilename: 'js/' + (isProd ? '[name].plugin.min.js' : '[name].plugin.js'),
        clean: true,
        library: {
            name: '$t',
            type: 'umd',
            export: 'default',
            umdNamedDefine: true,
        },
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
        /*
         {
             test: /\.(html|htm)$/,
             use: ['html-withimg-loader?min=false']
         },
         */
        {
            test: /\.(png|jpg|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        limit: 4096,
                        esModule: false,
                        name: '[name].[ext]',
                        outputPath: (url, resourcePath, context) => {
                            console.log(url, resourcePath, context)
                            if (/src[\\/]js[\\/]assets/.test(resourcePath)) {
                                return 'html/img/' + url
                            }
                            return 'img/' + url;
                        },
                        publicPath: (url, resourcePath, context) => {
                            console.log(url, resourcePath, context)
                            if (/src[\\/]js[\\/]assets/.test(resourcePath)) {
                                return 'img/' + url
                            }
                            return publicPath + 'img/' + url
                        }

                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                        mozjpeg: {
                            progressive: true,
                            quality: 100
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
                            quality: 100
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
            use: {
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: '[name].[ext]',
                    outputPath: 'font/',
                    publicPath: publicPath + 'font/'

                }
            }
        },
        {
            test: /\.(css)$/,
            use: [isProd ? ({
                loader: MiniCssExtractPlugin.loader,
                options: {
                   // publicPath: '../'
                }
            }) : 'style-loader', 'css-loader']
        },
        {
            test: /\.(scss)$/,
            use: [isProd ? ({
                loader: MiniCssExtractPlugin.loader,
                options: {
                //    publicPath: '../'
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
            test: /\.js$/,
            enforce: 'pre',
            include: [path.resolve(__dirname, '../src/views'), path.resolve(__dirname, '../src/app')], // ??????eslint???????????????
            loader: 'eslint-loader',
        },
        {
            test: /\.js$/,
            exclude: [/node_modules/, path.resolve(__dirname, '../src/js/TinyPHP.js')],
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
		new TagsPlugin(
			{ tags: ['a.js', 'b.css'], append: false }
		),
    ],
};