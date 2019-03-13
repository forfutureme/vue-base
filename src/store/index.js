/**
 * Created by huweijian on 2017/4/4.
 * @title store
 */
/* global ENV */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 引入各个模块
import index from './modules/index'

import createLogger from 'vuex/dist/logger'

// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
Vue.use(Vuex)

const debug = ENV !== 'pro'

/**
 * 输出 store
 */
export default new Vuex.Store({
  state: {
    env: ENV
  },
  actions,
  mutations,
  getters,
  modules: {
    index
  },
  strict: debug,
  plugins: debug ? [] : [] // createLogger()
})
