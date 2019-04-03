/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 11:18:19 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 18:39:41
 * @Desc: 基础方法/未分类方法 
 */

/**
 * 解析查询查询为对象
 * @returns {{}}
 */
export function searchToObj() {
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
 * @jsonToPo
 * @returns {string}
 */
export function paramToStr(o = {}) {
  let str = ''
  for (let k in o) {
    str += `${k}=${o[k]}&`
  }
  return str ? `?${str.replace(/&$/, '')}` : str
}

/**
 * 截取字符串
 * @param str
 * @param start
 * @param end
 * @returns {string}
 */
export function strStartEnd(str, start = 7, end = 11) {
  str += ''
  return str.substring(start, end)
}

/**
 * title 标题大小写
 * @param str
 */
export function titleCase(str) {
  return `${str[0].toUpperCase()}${str.substring(1)}`
}

/**
 * 给小于10的数字 前置补0
 * @param n
 * @returns {string}
 */
export function zeroFill(n) {
  return n < 10 ? '0' + n : n
}

/**
 * 计算字符长度，汉字算2个
 * @param str
 * @returns {number}
 */
export function calcStrLength(str = '') {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length
}

/**
 * 千分位分割
 * @param num
 */
export function toThousands(num) {
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
export function numRunFun(dom, num, maxNum) {
  // console.log(maxNum)
  if (num === 0) {
    dom.innerHTML = maxNum
    return
  }
  var numText = num
  var golb // 为了清除requestAnimationFrame
  function numSlideFun() {
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
export function getHiddenName() {
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

/**
 * 获取小程序落地页入口
 * @param type
 * @returns {*}
 */
export function getSmallProgramPage(type) {
  let map = {
    card: 'pages/tabbar/card/card', // 名片
    mall: 'pages/tabbar/mall/mall', // 商城
    dynamic: 'pages/tabbar/dynamic/dynamic', // 动态
    home: 'pages/tabbar/website/website', // 官网
    products: 'subs/mall/pages/productdetail/productdetail' // 商品
  }
  return map[type]
}

/**
 * 获取字节长度
 * @param {Sting} val 
 * @returns {number} 
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

/**
 * 清理数组
 * @param {Array} actual 当前数组
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * 转化成参数
 * @param {*} json 
 */
export function jsonToParam(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * 参数转化成Obj
 * @param {*} json
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

/**
 * url操作/转换
 * @param {*} url 
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}