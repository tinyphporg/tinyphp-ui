import Prototype from '@lib/tinyphp/Prototype';
import alert from '@lib/tinyphp/Alert';
import '@lib/bootstrap';
import AdminLTE from '@lib/adminlte';
import Plugin from '@lib/tinyphp/Plugin';


const TinyPHP = function(...arg){
    return new Plugin(...arg);
}

TinyPHP.merge = Prototype.merge;

TinyPHP.Plugin = Plugin;

TinyPHP.ProtoType = Prototype;

TinyPHP.AdminLTE = AdminLTE;


TinyPHP._JQueryExtends = {
    alert: alert
}

TinyPHP._JQueryFnExtends = {
    
}

/* JQuery API */
$.extend(TinyPHP._JQueryExtends);
$.fn.extend(TinyPHP._JQueryFnExtends);

export default TinyPHP;