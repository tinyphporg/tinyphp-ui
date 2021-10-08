
class Summernote {

    static id = 'summernote';

    static preload = false;

    static postload = false;

    static jqueryExtend = null;
    
    static jqueryFnExtend = null;
    
    static _module = null;
    
    static _isLoaded() {
        return Summernote._module !== null;
    }
    
    static async load() {
        const module = await import('@lib/summernote');
        Summernote._module = module.default;
        return module.default;
    }

    static helper() {
        return {}
    }
}

export default Summernote;