## XXX 项目使用文档

### 技术栈简介

 * 该项目技术栈为Vue+Vuex，
 * 构建工具为Webpack4.x

#### 关于JavaScript
 * JavaScript解释器为babel，默认引入babel-polyfill，兼容某些浏览器，若不需要可自行删除
 * 最大程度解释最新语法即stage-0，所有同步操作均为async-await方式，Promise自行封装 
 * 所有项目用到的工具类方法统一提取放到 `./src/tools` 目录下，可根据功能创建对应文件归类
 
#### 关于VUE
 * Vue文件内部代码组织顺序，请严格按照Vue官方给出的风格指南可参考 `./src/StyleGuide.vue` ,此为官方样例
 * 页面级vue文件全部放在 `./src/views`文件下，若有子页面新建页面目录放子页面视图组件
 * 组件级vue文件分俩种:
    - 第一种全局通用(可能会被多次使用的)命名方式为 `AppFunctionName.vue`(App功能名.vue)，统一放置在 `./src/components` 目录下
    - 第二种组成页面组件(有且只会被引用一次)命名方式为 `ThePageNameDesc.vue`(The页面名内容描述.vue)，统一放置在 `./src/components/page/` 目录下    
    
#### 关于VUEX
 * Vuex相关代码全部集中在 `./src/store` 目录
 * `./src/store/index.js`为主输出文件，
 * 转态管理原则，除了组件内部自己消化的数据外其他的都可以用vuex管理。为避免状态管理混乱分模块管理，一个模块包含一个页面及其子页面状态数据:
    * `./src/store/mutation-types.js` 存放所有会用到的类型命名 规则：`PAGE_DATADESC_ACTION` 页面_状态描述_动作(actions对应get,mutation对应update)
    * `./src/store/mutations.js` 存放全局mutation 比如通用弹层显示标识状态更新
    * `./src/store/actions.js` 存放全局actions 比如登录，获取更新用户信息啥的
    * `./src/store/getters.js` 快捷取同时格式化数据方法，貌似有bug有时并不实时，很少使用
    * `./src/store/modules` 目录存放各模块的转态管理，子页面状态都集中到父页面 具体写法参考 `./src/store/modules/tpl.js`
    
#### 关于外部数据请求
  * 所有ajax数据请求全部封装并集中到 `./src/api` 目录下 （不管是做什么更新数据也好，还是做单一操作也好）  
  * `./src/api/toAxios.js` 基于 `axios` 封装的请求方法，内部有不同情况的拦截器设计，可根据不同配置执行相应操作
  * `./src/api/api.js` 所有接口集中统一输出地方
  * `./src/api/page.js` 对应所有页面会用到的接口请求
  * `./src/api/sys.js|commons.js` 对用系统级通用级接口 自行安排 唯一的原则就是不能乱，要让别人很快找到某个功能接口写在哪

#### 关于CSS样式  
 * CSS预处理为Stylus
 * CSS后处理器为PostCss
 * 默认使用rem(postcss-px2rem)，即移动端项目，若是PC项目可以注释掉引用rem插件的处理器
 * 通用样式，可以minixs样式，可复用样式全部提取放到 `./src/assets/stylus` 目录下，根据自身功能分别安排
 * 组件私有样式安装vue文件分格边学默认使用scoped模式

#### 关于图片
 * 统一放置到 `./src/images/`目录下
 * 多次使用图片 `./src/images/commons`
 * 某个页面独有 `./src/images/pageName`

#### 其他项目目录
 * `./src/router` vue路由配置，关于路由跳转 默认原则是先拿到数据在跳转，若获取数据失败会提示，不会跳转 避免有时vuex数据在页面更新后才获得数据无法同步的问题
 * `./src/socket` 基于 `socket.io` 的socket启动处
 
#### 关于Webpack
 * `webpack.base.config.js` 默认基础配置，
 * `webpack.dev.config.js` 开发环境配置
 * `webpack.test.config.js` 测试环境配置
 * `webpack.pro.config.js` 生产环境配置
 
### 启动活着构建项目
 * 在根目录下执行 `yarn install` 为什么不用 `npm i` 或者 `cnpm i` (c)npm的坑谁用谁知道，本项目用 `cnpm i` 能跑，用 `npm i` 绝对会报错，为避免尴尬请用 `yarn`安装依赖
 * 开发环境执行 `npm run dev` 成功后 浏览器打开 `http://127.0.0.1:9981`
 * 测试环境执行 `npm run test` 成功后 查看 `./test`目录下文件，-!!!注意!!!-，执行前请先确保测试环境配置以配置正确，
 修改`webpack.test.config.js`里 1) `18`行`publicPath`字段改为测试环境域名路径，`js,css`引用皆依赖这里的绝对路径，
 2) `34`行HOST字段修改为测试环境接口请求的域名
 * 测试环境执行 `npm run pro` 成功后 查看 `./dist`目录下文件，-!!!注意!!!-，执行前请先确保生产环境配置以配置正确，
 修改`webpack.test.config.js`里 1) `17`行`publicPath`字段改为测试环境域名路径，`js,css`引用皆依赖这里的绝对路径，
 2) `33`行`HOST`字段修改为测试环境接口请求的域名
