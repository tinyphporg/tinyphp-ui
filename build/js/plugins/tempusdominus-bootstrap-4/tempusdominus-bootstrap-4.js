import './tempusdominus-bootstrap-4.scss'

import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/es-us'
moment.locale('zh-cn')
window.moment = moment

import DateTimePicker from 'tempusdominus-core/src/js/tempusdominus-core.js'
window.DateTimePicker = DateTimePicker

const TempusDominusBootstrap4 = require('tempusdominus-bootstrap-4/src/js/tempusdominus-bootstrap-4.js')
export default TempusDominusBootstrap4