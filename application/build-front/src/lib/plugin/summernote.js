
class Summernote {

    static id = 'summernote';

    static module = null;

    static async load() {
        const module = await import('@lib/summernote');
        Summernote.module = module.default;
        return module;
    }

    static helper() {
        return {}
    }

    static alert(...arg) {
        return Summernote.load().then(m => {
            return m(...arg);
        });
    }

    static _init() {
        Summernote.alert._self = Summernote;
       // $.extend({ alert: Summernote.alert });
    }
}

Summernote._init();
export default Summernote;