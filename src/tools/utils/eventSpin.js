/**
 * @Author: Firmiana
 * @Date: 2019-04-29 12:07:47
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-07 21:53:23
 * @Desc: 全局加载状态方法
 */

import store from '@store/index'
import * as types from '@store/mutation-types'

/**
 * 简单封装loading弹层控制
 * @param o
 */
export function loading(o = {}) {
  store.commit(types.THE_LOADING_CTRL, {
    show: false,
    ...o
  })
}
