/**
 * Created by huweijian on 2017/4/4.
 * @title 全局使用 mutation
 */

import store from 'store/index'
import * as types from './mutation-types'

export default {
  /**
   * 统一commit设置一些必备信息
   * @param state
   * @param obj
   */
  [types.SET_INFO]: (state, obj) => {
    let arr = Object.keys(obj)
    arr.forEach((k) => {
      state[k] = obj[k]
    })
  }
}
