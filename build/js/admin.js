
import '~scss/tinyphp-ui.admin.scss'
import Tiny from './core/tiny.js'

// admin widgets
import ControlSidebar from './widgets/admin/control-sidebar'
import Layout from './widgets/admin/layout'
import PushMenu from './widgets/admin/pushMenu'


export default new Tiny({
    widgets: {
        Layout,
        PushMenu,
        ControlSidebar
    },
    plugins: {}
})