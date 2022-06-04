import '~scss/tinyphp-ui.admin.scss';
import Tiny from './Tiny.js';
import * as Widgets from './widgets/widgets';
import Pageination from './widgets/Pagination';

//配置组件与插件
const data = {
	widgets: {
		Pageination,
	},
	plugins: {
		
	}
}
Object.assign(data.widgets, Widgets)
export default new Tiny(data, window);