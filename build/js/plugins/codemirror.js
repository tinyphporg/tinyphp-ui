import BasePlugin from './base-plugin'

// swal
class Codemirror extends BasePlugin {
    constructor() {
        super()
        this.id = 'codemirror'
        this.preload = true
        Codemirror._currentInstance = this
        this.jqueryFnExtend = { highlight: this.highlight }
    }

    /* webpackChunkName: codemirror */
    load = async () => {
        const module = await import('./codemirror/codemirror')
        $.extend({ codemirror: module.default})
        return module.default
    }

    // 加载语言包
    loadLanguage = async (lang) => {
        if (!lang) {
            lang = 'html'
        }
        const codemirror = await this.load()
        const languages = codemirror.languages
        let languageDesc = null
        for (let i = 0; i < languages.length; i++) {
            if (languages[i]['name'].toString().toLowerCase() == lang.toString().toLowerCase()) {
                languageDesc = languages[i]
                break;
            }
        }
        if (!languageDesc) {
            languageDesc = languages[13]
        }
        const languageComponent = await languageDesc.load()
        return languageComponent
    }
    
    // 高亮
    highlight = async function() {
        if (!Codemirror._currentInstance) {
            return
        }
        const codemirror = await Codemirror._currentInstance.load();

        // elements
        let $elements = $(this)
        for (let i = 0; i < $elements.length; i++) {
            let $element = $($elements[i])
            if ($element.data('editorview')) {
                continue;
            }
            let lang = $element.attr('data-lang')
            if (!lang) {
                let className = $($element).attr('class')
                if (/language-(\w+)/.test(className)) {
                    let matchs = className.match(/language-(\w+)/)
                    lang = matchs[1]
                }
            }
            let languageComponent = await Codemirror._currentInstance.loadLanguage(lang)
            if (!languageComponent) {
                continue
            }
            let doc = $element.text()
            $element.text('')
            if (lang == 'php' && doc.toString().indexOf('<?php') < 0) {
                doc = "<?php\n" + doc
            }
            
            let startState = codemirror.EditorState.create({
                doc: doc,
                extensions: [codemirror.basicSetup,languageComponent, codemirror.EditorState.readOnly.of(true)]
            })
            $($element).data('editorview', new codemirror.EditorView({
                state: startState,
                parent: $element[0]
            }))
        }
    }
}

export default Codemirror;