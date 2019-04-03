/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 17:30:08 
 * @Last Modified by: Firmiana 
 * @Last Modified time: 2019-04-03 17:30:08 
 * @Desc: 外部资源方法 
 */


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
  })
}

/**
 * 转base64文件为file
 * @param dataurl
 * @param filename
 * @returns {File}
 */
export function dataURLtoFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

/**
 * 通过图片url获取blob数据
 * @param url
 * @returns {Promise<any>}
 */
export function getImageBlob(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(URL.createObjectURL(this.response))
      } else {
        reject(xhr)
      }
    }
    xhr.send()
  })
}

/**
 * 加载图片
 * @param img
 * @returns {Promise<any>}
 */
export function loadImg(img) {
  image.src = img
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (e) => {
      reject(e)
    }
  })
}