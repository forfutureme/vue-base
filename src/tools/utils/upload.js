/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 16:09:34 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 16:38:46
 * @Desc: 文件传输相关方法 
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
 * 上传图片到腾讯云
 * @param companyId
 * @param cardId
 * @param folder
 * @param files
 * @param suffix
 * @param progress
 * @returns {Promise<*>}
 */
export async function tencentCloud({ companyId, cardId, folder, files, suffix, progress }) {
  return new Promise((resolve, reject) => {
    let cos = new COS({
      getAuthorization: function (options, callback) {
        // 异步获取签名
        console.log(options)
        axios.get(`https://download.aijiatui.com/api/Auth/signature?method=${options.Method || 'GET'}&pathname=${'/' + (options.Key || '')}`)
          .then((res) => {
            // let obj = JSON.parse(authorization)
            console.log('authorization', res)
            let data = res.data
            callback(data.signature)
          })
      }
    })
    // 初始化配置
    let Bucket = 'resource-1255821078'
    let Region = 'ap-guangzhou'
    // 分片上传
    let datas = []
    let num = 0
    let timestamp = +new Date()
    for (let i = 0; i < files.length; i++) {
      let key = `/${companyId}/${cardId}/${folder}/${timestamp}${i}.${suffix}`
      cos.sliceUploadFile(
        {
          Bucket: Bucket,
          Region: Region,
          Key: key,
          Body: files[i],
          onProgress: function (p) {
            console.log(p)
            progress && progress(p)
          }
        },
        function (err, data) {
          console.log('sliceUploadFile---err', err)
          console.log('sliceUploadFile----data', data)
          if (err !== null) {
            reject(err)
            return
          }
          num++
          data.Location = 'https://resource.aijiatui.com' + key
          datas.push(data)
          if (num === files.length) {
            resolve({
              code: 1,
              list: datas
            })
          }
        }
      )
    }
  })
}