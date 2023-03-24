// bootstrap widgets
import BaseComponent from '~bootstrap/src/base-component';
import Alert from '~bootstrap/src/alert';
import Button from '~bootstrap/src/button';
import Carousel from '~bootstrap/src/carousel';
import Collapse from '~bootstrap/src/collapse';
import Dropdown from '~bootstrap/src/dropdown';
import Modal from '~bootstrap/src/modal';
import Offcanvas from '~bootstrap/src/offcanvas';
import Popover from '~bootstrap/src/popover';
import Scrollspy from '~bootstrap/src/scrollspy';
import Tab from '~bootstrap/src/tab';
import Toast from '~bootstrap/src/toast';
import Tooltip from '~bootstrap/src/tooltip';


// base ui widgets
import CardRefresh from '../widgets/CardRefresh'
import CardWidget from '../widgets/CardWidget'
import DirectChat from '../widgets/DirectChat'
import AdminDropdown from '../widgets/Dropdown'
import ExpandableTable from '../widgets/ExpandableTable'
import Fullscreen from '../widgets/Fullscreen'

import Toasts from '../widgets/toasts'
import TodoList from '../widgets/TodoList'

import HighLight from '../widgets/highlight'
import Select2 from '../widgets/select2'
import Pageination from '../widgets/Pagination'
import Treeview from '../widgets/treeview'

// bootstrap widgets
const bootstrapWidgets = {
    BaseComponent,
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    Scrollspy,
    Tab,
    Toast,
    Tooltip,
    Pageination    
}



// base widgets
const baseWidgets = {
  CardRefresh,
  CardWidget,
  DirectChat,
  AdminDropdown,
  ExpandableTable,
  Fullscreen,
 // Layout,
//  PushMenu,
//  SidebarSearch,
//  NavbarSearch,
  Toasts,
  TodoList,
Treeview,
  HighLight,
  Select2    
}

window.bootstrap = bootstrapWidgets
Object.assign(baseWidgets, bootstrapWidgets)
export default baseWidgets