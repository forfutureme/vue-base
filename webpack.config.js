/**
 * author: huweijian
 * Date: 2018/11/5 - 5:07 PM
 * Name: webpack.config.js
 * Desc: 专门给webStorm的alias配置
 */
const path = require('path')
function resolve (dir) {
  return path.resolve(__dirname, './', dir)
}
module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      'store': resolve('src/store'),
      'socket': resolve('src/socket'),
      'views': resolve('src/views'),
      'stylus': resolve('src/assets/stylus'),
      'images': resolve('src/assets/images'),
      'tools': resolve('src/tools'),
      'api': resolve('src/api')
    }
  }
}
