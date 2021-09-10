const path = require('path');
const fs = require('fs');
const pluginsConfig = require('./webpack.config.plugin.js');
let currentDir = path.resolve(__dirname, '../');
let srcDir = path.resolve(currentDir, './src');
let viewDir = path.resolve(currentDir, './src/views');
let assetDir = path.resolve(currentDir, './src/assets');
let projectDir = path.resolve(__dirname, '../../../');
let publicDir = path.resolve(projectDir, './public');
let distDir = path.resolve(publicDir, './static');
let adminlteDir = path.resolve(projectDir, './node_modules/adminlte');
let appDir = path.resolve(currentDir, './src/app');
let pluginConfigFile = path.resolve(appDir, './plugins.json');


let prodPublicPath = '/static/';
let devPublicPath = 'http://front.dev.tinycn.com/';
module.exports = {
    isProd: (process.env.NODE_ENV === 'prod'),
    copyright: '',
    dev: {
        publicPath: devPublicPath,
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
    plugins: (() => {
        let ps = []
        let plugins = [];
        pluginsConfig.forEach((plugin) =>{
            let name =  plugin.name
            css = plugin.css ? prodPublicPath + 'plugins/' + name + '.css' : false;
            javascript = plugin.javascript ? prodPublicPath + 'plugins/' + name + '.js' : false;
            plugins.push({
                name: name,
                css: css,
                javascript: javascript,
                enable:plugin.enable
            });
            
            ps.push({
                test:plugin.test,
                name: '../plugins/' + name,
                priority: 1,
                chunks: 'all',
            });
        });
        console.log(plugins,ps);
        return ps;
    })(),
    path: {
        currentDir: currentDir,
        srcDir: srcDir,
        viewDir: viewDir,
        distDir: distDir,
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
                    views.push({
                        id: f1 + '/' + f2.replace('.js', ''),
                        entry: fp,
                        template: fp.replace('.js', '.html')
                    });
                })

            });
            return views;
        })(),
        alias: {
            '@assets': assetDir,
            '@app': path.resolve(srcDir, './app')
        }
    }
}