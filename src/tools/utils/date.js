/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 15:47:32 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 16:39:25
 * @Desc: 时间类处理方法 
 */


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
