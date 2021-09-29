
import Alert from './alert';
import Summernote from './summernote';

class Plugin {

    
    static _plugins = [
        Alert,
        Summernote,
    ];


    constructor(tiny) {
        this.Tiny = tiny;
        this._self = Plugin;
        $.extend({ tiny:Plugin });
    }
}



export default Plugin