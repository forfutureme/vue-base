/**
 * @Author: huweijian
 * @Date: 2019-04-28 11:21:52
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-07-16 16:27:32
 * @Desc: 项目config配置，包含不同环境接口
 */

const baseConfig = {
	version: '1.0.0',
	// 不通业务接口前缀
	api: {
		host: '127.0.0.1'
	},
	// 腾讯云上传配置
	cosAccount: {
		url: '',
		bucket: '',
		region: ''
	},
	port: 9981 // 调试端口
}
const config = {
	dev: {
		...baseConfig
	},
	preview: {
		...baseConfig
	},
	test: {
		...baseConfig,
		api: {
			// host: 'xxxx'
		}
	},
	production: {
		...baseConfig,
		api: {
			// host: 'xxx'
		}
	}
}

export default config[ENV]
