/**
 * author: huweijian
 * Date: 2018/12/8 - 11:49 AM
 * Name: user
 * Desc: 用户信息接口
 */
import { toAxios, getAxios } from 'api/toAxios'

export default {
  /**
   * 获取资金流水列表
   * @param o {object} 接口入参
   * @param c {object} 配置
   * @returns {Promise<*>}
   */
  async getCapitalList (o, c) {
    let r = await getAxios('user/capital', o, c)
    return r
  },
  /**
   * 获取推广订单列表
   * @param o {object} 接口入参
   * @param c {object} 配置
   * @returns {Promise<*|void>}
   */
  async getOrderList (o, c) {
    let r = await getAxios('user/order', o, c)
    return r
  },
  /**
   * 获取我购买列表
   * @param o {object} 接口入参
   * @param c {object} 配置
   * @returns {Promise<*|void>}
   */
  async getBuyList (o, c) {
    let r = await getAxios('user/buy', o, c)
    return r
  },
  /**
   * 获取我的粉丝信息
   * @param o {object} 接口入参
   * @param c {object} 配置
   * @returns {Promise<*|void>}
   */
  async getFansInfo (o, c) {
    let r = await getAxios('user/fans', o, c)
    return r
  }
}
