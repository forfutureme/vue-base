/**
 * Created by huweijian on 2018/4/2.
 * @title
 */

import Vue from 'vue'
// import VueTouch from 'vue-touch'
import router from './router/index'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import './assets/stylus/style.styl'
// import * as types from './store/mutation-type'
// import Clipboard from 'clipboard' // 复制功能三方插件
import amfeFlexible from 'amfe-flexible' //rem设置js
import es6Promise from 'es6-promise'

// import {
//   Swipe,
//   SwipeItem
// } from 'mint-ui'
// import 'mint-ui/lib/swipe/style.css'
// import 'mint-ui/lib/swipe-item/style.css'

// import ECharts from 'vue-echarts'

// import method from './tools/method'
// import JTBridge from './tools/bridge'
// Vue.component('v-chart', ECharts)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// require('imports-loader?this=>window!modernizr/modernizr.js') // 引入浏览器特性检查工具
const FastClick = require('fastclick')
// 注册工具方法
// Vue.use(method)

// 结合vuex和路由
sync(store, router)
export const Root = new Vue({
  router,
  store,
  ...App
})
window.Root = Root

document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
  Root.$mount('#app')
}, false)
