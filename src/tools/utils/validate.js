/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 11:17:32 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 17:09:38
 * @Desc: 验证类方法 
 */

/**
* 验证是否iPhone
* @returns {boolean}
*/
export function isIPhone() {
  return window.navigator.appVersion.indexOf('iPhone') > -1
}

/**
 * 校验手机号 1+10位数字
 * @param val
 * @returns {boolean}
 */
export function checkPhone(val) {
  return /^1\d{10}$/.test(val)
}

/**
 * 校验手机验证码
 * @param val
 * @param len
 * @returns {boolean}
 */
export function checkPhoneCode(val, len = 6) {
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
export function checkText({ val, type, mode, empty = false }) {
  if (empty && /^\s+$/.test(val)) {
    return false
  }
  let map = {
    // 姓名
    name() {
      // 英文
      if (mode === 'en') {
        return /^[a-zA-Z\s]+$/.test(val)
      }
      return /^[\u4e00-\u9fa5]+$/.test(val) && val.length <= 10
    },
    // 地址
    address() {
      // 英文
      if (mode === 'en') {
        return /^[\w\s]+$/.test(val)
      }
      return /^[\u4e00-\u9fa5\w\s]+$/.test(val)
    },
    common() {
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
export function checkIdCard(idCard) {
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
 * 判断对象是否为空对象
 * @param o
 * @returns {boolean}
 */
export function isEmptyObj(o) {
  let r
  for (let k in o) {
    r = !!k
  }
  return !!r
}

/**
 * 判断当前运行环境
 * @returns {string}
 */
export function judge() {
  const ua = navigator.userAgent.toLocaleLowerCase()
  // alert(ua.indexOf('micromessenger'))
  if (ua.indexOf('jiatui') > -1) {
    return 'app'
  }
  if (ua.indexOf('micromessenger') > -1) {
    return 'wx'
  }
  return 'h5'
  // if (ua.match(/iphone|ipad|ipod/)) {
  //   return 'ios'
  // }
  // if (ua.match(/android/)) {
  //   return 'android'
  // }
}

/**
 * 检查图片
 * @param file
 * @returns {boolean}
 */
export function checkFile(file) {
  let type = file.type.split('/')[1]
  let types = ['jpg', 'png', 'jpeg']
  let sizeMax = 5000
  if (types.indexOf(type) < 0) {
    console.error(`文件类型错误，目前支持${types.join(',')}格式`)
    return false
  }
  if (file.size > sizeMax * 1024) {
    console.error(`文件过大，文件不得超过${sizeMax}KB`)
    return false
  }
  return true
}

/**
 * 等待t毫秒
 * @param t 毫秒数 默认 500
 * @returns {Promise<any>}
 */
export function wait(t = 500) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      timer = null
      clearTimeout(timer)
      resolve()
    }, t)
  })
}

/**
 * 判断对象值是否存在， 若不存在一直等待
 * @param t 多久检查一次 默认500ms
 * @param o 要检查的对象
 * @param key 要检查的key值
 * @param func 不存在时执行的方法
 * @returns {Promise<void>}
 */
export async function checkNotNull(t = 100, o, key, func = () => { }) {
  if (!o[key]) {
    func(o, key)
    await wait(t)
    await checkNotNull(t, o, key, func)
  }
}

/**
 * 判断非法用户名
 * @param {String} str - 字符串
 * @returns {Boolean}
 */
export function isvalidUsername(str) {
  const validReg = /^[a-zA-Z0-9_-]{4,16}$/
  return validReg.test(str.trim())
}

/**
 * 判断合法uri
 * @param {String} str - 字符串
 * @returns {Boolean}
 */
export function validateURL(textval) {
  const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlRegex.test(textval)
}

/**
 * 判断小写字母
 * @param {String} str - 字符串
 * @returns {Boolean}
 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 判断大写字母
 * @param {String} str - 字符串
 * @returns {Boolean}
 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 判断大小写字母
 * @param {String} str - 字符串
 * @returns {Boolean}
 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 判断邮箱
 * @param {String} email - 邮箱
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}