/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let projectRoot = process.cwd()
const baseConfig = require('./webpack.base.config')
let config = Object.assign({}, baseConfig, {
  mode: 'production',
  output: {
    ...baseConfig.output,
    ...{
      publicPath: 'https://pro.com',
      path: path.resolve(projectRoot, './dist/'),
      filename: 'js/[name]_[hash:8].js',
      chunkFilename: 'js/[name]_[hash:8].js'
    }
  },
  plugins: baseConfig.plugins.concat([
    // 清空原构建后的文件夹
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(projectRoot, './'),
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      POOL: JSON.stringify('https'),
      ENV: JSON.stringify('pro'),
      HOST: JSON.stringify('pro.com')
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/[name]-[hash:8].css',
    //   disable: false,
    //   allChunks: true
    // })
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name]_[hash:8].css',
      chunkFilename: 'css/[id]_[hash:8].css'
    })

  ]),
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
// console.log(JSON.stringify(config))
module.exports = config
