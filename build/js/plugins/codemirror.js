import BasePlugin from './base-plugin'


const NAME = 'codemirror'

const DATA_NAME = NAME
const REGEX_LANGUAGE = 'language-(\\w+)'  // language-shell
const DATA_LANGUAGE = 'language'    // data-language="shell"
const DATA_READONLY = 'readonly'    // data-readonly="true"
const DATA_TEXT_TARGET = 'text-target' // data-text-target="#codesource"

// default options
const Default = {
    language: 'javascript',
    readonly: false,
    callback: function() { }
}

class Codemirror extends BasePlugin {
    constructor() {
        super()
        this.id = NAME
        this.preload = true
        Codemirror._currentInstance = this
        this.jqueryFnExtend = {
            codemirrorx: this.codemirrorx
        }
    }
    // public
    load = async () => {
        const module = await import('./codemirror/codemirror')
        return module.default
    }

    loadLanguage = async (lang) => {
        const language = typeof lang  === 'string' ?  lang.toLowerCase() : 'html'
        const codemirror = await this.load()
        const languages = codemirror.languages
        let languageDesc = null
        for (let i = 0; i < languages.length; i++) {
            if (languages[i]['name'].toString().toLowerCase() === language) {
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

    createCodemirror = async ($element, language, isReadonly, text) => {
        // codemirror load language package
        let languageComponent = await this.loadLanguage(language)
        if (!languageComponent) {
            return
        }
        // editor text
        let doc = text ? text : $element.text()
        $element.text('')
        if (language === 'php' && doc.toString().indexOf('<?php') < 0) {
            doc = "<?php\n" + doc
        }

        const codemirror = await this.load()
        let extensions = [codemirror.basicSetup, languageComponent]
        if (isReadonly) {
            extensions.push(codemirror.EditorState.readOnly.of(true))
        }
        let startState = codemirror.EditorState.create({
            doc: doc,
            extensions: extensions
        })

        const $container = $element[0];
        const $parent = $element[0].parentNode;

        // textarea
        if ($container.tagName === 'TEXTAREA') {
            let $newContainer = document.createElement('code');
            if ($container.id) {
                $newContainer.setAttribute('id', $container.id)
            }
            $newContainer.setAttribute('class', $container.className)
            $parent.removeChild($container)
            $parent.appendChild($newContainer)
        }

        const editorView = new codemirror.EditorView({
            state: startState,
            parent: $parent
        })
        $element.data(DATA_NAME, editorView)
        return editorView
    }

    codemirrorx = async function(config) {
        const self = Codemirror._currentInstance

        // format options 
        let option = Default
        if (typeof config === 'object') {
            if (config.hasOwnProperty('language') && typeof config['language'] === 'string') {
                option.language = config['language']
            }
            if (config.hasOwnProperty('readonly') && typeof config['readonly'] === 'boolean') {
                option.readonly = config['readonly']
            }
            if (config.hasOwnProperty('callback') && typeof config['callback'] === 'function') {
                option.callback = config['callback']
            }
        } else if (typeof config === 'function') {
            option.callback = config
        }
        const codemirror = await self.load()
        
        return $(this).each(async function() {
            const $element = $(this)
            if ($element.data(DATA_NAME)) {
                return;
            }

            let isReadonly = $element.data(DATA_READONLY) ?? option.readonly
            let language = $element.data(DATA_LANGUAGE) ?? option.language
            let textTarget = $element.data(DATA_TEXT_TARGET)
            let text = ''
            if (textTarget && $(textTarget).length) {
                text = $(textTarget).text()
            }
            let callback = option.callback
            if (!language) {
                let className = $element.attr('class')
                let regex = new RegExp(REGEX_LANGUAGE)
                if (regex.test(className)) {
                    let matchs = className.match(regex)
                    language = matchs[1]
                }
            }
            // 
            const editviewor = await self.createCodemirror($element, language, isReadonly, text)
            callback.call(this, editviewor, codemirror)
            return editviewor
        })
    }
}

export default Codemirror;