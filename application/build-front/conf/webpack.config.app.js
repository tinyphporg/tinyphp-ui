const path = require('path');
const fs = require('fs');

let currentDir = path.resolve(__dirname, '../');
let srcDir = path.resolve(currentDir, './src');
let viewDir = path.resolve(currentDir, './src/views');
let assetDir = path.resolve(currentDir, './src/assets');
let projectDir = path.resolve(__dirname, '../../../');
let publicDir = path.resolve(projectDir,'./public');
let distDir = path.resolve(publicDir,'./static');
let adminlteDir = path.resolve(projectDir,'./node_modules/adminlte');
let pluginDir = path.resolve(srcDir, './plugin');

module.exports = {
	isProd: (process.env.NODE_ENV === 'prod'),
	copyright: '',
	dev: {
		publicPath: 'http://front.dev.tinycn.com/',
		apiDomain: 'http://api.dev.tinycn.com/',
		host: 'localhost',
		port: 8080
	},
	prod: {
		publicPath: '/static/',
		apiDomain: '',
	},
	stat: {
		host: 'localhost',
		port: 8888,
	},
	path: {
		currentDir: currentDir,
		srcDir: srcDir,
		viewDir: viewDir,
		distDir: distDir,
		faviconDir: path.resolve(assetDir, './img/favicon.ico'),
		haveAdminlte:(() => {	
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