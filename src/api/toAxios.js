/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
/* global POOL */
/* global HOST */
/* global ENV */
/* global localStorage */
import axios from 'axios'

import store from '../store/index'
import * as types from '../store/mutation-types'
import { base, signFlag } from '../tools/utils/index'
import method from '@/tools/method'

/**
 * 封装正常的ajax请求
 * @param path {string} api路径
 * @param params {object} 请求参数
 * @param config {object} 配置参数
 * @returns {Promise<*>}
 */
export async function toAxios (path, params = {}, config = { shadow: true, method: 'POST' }) {
  console.log(path, params, config)
  try {
    // 更具环境配置自动拼接url
    let url = `${POOL}://${HOST}${ENV === 'dev' ? ':7001' : '/xxxx'}/${path}`
    // let token = localStorage.getItem('token') || store.state.token
    // 调用接口 前开启遮罩和loading
    if (config.shadow) {
    }
    
    // let signInfo = token ? signFlag.createSign(token) : {}
    // 调用axios方法发送请求
    let r = await axios({
      method: 'get',
      headers: {
        // token,
        // ...signInfo
      },
      url: url,
      data: params
    })
    // 接口返回后取消遮罩
    if (config.shadow) {
      // store.commit(types.SHADOW_CTRL, false)
      // store.commit(types.LOADING_CTRL, false)
    }
    // 接口正常返回
    return result(r)
  } catch (e) {
    console.error(e)
    // store.commit(types.SHADOW_CTRL, false)
    // store.commit(types.LOADING_CTRL, false)
    // store.commit(types.LAYER_AUTO_HIDE_CTRL, {
    //   show: true,
    //   text: '网络出错，请重试'
    // })
    return -1
  }
}
export async function getAxios (path, params = {}, config = {shadow: true}) {
  try {
    let url = `${POOL}://${HOST}${ENV === 'dev' ? ':7001' : '/xxxx'}/${path}`
    // let token = localStorage.getItem('token') || store.state.token
    // 调用接口 前开启遮罩和loading
    if (config.shadow) {
    }
    let r = await axios.get(`${url}${base.paramsToStr(params)}`)
    return result(r)
  } catch (e) {
    console.error(e)
    return -1
  }
}
/**
 * 单纯的发个请求，不关心返回值
 * @param url
 * @param params
 * @param config
 */
export function toSend (url, params, config) {
  return axios({
    method: (config && config.method) || 'POST',
    url: url,
    data: params
  })
}

function result (r) {
  // 接口正常返回
  if (r.status === 200) {
    let res = r.data
    return res
    // 异常处理
    // if (res.code === 490 || res.code === 444) {
    // }
    // if (res.code === 200) {
    //   return res.data
    // }
    // 异常提示
    // store.commit(types.LAYER_AUTO_HIDE_CTRL, {
    //   show: true,
    //   text: res.msg
    // })
    return -1
  }
  console.error(r)
  // store.commit(types.LAYER_AUTO_HIDE_CTRL, {
  //   show: true,
  //   msg: '系统错误'
  // })
  return -1
}
