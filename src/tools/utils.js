/**
 * Created by huweijian on 2018/3/16.
 * @title
 */
import md5 from 'md5'
import store from 'store/index'
import * as types from 'store/mutation-types'

/**
 * 解析查询查询为对象
 * @returns {{}}
 */
export function searchToObj () {
  let search = window.location.href.split('?')[1]
  if (!search) {
    return {}
  }
  let arr = search.split('&')
  let obj = {}
  arr.forEach(item => {
    let r = item.split('=')
    obj[r[0]] = r[1]
  })
  // console.log(obj)
  return obj
}

/**
 * 转对象为字符串参数
 * @param o
 * @returns {string}
 */
export function paramsToStr (o = {}) {
  let str = ''
  for (let k in o) {
    str += `${k}=${o[k]}&`
  }
  return str ? `?${str.replace(/&$/, '')}` : str
}

export function imgTozSize (str = '', size = 132) {
  return str ? str.replace(/0$/, '132').replace(/0\.jpg(\?t=\d+)/, '132.jpg$1') : ''
}

/**
 * 设置元素属性 暂时只支持 class 和 id
 * @param name
 * @param attr
 * @param val
 */
export function setAttr (name, attr, val) {
  let dom = name.indexOf('#') > -1
    ? document.getElementById(name.replace('#', ''))
    : document.getElementsByClassName(name.replace('.', ''))
  dom.setAttribute(attr, val)
}

/**
 * 判断对象是否为空对象
 * @param o
 * @returns {boolean}
 */
export function isEmptyObj (o) {
  let r = false
  for (let k in obj) {
    r = true
  }
  return r
}

/**
 * 验证是否iPhone
 * @returns {boolean}
 */
export function isIPhone () {
  return window.navigator.appVersion.indexOf('iPhone') > -1
}

/**
 * 截取字符串
 * @param str
 * @param start
 * @param end
 * @returns {string}
 */
function strStartEnd (str, start = 7, end = 11) {
  str += ''
  return str.substring(start, end)
}

export function titleCase (str) {
  return `${str[0].toUpperCase()}${str.substring(1)}`
}

/**
 * 生成签名
 * @param timestamp
 * @param token
 * @returns {*}
 */
function sign (timestamp, token) {
  return md5('xxx')
}

/**
 * 生成签名
 * @param token
 * @returns {{timestamp: number, sign}}
 */
export function createSign (token) {
  let timestamp = +new Date()
  // console.log(strStartEnd(token), strStartEnd(timestamp))
  return {
    timestamp,
    sign: sign(timestamp, token)
  }
}

/**
 * 校验手机号 1+10位数字
 * @param val
 * @returns {boolean}
 */
export function checkPhone (val) {
  return /^1\d{10}$/.test(val)
}

/**
 * 校验手机验证码
 * @param val
 * @param len
 * @returns {boolean}
 */
export function checkPhoneCode (val, len = 6) {
  val = val + ''
  return /^\d+$/.test(val) && len === val.length
}

/**
 * 校验输入内容
 * @param val 待校验内容
 * @param type 校验类型 name=姓名，address=地址
 * @param mode 模式 cn=中文，en=英文
 * @param empty 是否可以不填，包含填空
 * @returns {*}
 */
export function checkText ({val, type, mode, empty = false}) {
  if (empty && /^\s+$/.test(val)) {
    return false
  }
  let map = {
    // 姓名
    name () {
      // 英文
      if (mode === 'en') {
        return /^[a-zA-Z\s]+$/.test(val)
      }
      return /^[\u4e00-\u9fa5]+$/.test(val) && val.length <= 10
    },
    // 地址
    address () {
      // 英文
      if (mode === 'en') {
        return /^[\w\s]+$/.test(val)
      }
      return /^[\u4e00-\u9fa5\w\s]+$/.test(val)
    },
    common () {
      return /^[\u4e00-\u9fa5\w\s]+$/.test(val)
    }
  }
  let func = map[type] || map['common']
  return func()
}

/**
 * 验证身份证号码合法性
 * @param idCard
 * @returns {boolean}
 */
export function checkIdCard (idCard) {
  if (idCard.length !== 18) {
    return false
  }
  const list = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const lastList = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    if (+idCard[i] >= 0 && +idCard[i] <= 9) {
      sum += +idCard[i] * list[i]
    } else {
      return false
    }
  }
  sum %= 11
  if (lastList[sum] === 10) {
    if (idCard[17].toLowerCase() === 'x') {
      return true
    }
  } else {
    if (lastList[sum] === +idCard[17]) {
      return true
    }
  }

  return false
}

/**
 * 给小于10的数字 前置补0
 * @param n
 * @returns {string}
 */
export function zeroFill (n) {
  return n < 10 ? '0' + n : n
}

/**
 * 时分秒时间戳互转
 * @param str
 * @returns {*}
 */
export function translateTime (str) {
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

export function autoHideLayer (show = false, text = '') {
  store.commit(types.LAYER_AUTO_HIDE_CTRL, {
    show,
    text
  })
}

/**
 * 解析时间戳到具体时间对象
 * @param dateTime
 * @returns {{year: number, mouth: number, date: number, yearMouth: string, ym: string, mouthDate: string, md: string}}
 */
export function dateToDataObj (dateTime) {
  let d = new Date(dateTime)
  let year = d.getFullYear()
  let mouth = d.getMonth() + 1
  let date = d.getDate()
  let hour = d.getHours() < 10 ? ('0' + d.getHours()) : d.getHours()
  let minute = d.getMinutes() < 10 ? ('0' + d.getMinutes()) : d.getMinutes()
  let second = d.getSeconds() < 10 ? ('0' + d.getSeconds()) : d.getSeconds()
  return {
    year,
    mouth,
    date,
    yearMouth: `${year}年${mouth}月`,
    date2Str: `${year}年${mouth}月${date}日 ${hour}:${minute}:${second}`,
    ym: `ym${year}${zeroFill(mouth)}`,
    mouthDate: `${zeroFill(mouth)}-${zeroFill(date)}`,
    md: `md${zeroFill(mouth)}${zeroFill(date)}`,
    ymd: `${year}-${zeroFill(mouth)}-${zeroFill(date)}`
  }
}

/**
 * 千分位分割
 * @param num
 */
export function toThousands (num) {
  num = +num
  num = (num || 0) + ''
  let r = ''
  while (num.length > 3) {
    r = ',' + num.slice(-3) + r
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    r = num + r
  }
  return r
}

/**
 * 数字动画
 * @param num
 * @param maxNum
 */
export function numRunFun (dom, num, maxNum) {
  // console.log(maxNum)
  if (num === 0) {
    dom.innerHTML = maxNum
    return
  }
  var numText = num
  var golb // 为了清除requestAnimationFrame
  function numSlideFun () {
    numText += 1 // 速度的计算可以为小数
    if (numText >= maxNum) {
      numText = maxNum
      window.cancelAnimationFrame(golb)
    } else {
      golb = window.requestAnimationFrame(numSlideFun)
    }
    dom.innerHTML = ~~(numText)
  }

  numSlideFun()
}

/**
 * 获取各浏览器激活字段
 * @returns {string}
 */
export function getHiddenName () {
  let name = ''
  if ('hidden' in document) {
    name = 'hidden'
  }
  if ('webkitHidden' in document) {
    name = 'webkitHidden'
  }
  if ('mozHidden' in document) {
    name = 'mozHidden'
  }
  return name
}
