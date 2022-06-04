const path = require('path');
const fs = require('fs');
const {merge} = require('webpack-merge');

const pluginsConfig = require('./tinyphp.plugin.js');

let rootDir = path.resolve(__dirname, '../../');
let buildDir = path.resolve(__dirname, '../');
let srcDir = path.resolve(buildDir, './js/');

let assetDir = path.resolve(buildDir, './assets');
let scssDir = path.resolve(buildDir, './scss');

// pages 
let pageDir = path.resolve(buildDir, './pages');
let pluginDir = path.resolve(srcDir, './plugins');
let htmlDir = path.resolve(buildDir, './htmls');

// 编译后的存储路径
let distDir = path.resolve(rootDir, './dist');

// page编译后的存储路径
let pageDistDir = path.resolve(rootDir, './pages');

// prod环境下的publicPath
let prodPublicPath = '/tinyphp-ui/';

// dev环境下的publicPath
let devPublicPath = 'http://localhost:8080/';

let uiConfigFile = path.resolve(srcDir, './TinyPHP.json');

const Config = {
    isProd: (process.env.NODE_ENV === 'prod'),
    copyright: '',
    dev: {
        publicPath: devPublicPath,
		basePath: buildDir,
		
        staticDirs: [assetDir, htmlDir],
        apiDomain: '/',
        host: '0.0.0.0',
        port: 8080
    },
    prod: {
        publicPath: prodPublicPath,
        apiDomain: '',
    },
    stat: {
        host: '0.0.0.0',
        port: 8888,
    },
    copypaths: [
        { from: htmlDir, to: 'htmls' }
    ],
    plugins: (() => {
        let ps = []
        let plugins = [];
        pluginsConfig.forEach((plugin) => {
            let name = plugin.name
            css = plugin.css ? prodPublicPath + 'plugins/' + name + '.css' : false;
            javascript = plugin.javascript ? prodPublicPath + 'plugins/' + name + '.js' : false;
            plugins.push({
                name: name,
                css: css,
                javascript: javascript,
                enable: plugin.enable
            });

            ps.push({
                test: plugin.test,
                name: name,
                priority: 1,
                chunks: 'async',
            });
        });

        let data = {};
        data['plugins'] = plugins;
        data['domain'] = prodPublicPath;
        fs.writeFileSync(uiConfigFile, JSON.stringify(data));
        return ps;
    })(),
    path: {
        currentDir: rootDir,
        srcDir: srcDir,
        pageDir: pageDir,
        distDir: distDir,
        pageDistDir: pageDistDir,
        faviconDir: null,
        pages: (() => {
            let pageList = [];
            fs.readdirSync(pageDir).forEach((f1) => {
                let fpath = pageDir + '/' + f1;
                if (fs.statSync(fpath).isFile()) {
					let fpname = f1.replace('.html', '');
                    pageList.push({
                        id: fpname,
                        name: fpname,
                        filename: path.resolve(distDir, './pages/' + f1),
                        template: fpath,
						entry: path.resolve(srcDir, './' + fpname + '.js')
                    });
                    return;
                }

                if (!fs.statSync(fpath).isDirectory()) {
                    return;
                }
                if (f1.indexOf('_') === 0) {
                    return;
                }
                fs.readdirSync(fpath).forEach((f2) => {
                    let fp = fpath + '/' + f2;
                    let fpname = f1 + '/' + f2.replace('.html', '');
                    if (!(fs.statSync(fp).isFile() && /\.html$/.test(fp))) {
                        return;
                    }
                    pageList.push({
                        id: fpname,
                        name: fpname,
                        filename: path.resolve(pageDistDir, './' + fpname + '.html'),
                        template: fp,
						entry: path.resolve(srcDir, './' + fpname + '.js')
                    });
                });

            });
            console.log(pageList);
            return pageList;
        })(),
        alias: {
            '~assets': assetDir,
            '~src': srcDir,
            '~scss': scssDir,
            '~plugin': pluginDir,
            'jQuery': path.resolve(rootDir, './node_modules/jquery/dist/jquery.js')
        }
    }
}

module.exports = Config