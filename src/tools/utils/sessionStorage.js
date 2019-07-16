/**
 * @Author: huweijian
 * @Date: 2019-04-28 14:14:41
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-05-30 02:01:09
 * @Desc: Session Storage方法
 */
const sessionStorage = window.sessionStorage
import { isObj } from './validate'
/**
 * 给key值加前缀
 * @param {string} key
 * @param {string} [fix='alix']
 * @returns
 */
function joinKey(key, fix = 'alix') {
	return `${fix}-${key}`
}
/**
 * 获取某个key对应的值
 * @export
 * @param {*} key
 * @param {boolean} [parse=false]
 * @returns
 */
export function getItem(key, parse = false) {
	const val = sessionStorage.getItem(joinKey(key))
	return parse ? JSON.parse(val) : val
}
/**
 * 设置值
 * @export
 * @param {*} key
 * @param {*} val
 */
export function setItem(key, val) {
	sessionStorage.setItem(joinKey(key), isObj(val) ? JSON.stringify(val) : val)
}
/**
 * 设置多个值
 * @export
 * @param {*} obj
 */
export function setMoreItem(obj) {
	for (const k in obj) {
		setItem(k, obj[k])
	}
}
/**
 * 移除某个item
 *
 * @export
 * @param {*} key
 */
export function removeItem(key) {
	sessionStorage.removeItem(joinKey(key))
}
