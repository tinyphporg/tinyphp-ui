import $ from 'jquery';
import Prototype from '@lib/tinyphp/Prototype';
import '@lib/bootstrap';
import AdminLTE from '@lib/adminlte';

import Plugin from '@lib/plugin/Plugin';



class Tiny {

    static _$ = $;

    static _window = window;

    static _Prototype = Prototype;

    static _AdminLTE = AdminLTE;

    static _Plugin = Plugin;

    static merge = Prototype.merge;

    static extend = Prototype.extend;

    static _init() {
        new Tiny._Plugin(Tiny);
    }
}

Tiny._init();

export default Tiny;