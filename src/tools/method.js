/**
 * Created by huweijian on 2018/3/20.
 * @title 一些公共方法的集合，以插件的形式，混入到Vue中，免得每每引入，并以call(this)的形式调用
 */
import { date, tableau } from './utils/index'
function bodyScroll (e) {
  e.preventDefault()
}
export default {
  install (Vue, options) {
    Vue.mixin({
      // 在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀，并附带自己的命名空间
      filters: {
        /**
         * 格式化数字，去掉小数点后
         * @param val
         * @returns {string}
         */
        $_JTToFixedAsset (val) {
          return Number(val || 0).toFixed(0)
        },
        /**
         * 返回后缀132的图片
         * @param str
         * @returns {*|void|string}
         */
        $_JTGetImgTo132 (str = '') {
          return tableau.imgTozSize(str)
        },
        /**
         * 返回年月日时间
         * @param time 时间戳
         * @returns {string} yyyy-mm-dd
         */
        $_JTGetYMD (time) {
          return date.dateToDataObj(time).ymd
        }
      },
      methods: {
        $_JTImgTo132 (str = '') {
          return tableau.imgTozSize(str)
        },
        /**
         * 返回上一路由
         */
        $_JTGoBack () {
          this.$router.go(-1)
        },
        /**
         * 跳转指定路由
         * @param name 路由名称
         * @param params 路由参数
         * @param query 查询参数
         */
        $_JTJumpToPage (name, params = {}, query = {}) {
          this.$router.push({
            name,
            params: { ...params },
            query: { ...query }
          })
        }
      }
    })
  }
}
