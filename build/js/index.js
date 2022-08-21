import '~scss/tinyphp-ui.app.scss';
import Tiny from './lib/Tiny';
import Pageination from './widgets/Pagination';
import * as Widgets from './widgets/widgets';
//配置组件与插件
const data = {
	widgets: {
		pageination: Pageination,
					
	},
	plugins: {
	}
}
Object.assign(data.widgets, Widgets)
export default new Tiny(data, window);
