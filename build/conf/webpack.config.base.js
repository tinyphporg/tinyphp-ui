// lib
const path = require('path');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// config
const tconfig = require('./tinyphp-ui.config');

// define
const IS_PROD_MODE = tconfig.isProd;
const PATH_ALIAS = tconfig.path.alias;
const PATH_ESLINTS = tconfig.eslints
const PUBLIC_PATH = IS_PROD_MODE ? tconfig.prod.publicPath : tconfig.dev.publicPath;
const OUTPUT_PATH = IS_PROD_MODE ? tconfig.prod.distDIR : tconfig.dev.htmlDir
const ENTRY_LIST = tconfig.entrys

// entrys
const entrys = ((entryList) => {
    let entrys = {}
    entryList.forEach(config => {
        entrys[config.id] = config.entry
    })
    return entrys
})(ENTRY_LIST)

//plugins
const plugins = ((entryList, isProd) => {
    const plugins = []
    entryList.forEach(page => {
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
    })

    if (!isProd) {
        return plugins
    }

    // mini css
    plugins.push(
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css',
            chunkFilename: 'css/[name].plugin.min.css',
        })
    );
    return plugins

})(ENTRY_LIST, IS_PROD_MODE)

const rewriteDirname = (rpath) => {

    let match = null

    // node_modules
    if (match = rpath.match(/node_modules\/(.*)$/)) {
        return ((dpath) => {
            dpath = path.dirname(match[1])
            switch (dpath) {
                case '@fortawesome/fontawesome-free/webfonts':
                    return 'fontawsome'
                case 'flag-icon-css/flags/4x3':
                    return 'flags/4x3'
                case 'flag-icon-css/flags/1x1':
                    return 'flags/1x1'
                case 'bootstrap-icons/font/fonts':
                    return 'bootstrap-icons'
                case 'summernote/dist/font':
                    return 'summernote'
            }
            return dpath
        })(match[1])
        // scss
    } else if (match == rpath.match(/build\/scss\/(font|img)(.*)$/)) {
        return ''
    }
    return false
}
// exports
module.exports = {
    entry: entrys,
    output: {
        publicPath: PUBLIC_PATH,
        path: OUTPUT_PATH,
        filename: 'js/' + (IS_PROD_MODE ? '[name].min.js' : '[name].js'),
        chunkFilename: 'js/' + (IS_PROD_MODE ? '[name].plugin.min.js' : '[name].plugin.js'),
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
        alias: PATH_ALIAS
    },
    module: {
        rules: [
            {
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
                test: /\.(png|jpe?g|gif)$/,
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
                                return PUBLIC_PATH + 'img/' + url
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
                use: ['file-loader?name=[name].[contenthash:8].[ext]&outputPath=img/&publicPath=' + PUBLIC_PATH + 'img']
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: IS_PROD_MODE ? '[name].[ext][query]' : '[name].[contenthash:8].[ext][query]',
                        outputPath: IS_PROD_MODE ? ((url, resourcePath, context) => {
                            const dirname = rewriteDirname(resourcePath)
                            if (false === dirname) {
                                return `font/${url}`
                            }
                            return `css/font/${dirname}/${url}`.replace(/\/+/, '/')
                        }) : 'font/',
                        
                        publicPath: IS_PROD_MODE ? ((url, resourcePath, context) => {
                            const dirname = rewriteDirname(resourcePath)
                            if (false === dirname) {
                                return `${PUBLIC_PATH}font/${url}`
                            }
                            return `./font/${dirname}/${url}`.replace(/\/+/, '/')
                        }) : PUBLIC_PATH + 'font/'

                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [IS_PROD_MODE ? ({
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // publicPath: '../'
                    }
                }) : 'style-loader', 'css-loader']
            },
            {
                test: /\.(scss)$/,
                use: [IS_PROD_MODE ? ({
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
                include: [...PATH_ESLINTS], // 指定eslint检查的目录
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
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
        ...plugins
    ]
};