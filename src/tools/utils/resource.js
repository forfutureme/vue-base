/**
 * @Author: Firmiana
 * @Date: 2019-04-03 17:30:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-08 19:10:24
 * @Desc: 外部资源方法
 */

/* global XMLHttpRequest */
/* global FileReader */
/* global Image */
/* global File */
/* global atob */
const reader = new FileReader()
const image = new Image()
image.setAttribute('crossOrigin', '')

/**
 * 转读取本地文件为同步
 * @param file
 * @returns {Promise<*>}
 */
export async function readFile(file) {
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = e => {
      reject(-1)
    }
  })
}

/**
 * 转base64文件为file文件
 * @param data {string} base64数据字符串
 * @param filename {string} 文件名
 * @returns {File}
 */
export function dataURLtoFile(data, filename = 'file') {
  const arr = data.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

/**
 * 通过图片url获取blob数据
 * @param url {string} 链接
 * @returns {Promise<any>}
 */
export function getImageBlob(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function() {
      if (this.status === 200) {
        resolve({
          code: 1,
          data: URL.createObjectURL(this.response)
        })
      } else {
        reject(xhr)
      }
    }
    xhr.onerror = e => {
      reject(e)
    }
    xhr.send()
  })
}

/**
 * 加载图片
 * @param img {string} 图片地址url
 * @returns {Promise<any>}
 */
export function loadImg(img) {
  image.src = img
  return new Promise((resolve, reject) => {
    image.onload = e => {
      resolve(image)
    }
    image.onerror = e => {
      reject(-1)
    }
  })
}

/**
 * 获取图片实体内容
 * @param str {string} 图片url活着base64串
 * @return {Promise<*>}
 */
export async function getImgBody(str) {
  const r = {
    code: -1,
    msg: '获取图片失败'
  }
  // 如果是url资源
  let imgContext = str
  if (/^http/.test(str)) {
    const contextR = await getImageBlob(str)
    if (contextR.code !== 1) {
      r.msg = contextR
      return
    }
    imgContext = contextR.data
  }
  const imgBodyR = await loadImg(imgContext)
  if (imgBodyR.code !== 1) {
    r.msg = imgBodyR
    return r
  }
  return imgBodyR
}
