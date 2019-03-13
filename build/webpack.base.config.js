/**
 * Created by huweijian on 2018/4/2.
 * @title
 */
const path = require('path')
let projectRoot = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let mode = process.env.mode || process.env.NODE_ENV
console.log(`mode-----${mode}`)
let postCssConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('autoprefixer')({
        browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
      }),
      require('postcss-px2rem')({ remUnit: 75, propWhiteList: [] })
    ]
  }
}
let config = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, '../src/app.js')
    ]
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      // 样式
      {
        test: /\.css$/,
        use: [
          mode ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          // 'stylus-loader',
          postCssConfig
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          mode ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          postCssConfig,
          'stylus-loader'
        ]
      },
      // 图片 音频文件
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]?[hash]'
            }
          }
        ]
      },
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[ext]?[hash]'
            }
          }
        ]
      },
      // Data文件 比如xml
      {
        test: /\.(csv|tsv)$/,
        use: [
          {
            loader: 'csv-loader',
            options: {
              limit: 10000,
              name: 'data/[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.xml$/,
        use: [
          {
            loader: 'xml-loader',
            options: {
              limit: 20000,
              name: 'data/[name].[ext]?[hash]'
            }
          }
        ]
      },
      // js
      {
        test: /\.(js|jsx)/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  // 插件
  plugins: [
    // vue-loader插件
    new VueLoaderPlugin(),
    // 写入js路劲到目标html页面
    new HtmlWebpackPlugin({
      title: 'Web',
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(projectRoot)
    ],
    extensions: ['.webpack.js', '.web.js', '.js', '.vue'],
    // 路劲别名配置 有深到浅配置，否则自动引用不会用最近的
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'api': path.resolve(__dirname, '../src/api'),
      'stylus': path.resolve(__dirname, '../src/assets/stylus'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'store': path.resolve(__dirname, '../src/store'),
      'socket': path.resolve(__dirname, '../src/socket'),
      'tools': path.resolve(__dirname, '../src/tools'),
      'test': path.resolve(__dirname, '../src/components/test'),
      'commons': path.resolve(__dirname, '../src/components/commons'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
      'src': path.resolve(__dirname, '../src')
    }
  }
}
module.exports = config
// vendor: {
//
// },
// common: {
//   priority: 0, // 缓存组优先级
//     chunks: "initial",
//     test: /amfe-flexible|postcss-px2rem|axios|es6-promise|weixin-js-sdk|clipboard/,
//     name: "common", // 要缓存的 分隔出来的 chunk 名称
//     minSize: 0,
//     minChunks: 1,
//     enforce: true,
//     maxAsyncRequests: 1, // 最大异步请求数， 默认1
//     maxInitialRequests : 1, // 最大初始化请求书，默认1
//     reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
// }
//
// {
//   priority: 0, // 缓存组优先级
//     chunks: "initial",
//   test: /vue/,
//   name: "vendor", // 要缓存的 分隔出来的 chunk 名称
//   minSize: 0,
//   minChunks: 1,
//   enforce: true,
//   maxAsyncRequests: 1, // 最大异步请求数， 默认1
//   maxInitialRequests : 1, // 最大初始化请求书，默认1
//   reuseExistingChunk: true, // 可设置是否重用该chunk（查看源码没有发现默认值）
// }
// use: ExtractTextPlugin.extract({
//   fallback: 'style-loader',
//   use: {
//     loader: 'css-loader',
//     options: {
//       sourceMap: true,
//     },
//   }
// })
// use: ExtractTextPlugin.extract({
//   fallback: ['style-loader','css-loader'],
//   use: [
//     // {
//     //   loader: 'style-loader',
//     //   options: {
//     //     sourceMap: true,
//     //   },
//     // },
//     // {
//     //   loader: 'css-loader',
//     //   options: {
//     //     sourceMap: true,
//     //   },
//     // },
//     {
//       loader: 'stylus-loader',
//       options: {
//         sourceMap: true,
//       },
//     }
//   ]
// })
