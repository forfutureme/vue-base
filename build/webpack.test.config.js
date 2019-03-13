/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
let projectRoot = process.cwd()
const baseConfig = require('./webpack.base.config')
let config = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  output: {
    ...baseConfig.output,
    ...{
      // publicPath: 'https://test/',
      publicPath: 'https://test.xxx.com/',
      path: path.resolve(projectRoot, './test/'),
      filename: 'js/[name]_[hash:8].js',
      chunkFilename: 'js/[name]_[hash:8].js'
    }
  },
  plugins: baseConfig.plugins.concat([
    // 清空原构建后的文件夹
    new CleanWebpackPlugin(['test'], {
      root: path.resolve(projectRoot, './'),
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      POOL: JSON.stringify('https'),
      ENV: JSON.stringify('test'),
      HOST: JSON.stringify('test.xxx.com')
      // HOST: JSON.stringify('127.0.0.1')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name]_[hash].css',
      chunkFilename: 'css/[id]_[hash].css'
    })
  ])
})
// console.log(JSON.stringify(config))
module.exports = config
