const fs = require('fs')
const path = require('path')

// config
const pluginsConfig = require('./tinyphp-ui.plugin.js')

const ROOT_DIR = path.resolve(__dirname, '../../')

// build dir
const BUILD_DIR = path.resolve(ROOT_DIR, './build/')
const BUILD_JS_DIR = path.resolve(BUILD_DIR, './js/')
const BUILD_ASSETS_DIR = path.resolve(BUILD_DIR, './assets')
const BUILD_SCSS_DIR = path.resolve(BUILD_DIR, './scss')
const BUILD_HTML_DIR = path.resolve(BUILD_DIR, './htmls')
const BUILD_PAGE_DIR = path.resolve(BUILD_DIR, './pages')

// dist dir
DIST_DIR = path.resolve(ROOT_DIR, './dist')
DIST_PAGE_DIR = path.resolve(ROOT_DIR, './src/views')
DIST_HTML_DIR = path.resolve(ROOT_DIR, './htmls')

// prod环境下的publicPath
const PROD_PUBLIC_PATH = '../../tinyphp-ui/dist/'

// dev环境下的publicPath
const DEV_PUBLIC_PATH = 'http://localhost:8080/'


// replace tag
const replaceTag = (sourceText) => {
    let replaceText = sourceText.replace(/{ui\.(admin|lib|assets)}/g, (matchText) => {
        switch (matchText) {
            case '{ui.admin}':
                return `<script src="${DEV_PUBLIC_PATH}js/tinyphp-ui.admin.js"></script>`
            case '{ui.lib}':
                return `<script src="${DEV_PUBLIC_PATH}js/tinyphp-ui.js"></script>`
            case '{ui.assets}':
                return '/assets/'
        }
        return ''
    })
    return replaceText.replace(/\{template\s+(.*?)\s*\}/g, (_, mpath) => {
        let fpath = path.resolve(BUILD_PAGE_DIR, mpath)
        if (!fs.existsSync(fpath)) {
            return ''
        }
        return replaceTag(fs.readFileSync(fpath).toString())
    })
}

//module
module.exports = {
    isProd: (process.env.NODE_ENV === 'prod'),
    copyright: '',
    eslints:[
       //  BUILD_JS_DIR
    ],
    entrys: (() => {
            let entrys = []
            fs.readdirSync(BUILD_PAGE_DIR).forEach((tname) => {
                let tpath = path.resolve(BUILD_PAGE_DIR, tname)
                if (!fs.statSync(tpath).isFile() || !/\.html$/.test(tname)) {
                    return
                }
                
                let tpname = tname.replace('.html', '')
                let tfname = 'tinyphp-ui' + ((tpname == 'index') ?  '' :  '.' + tpname)
                entrys.push({
                    id: tfname ,
                    name: tfname,
                    filename: path.resolve(DIST_DIR, `./${tname}`),
                    template: tpath,
                    entry: path.resolve(BUILD_JS_DIR, `./${tpname}.js`)
                })
                return
            })
            return entrys
        })(),   
    dev: {
        publicPath: DEV_PUBLIC_PATH,
        basePath: BUILD_DIR,
        htmlDir: BUILD_HTML_DIR,
        staticDirs: [BUILD_HTML_DIR],
        writedisk: /(admin|app)\//,
        apiDomain: '/',
        host: '0.0.0.0',
        port: 8080,
        copypaths: [
            {
                from: path.resolve(BUILD_PAGE_DIR, './admin'),
                to: path.resolve(BUILD_HTML_DIR, './admin'),
                transform: {
                    transformer(data, resourcePath) {
                        if (!/\.(html|htm)$/.test(resourcePath)) {
                            return data
                        }
                        // todo reloace
                        return replaceTag(data.toString())
                    },
                },
            },
            {
                from: path.resolve(BUILD_PAGE_DIR, './app'),
                to: path.resolve(BUILD_HTML_DIR, './app'),
                transform: {
                    transformer(data, resourcePath) {
                        if (!/\.(html|htm)$/.test(resourcePath)) {
                            return data
                        }
                        // todo reloace
                        return replaceTag(data.toString())
                    },
                },
            },
            {
                from: path.resolve(BUILD_ASSETS_DIR),
                to: path.resolve(BUILD_HTML_DIR, './assets')
            }
        ]
    },
    prod: {
        publicPath: PROD_PUBLIC_PATH,
        apiDomain: '',
        distDIR: DIST_DIR, 
        copypaths: [
            {
                from: path.resolve(BUILD_PAGE_DIR, './admin'),
                to: path.resolve(DIST_PAGE_DIR, './admin'),
            }, {
                from: path.resolve(BUILD_PAGE_DIR, './app'),
                to: path.resolve(DIST_PAGE_DIR, './app'),
            },
            {
                from: path.resolve(BUILD_ASSETS_DIR),
                to: path.resolve(DIST_DIR, './assets'),
            },
        ]
    },
    stat: {
        host: '0.0.0.0',
        port: 8888,
    },
    plugins: (() => {
        let ps = []
        let plugins = []
        pluginsConfig.forEach((plugin) => {
            let name = plugin.name
            css = plugin.css ? PROD_PUBLIC_PATH + 'plugins/' + name + '.css' : false
            javascript = plugin.javascript ? PROD_PUBLIC_PATH + 'plugins/' + name + '.js' : false
            plugins.push({
                name: name,
                css: css,
                javascript: javascript,
                enable: plugin.enable
            })
            
            ps.push({
                test: plugin.test,
                name: name,
                priority: 1,
                chunks: 'async',
            })
        })

        // let data = {}
        // data['plugins'] = plugins
        // data['domain'] = prodPublicPath
        // fs.writeFileSync(uiConfigFile, JSON.stringify(data))
        return ps
    })(),
    path: {
        alias: {
            '~assets': BUILD_ASSETS_DIR,
            '~js': BUILD_JS_DIR,
            '~scss': BUILD_SCSS_DIR,
            '~bootstrap': path.resolve(ROOT_DIR, './node_modules/bootstrap/js'),
            'jQuery': path.resolve(ROOT_DIR, './node_modules/jquery/dist/jquery.js')
        }
    }
}