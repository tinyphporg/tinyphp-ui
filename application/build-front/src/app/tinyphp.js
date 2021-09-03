import 'jquery'
import './bootstrap'
import './adminlte'
import './tinyphp.scss'

(($, window) => {

    window.plugin = function(name) {
        if (name === 'e') {
            import(/* webpackChunkName: "plugin.moment" */'moment').then(() => {
                console.log(this)
            });
        }
        if (name === 'f') {
            import('./f.js').then(() => {
                console.log(this)
            });
        }
    }
})(jQuery, window);