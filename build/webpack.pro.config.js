/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
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
    // 使用css提取插件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name]_[hash:8].css',
      chunkFilename: 'css/[id]_[hash:8].css'
    }),
    // 开启gzip压缩
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ]),
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
      })
    ],
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000, //模块大于30k会被抽离到公共模块
      minChunks: 1, //模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, //入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
})
// console.log(JSON.stringify(config))
module.exports = config
