/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import * as types from '../store/mutation-types'
// import api from '../api/api'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('views/index')
    }
  ]
})

// 路由钩子
// router.afterEach((to, from) => {
//
// })
// router.beforeEach((to, from, next) => {
//   // 路由进入前的一些处理
//   next()
// })

export default router
