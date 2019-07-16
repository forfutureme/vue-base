/**
 * @Author: huweijian
 * @Date: 2019-04-28 14:09:48
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-07-16 16:31:11
 * @Desc: 封装axios方法
 */

/**
 * 方法请求第二个参数c的字段描述
 * shadow: 是否显示loading 默认值true
 * returnType: 告诉方法返回res还是res.data 默认res
 * hostType: 告诉方法要用哪个host发起请求 默认值是host 在getUrl方法中被配置
 * contentType: 告诉方法用哪个请求头 默认值json 在getHeader中配置
 * paramsType： 告诉方法参数提交方式 默认值normal即body里json提交 在joinParams种配置
 * showErrMsg： 接口请求错误显示错误信息,默认true
 */

import axios from 'axios'
// import config from '@/config/index'
import config from '../../config/index'
import utils from '@utils/index'
// import { loading } from '@utils/eventSpin'
import qs from 'qs'

// function loading(params) {}

/**
 * 重组URL
 * @param path
 * @param hostType
 * @returns {string}
 */
async function getUrl(path, hostType) {
	return `${config.api[hostType || 'host']}/${path}`
}
/**
 * 重组header
 * @returns {{token: (string)}}
 */
async function getHeader(token, contentType = 'json', acceptType = 'normal') {
	// const k = store.state.device === APP ? 'i-token' : 'token'
	const typeMap = {
		form: 'application/x-www-form-urlencoded;charset=UTF-8',
		json: 'application/json'
	}
	const t = utils.sessionStorage.getItem('i-token') || ''
	const acceptMap = {
		normal: 'application/json, text/plain, */*',
		export: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
	}
	return {
		'i-token': token || t,
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': typeMap[contentType],
		Accept: acceptMap[acceptType]
	}
}
/**
 * 重组参数
 * @param {*} paramsType
 * @param {*} params
 */
function joinParams(params, paramsType = 'normal') {
	const joinMap = {
		normal: () => {
			return params
		},
		stringify: () => {
			// return utils.base.paramToStr(params).replace(/\?/, '')
			return qs.stringify(params)
		}
	}
	return joinMap[paramsType]()
}

/**
 * 封装的post请求
 * @param path {string} api路径
 * @param params {object} 请求参数
 * @param c {object} 配置参数
 * @returns {Promise<*>}
 */
export async function postAxios(path, params = {}, c = {}) {
	// console.log(path, params, config)
	const config = {
		shadow: true,
		...c
	}
	try {
		// 更具环境配置自动拼接url ${ENV === 'dev' ? ':7001' : '/xxxx'}
		const url = await getUrl(path, config.hostType)
		// 调用接口 前开启遮罩和loading
		// if (config.shadow) {
		// 	loading({
		// 		show: true
		// 	})
		// }
		// 整合参数
		const obj = {
			method: 'POST',
			url: url,
			// params: query
			data: joinParams(params, c.paramsType)
		}
		// 获取header
		// config.contentType
		// form: 'application/x-www-form-urlencoded;charset=UTF-8',
		const headers = await getHeader(config.token, config.contentType, config.acceptType)
		const r = await axios({
			...obj,
			headers
		})
		// 接口返回后取消遮罩
		// if (config.shadow) {
		// 	loading()
		// }
		// 接口正常返回
		return result(r, c)
	} catch (e) {
		// loading()
		console.error(e)
		return -1
	}
}
/**
 * get方法
 * @param path
 * @param params
 * @param c
 * @returns {Promise<*>}
 */
export async function getAxios(path, params = {}, c = {}) {
	try {
		// ${ENV === 'dev' ? ':7001' : '/xxxx'}
		const config = {
			shadow: true,
			...c
		}
		const url = await getUrl(path, config.hostType)
		// let token = localStorage.getItem('token') || store.state.token
		// 调用接口 前开启遮罩和loading
		// if (config.shadow) {
		// 	loading({
		// 		show: true
		// 	})
		// }
		const headers = await getHeader(config.token)
		const r = await axios.get(`${url}?${qs.stringify(params)}`, {
			headers: headers
		})
		// if (config.shadow) {
		// 	loading()
		// }
		return result(r, c)
	} catch (e) {
		// loading()
		console.error(e)
		return -1
	}
}

/**
 * 处理结果
 * @param r
 * @returns {*}
 */
function result(r, c) {
	const { showErrMsg = true, returnType = 'res' } = c
	// 接口正常返回
	if (r.status === 200) {
		const res = r.data
		// 异常处理
		if (res.code === 200 || res.code === 0 || res.errcode === 0) {
			return returnType === 'res' ? res : res.data
		}
		if (showErrMsg) {
			Message.warning(res.msg)
		}
		return -1
	}
	console.error(r)
	return -1
}
