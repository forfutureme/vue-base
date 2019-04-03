/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 15:47:32 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 18:39:12
 * @Desc: 时间类处理方法 
 */
import { zeroFill } from './base'

/**
 * 时分秒时间戳互转
 * @param str
 * @returns {*}
 */
export function translateTime(str) {
  let res
  if (/^\d+$/.test(str)) {
    let h = Math.floor(str / 60 / 60)
    let m = Math.floor((str - h * 60 * 60) / 60)
    let s = str - h * 60 * 60 - m * 60
    res = `${zeroFill(h)}:${zeroFill(m)}:${zeroFill(s)}`
    return res
  }
  let arr = str.split(':')
  res = arr[0] * 60 * 60 + arr[1] * 60 + arr[2] * 1
  return +res
}

/**
 * 解析时间戳到具体时间对象
 * @param dateTime
 * @returns {{year: number, mouth: number, date: number, yearMouth: string, ym: string, mouthDate: string, md: string, ymd: string, fullTime: string, day: number, dayText: *}}
 */
export function dateToDataObj(dateTime) {
  let time
  if (typeof dateTime === 'string' && dateTime.indexOf('-') > -1) {
    time = dateTime.replace(/-/g, '/')
  } else {
    time = dateTime
  }
  let d = time ? new Date(time) : new Date()
  let year = d.getFullYear()
  let mouth = d.getMonth() + 1
  let date = d.getDate()
  let hour = d.getHours()
  let min = d.getMinutes()
  let sec = d.getSeconds()
  let day = d.getDay() || 7
  let dayMap = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    7: '星期天'
  }
  let mouthEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let mouthZn = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return {
    year,
    mouth: zeroFill(mouth),
    date: zeroFill(date),
    yearMouth: `${year}年${mouth}月`,
    ym_: `${year}-${zeroFill(mouth)}`,
    ym: `ym${year}${zeroFill(mouth)}`,
    mouthDate: `${zeroFill(mouth)}-${zeroFill(date)}`,
    mdText: `${zeroFill(mouth)}月${zeroFill(date)}日`,
    md: `md${zeroFill(mouth)}${zeroFill(date)}`,
    md_: `${zeroFill(mouth)}-${zeroFill(date)}`,
    ymd: `${year}-${zeroFill(mouth)}-${zeroFill(date)}`,
    fullTime: `${year}-${zeroFill(mouth)}-${zeroFill(date)} ${zeroFill(hour)}:${zeroFill(min)}:${zeroFill(sec)}`,
    hm: `${zeroFill(hour)}:${zeroFill(min)}`,
    ms: `${zeroFill(min)}:${zeroFill(sec)}`,
    day,
    dayText: dayMap[day],
    mEn: mouthEn[mouth - 1],
    mZn: `${mouthZn[mouth - 1]}月`
  }
}

/**
 *  格式化时间，多少XX前
 * @param {Date} time
 * @param {String} option
 * @returns {String}
 */
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 转化时间
 * @param {Date} time
 * @param {String} cFormat
 * @returns {String}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 转换当前日期 零点 时间戳
 * @author yang
 * @returns left right
 */
export function date2TimeStamp() {
  const t = parseInt(
    +new Date(
      new Date().getFullYear() + '-' + (
        (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
      ) + '-' + (
        new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      ) + ' ' + '00:00:00'
    ) / 1000
  )
  return t
}

/**
 * 获取当前时间段 -- 时间提醒
 */
export function getNowDateShow() {
  const t = new Date()
  const h = t.getHours()
  if (+h >= 0 && +h < 6) {
    return '凌晨好'
  } else if (+h >= 6 && +h < 8) {
    return '早上好'
  } else if (+h >= 8 && +h < 11) {
    return '上午好'
  } else if (+h >= 11 && +h < 13) {
    return '中午好'
  } else if (+h >= 13 && +h < 18) {
    return '下午好'
  } else if (+h >= 18 && +h < 24) {
    return '晚上好'
  }
}