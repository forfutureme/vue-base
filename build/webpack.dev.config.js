/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
let config = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  // serve: {
  //   port: 8864,
  //   historyApiFallback: true,
  //   stats: 'errors-only',
  //   proxy: {
  //     // '^/ffapi/**': {
  //     //     target: 'http://ff.rongyi.com/',
  //     //     changeOrigin: 'true'
  //     // }
  //   }
  // },
  devServer: {
    port: 9981,
    historyApiFallback: true,
    stats: 'errors-only',
    proxy: {
      // '^/mmopen/**': {
      //   // target: 'http://192.168.3.2:8863/',
      //   target: 'http://thirdwx.qlogo.cn/',
      //   changeOrigin: 'true'
      // }
    }
  },
  plugins: baseConfig.plugins.concat([
    new webpack.LoaderOptionsPlugin({
      options: {}
    }),
    new webpack.DefinePlugin({
      POOL: JSON.stringify('http'),
      ENV: JSON.stringify('dev'),
      // HOST: JSON.stringify('127.0.0.1')
      HOST: JSON.stringify('127.0.0.1:9527')
      // HOST: JSON.stringify('databd.aijiatui.com')
    })
  ])
})
// console.log(JSON.stringify(config))
module.exports = config
