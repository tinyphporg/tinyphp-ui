import '~scss/tinyphp-ui.scss';
import Tiny from './Tiny.js';
import Pageination from './widgets/Pagination';

//配置组件与插件
const data = {
	widgets: {
		Pageination				
	},
	plugins: {
	}
}

export default new Tiny(data, window);