import * as types from '@store/mutation-types'
import api from '@api/api'
import { setItem, removeItem, getItem } from '@/tools/utils/sessionStorage'
export default {
	state: {
		// 登录信息
		loginInfo: {
			hasRequest: false,
			islogin: false,
			userInfo: {}, // 0为总部门，1为部门，2为门店
			userName: '' // account
		}
	},
	getters: {
		// 得到初始化所有数据
		getInitialInfo(state) {
			return state
		},
		// 得到登录信息
		getLoginInfo(state) {
			return state.loginInfo
		}
	},
	mutations: {
		/**
     * 设置账户信息
     */
		[types.INITIALIZE_CHECK_LOGIN_UPDATE](state, info) {
			const { loginInfo = state.loginInfo } = info
			if (loginInfo) {
				state.loginInfo = loginInfo
			}
		}
	},
	actions: {
		/**
     * 请求公共数据,如果已经请求过不再请求
     * @param {object} context 上下文
     * @param {object} arg  { success, error, force 是否强制刷新}
     */
		[types.INITIALIZE_CHECK_LOGIN_GET]: async (context, arg) => {
			const { commit, state } = context
			const { success, error, force = false } = arg
			const token = getItem('i-token')
			if (!token) {
				// commit('setLoginInfo', {
				//   islogin: false,
				//   hasRequest: false
				// })
				commit(types.INITIALIZE_CHECK_LOGIN_UPDATE, {
					loginInfo: {
						islogin: false,
						hasRequest: false
					}
				})
				error && error()
				return
			}
			if (!force && state.loginInfo.hasRequest) {
				if (state.loginInfo.islogin) {
					success && success(state)
				} else {
					error && error()
				}
				return
			}
			commit(types.INITIALIZE_CHECK_LOGIN_UPDATE, {
				loginInfo: {
					hasRequest: true,
					islogin: true
				}
			})
			success && success(state)
			return
		},

		/**
     * 登录,并把数据缓存
     * @param {object} context 上下文
     * @param {object} arg  { success, error, params = {}}
     */
		[types.INITIALIZE_LOGIN_IN_GET]: async (context, arg) => {
			const { commit } = context
			const { success, error, params = {} } = arg
			const loginR = await api.sys.login(params)
			if (loginR === -1) {
				error && error(loginR)
				return
			}
			setItem('i-token', loginR.data.token)
			setItem('i-info', JSON.stringify(loginR.data))

			commit(types.INITIALIZE_CHECK_LOGIN_UPDATE, {
				loginInfo: {
					islogin: true,
					userName: loginR.data.account,
					userInfo: loginR.data
				}
			})
			success && success(loginR)
		},
		/**
     * 退出登录
     * @param {object} context 上下文
     * @param {object} success
     */
		[types.INITIALIZE_LOGIN_OUT_GET]: async (context, success) => {
			const { commit } = context
			await api.sys.loginOut()
			commit(types.INITIALIZE_CHECK_LOGIN_UPDATE, {
				loginInfo: {
					islogin: false,
					hasRequest: false
				}
			})
			removeItem('i-token')
			removeItem('i-info')
			success && success()
		}
	}
}
