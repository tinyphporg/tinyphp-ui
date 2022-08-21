import '~scss/tinyphp-ui.admin.scss'
import Tiny from './lib/Tiny.js'
import * as Widgets from './widgets/widgets'
import Pageination from './widgets/Pagination'
import AdminControlSidebar from './widgets/admin-control-sidebar'
import AdminIFrame from './widgets/admin-iframe'
//配置组件与插件
const data = {
	widgets: {
		Pageination,
        AdminControlSidebar,
        AdminIFrame
	},
	plugins: {
		
	}
}
Object.assign(data.widgets, Widgets)
export default new Tiny(data, window);