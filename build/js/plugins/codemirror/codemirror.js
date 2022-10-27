import * as codemirror from 'codemirror'
import * as autocomplete from '@codemirror/autocomplete'
import * as commands from '@codemirror/commands'
import * as language from  '@codemirror/language'
import * as lint from '@codemirror/lint'
import * as search from '@codemirror/search'
import * as state from '@codemirror/state'
import * as view from '@codemirror/view' 
import * as languageData from '@codemirror/language-data'

const Codemirror = {}

$.extend(Codemirror, codemirror)
$.extend(Codemirror, autocomplete)
$.extend(Codemirror, commands)
$.extend(Codemirror, language)
$.extend(Codemirror, lint)
$.extend(Codemirror, search)
$.extend(Codemirror, state)
$.extend(Codemirror, view)
$.extend(Codemirror, languageData)
$.extend($.tiny, {codemirror: Codemirror})
export default Codemirror