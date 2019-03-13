/**
 * Created by huweijian on 2018/4/10.
 * @title 一个模块的空模板
 */
import * as types from 'store/mutation-types'
import Api from 'api/api'

// state
const state = {
}

// state获取方法
const getters = {}

// actions
const actions = {
  // [types.ACTIONS]: async ({commit}, {next}) => {
  //   let r = await Api.xx()
  //   if (r === -1) {
  //     return
  //   }
  //   commit(types.COMMIT, r)
  //   next && next()
  // }
}

// mutations
const mutations = {
  // [types.COMMIT] (state, flag) {
  //   state.xxx = flag
  // }
}

/**
 * 输出模块store
 */
export default {
  state,
  getters,
  actions,
  mutations
}
