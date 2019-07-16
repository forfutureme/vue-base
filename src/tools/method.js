/**
 * Created by huweijian on 2018/3/20.
 * @title 一些公共方法的集合，以插件的形式，混入到Vue中，免得每每引入，并以call(this)的形式调用
 */
import utils from '@utils/index'

export default {
	install(Vue, options) {
		Vue.mixin({
			// 在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀，并附带自己的命名空间
			filters: {
				/**
         * 格式化数字，去掉小数点后
         * @param val
         * @returns {string}
         */
				$_ALIXToFixedAsset(val) {
					return Number(val || 0).toFixed(0)
				},
				/**
         * 返回后缀132的图片
         * @param str
         * @returns {*|void|string}
         */
				$_ALIXGetImgTo132(str = '') {
					return utils.tableau.imgTozSize(str)
				},
				/**
         * 返回年月日时间
         * @param time 时间戳
         * C
         */
				$_ALIXGetYMD(time) {
					return utils.date.dateToDataObj(time).ymd
				},
				/**
         *
         * @param {string} 1
         * @returns {string} ￥0.01
         */
				$_ALIXFenToYuan(v) {
					return (v / 100).toLocaleString('zh', {
						style: 'currency',
						currency: 'CNY'
					})
				},
				/**
         *
         * @param {string} 10000
         * @returns {string} 10,000
         */
				$_ALIXDecimal(v) {
					return v.toLocaleString('zh', { style: 'decimal' })
				},
				/**
         * 千分化数字
         * @param {*} v 要转化的数字
         */
				$_ALIXToThousands(v) {
					return utils.base.toThousands(v)
				},
				/**
         * @param {number} 389
         * @param {number} 2
         * @returns {string} 3.89
         */
				$_ALIXCustomDecimalToNum(num, pow = 2) {
					return Math.round(Math.round(Number(num) * Math.pow(10, pow)) / 10)
				}
			},
			directives: {},
			methods: {
				$_ALIXImgTo132(str = '') {
					return utils.tableau.imgTozSize(str)
				},
				/**
         * 返回上一路由
         */
				$_ALIXGoBack() {
					this.$router.go(-1)
				},
				/**
         * 跳转指定路由
         * @param path 路由名称
         * @param params 路由参数
         * @param query 查询参数
         */
				$_ALIXJumpToPage({ name = '', params = {}, query = {}, path = '' }) {
					const pathObj = path ? { path } : {}
					const nameObj = name ? { name } : {}
					this.$router.push({
						...pathObj,
						...nameObj,
						params: { ...params },
						query: { ...query }
					})
				}
			}
		})
	}
}
