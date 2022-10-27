import '~scss/tinyphp-ui.admin.scss'
import Tiny from './core/Tiny.js'

// admin widgets
import ControlSidebar from './widgets/admin/control-sidebar'
import Layout from './widgets/admin/layout'
import PushMenu from './widgets/admin/pushMenu'
import Treeview from './widgets/admin/treeview'

export default new Tiny({
    widgets: {
        Layout,
        PushMenu,
        Treeview,
        ControlSidebar
    },
    plugins: {}
})