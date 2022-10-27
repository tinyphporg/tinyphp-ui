import './daterangepicker.scss'
import * as Daterangepicker from 'daterangepicker/daterangepicker.js'
import * as moment from 'moment/moment'

// moment
moment.locale('zh-cn')
$.extend($.tiny, {daterangepicker: Daterangepicker, moment: moment})
export default Daterangepicker
