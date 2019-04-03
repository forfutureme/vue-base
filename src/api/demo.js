/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 16:56:36 
 * @Last Modified by: Firmiana 
 * @Last Modified time: 2019-04-03 16:56:36 
 * @Desc: 接口示例 
 */

import { toAxios, getAxios } from 'api/toAxios'

export default {
  /**
   * 接口示例
   * @param o {object} 接口入参
   * @param c {object} 配置
   * @returns {Promise<*|void>}
   */
  async getDemoList (o, c) {
    let r = await getAxios('xxx/xxxx', o, c)
    return r
  }
}
