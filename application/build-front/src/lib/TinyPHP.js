import Prototype from '@lib/tinyphp/Prototype';
import alert from '@lib/tinyphp/Alert';
import '@lib/bootstrap';
import AdminLTE from '@lib/adminlte';
import Plugin from '@lib/tinyphp/Plugin';

class TinyPHP {

    static _window = window;
    
    static _$ = $;
    
    static Prototype = Prototype;

    static AdminLTE = AdminLTE;
    
    static Plugin  = Plugin;
    
    static merge = Prototype.merge;

    static extend = Prototype.extend;
    
    static alert = alert;
    
    static _JQueryExtends = {
        alert: alert
    }
    
    static _JQueryFnExtends = {
        
    }
    
    static _extendJQuery() {
        TinyPHP._$.extend(TinyPHP._JQueryExtends);
    }
    
    static _init() {
        TinyPHP._extendJQuery();
    }

}

TinyPHP._init();

export default TinyPHP;