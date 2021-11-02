const path = require('path');
const fs = require('fs');
const pluginsConfig = require('./tinyphp.plugin.js');
const { merge } = require('webpack-merge');

let currentDir = path.resolve(__dirname, '../');
let srcDir = path.resolve(currentDir, './src/js');
let viewDir = path.resolve(currentDir, './src/js/views');
let assetDir = path.resolve(currentDir, './src/js/assets');
let projectDir = path.resolve(__dirname, '../');
let publicDir = path.resolve(projectDir, './dist');
console.log(publicDir)
let distDir = path.resolve(publicDir, './tinyphp-bootstrap');
let adminlteDir = path.resolve(projectDir, './node_modules/adminlte');
let libDir = path.resolve(currentDir, './src/js/lib');
let configFile = path.resolve(libDir, './config.json');

let pluginDir = path.resolve(currentDir, './src/js/plugins');
let prodPublicPath = '/tinyphp-bootstrap/';
let devPublicPath = 'http://front.dev.tinycn.com/';

const Config = {
    isProd: (process.env.NODE_ENV === 'prod'),
    copyright: '',
    dev: {
        publicPath: devPublicPath,
        staticDir: pluginDir,
        apiDomain: 'http://api.dev.tinycn.com/',
        host: 'localhost',
        port: 8080
    },
    prod: {
        publicPath: prodPublicPath,
        apiDomain: '',
    },
    stat: {
        host: 'localhost',
        port: 8888,
    },
    copypaths: [
        { from: pluginDir, to: 'plugins' }
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
        fs.writeFileSync(configFile, JSON.stringify(data));
        return ps;
    })(),
    path: {
        currentDir: currentDir,
        srcDir: srcDir,
        viewDir: viewDir,
        distDir: distDir,
        publicDir:publicDir,
        faviconDir: path.resolve(assetDir, './img/favicon.ico'),
        haveAdminlte: (() => {
            if (!fs.existsSync(adminlteDir) || !fs.open) {
                return false;
            }

            return true;
        })(),
        viewPages: (() => {
            let views = [];
            fs.readdirSync(viewDir).forEach((f1) => {
                let fpath = viewDir + '/' + f1;
                if (!fs.statSync(fpath).isDirectory()) {
                    return;
                }
                fs.readdirSync(fpath).forEach((f2) => {
                    let fp = fpath + '/' + f2;
                    if (!(fs.statSync(fp).isFile() && /\.js$/.test(fp))) {
                        return;
                    }
                    let tfp = fp.replace('.js', '.html');
                    if (!fs.existsSync(tfp)) {
                        return;
                    }
                    let conf = {};
                    let jfp = fp.replace('.js', '.json');
                    if (fs.existsSync(jfp)) {
                        conf = merge(conf, require(jfp));
                    }
                    views.push({
                        id: f1 + '-' + f2.replace('.js', ''),
                        name:  f1 + '-' + f2.replace('.js', ''),
                        entry: fp,
                        template: fp.replace('.js', '.html'),
                        conf:conf
                    });
                })

            });
            console.log(views);
            return views;
        })(),
        alias: {
            '@assets': assetDir,
            '@lib': libDir,
            '@src': srcDir
        }
    }
}

module.exports = Config