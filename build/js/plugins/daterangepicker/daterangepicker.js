import './daterangepicker.scss'
import Daterangepicker from  'daterangepicker'
import moment from 'moment'

import 'moment/locale/zh-cn'
import 'moment/locale/es-us'

// moment
moment.locale('zh-cn')
$.extend($.tiny, {daterangepicker: Daterangepicker, moment: moment})
export default Daterangepicker
