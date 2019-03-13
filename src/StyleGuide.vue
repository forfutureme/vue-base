<!--
    这是一个vue项目编写指南示例
    [详细细节请参考](https://cn.vuejs.org/v2/style-guide/)
    优先级 A：必要的
    优先级 B：强烈推荐
    优先级 C：推荐
    优先级 D：谨慎使用
-->
<template>
    <div class="style-guide">
        <div class="describe">
            这里是官方的 Vue 特有代码的风格指南。如果在工程中使用 Vue，为了回避错误、小纠结和反模式，该指南是份不错的参考。
            不过我们也不确信风格指南的所有内容对于所有的团队或工程都是理想的。所以根据过去的经验、周围的技术栈、个人价值观做出有意义的偏差是可取的。
        </div>
        <div class="center">
            <article>
                <h4>测试nextTick</h4>
                <p>{{msg}}<button @click="changeVal">点击修改值</button></p>
            </article>
            <article>
                <h4>测试set</h4>
                <p>{{setObj.setText}}<button @click="setVal">点击修改set值</button></p>
            </article>
            <article>
                <h4>props 属性</h4>
                <p>{{text}}</p>
            </article>
            <article>
                <h4>模板中简单的表达式</h4>
                <p>{{normalizedFullName('wang da chui')}}</p>
            </article>
            <article>
                <h4>指令实例 (简单实现)</h4>
                <p v-dir-test="'test'"></p>
            </article>
            <article>
                <h4>元素 (包括组件) 的特性应该有统一的顺序。</h4>
                <p
                    is="定义 (提供组件的选项)"

                    v-for="列表渲染 (创建多个变化的相同元素)"

                    v-if="条件渲染 (元素是否渲染/显示)"
                    v-else-if=""
                    v-else=""
                    v-show=""
                    v-cloak=""

                    v-pre="渲染方式 (改变元素的渲染方式)"
                    v-once=""

                    id="全局感知 (需要超越组件的知识)"

                    ref="唯一的特性 (需要唯一值的特性)"
                    key=""
                    slot=""

                    v-model="双向绑定 (把绑定和事件结合起来)"

                    other="其它特性 (所有普通的绑定或未绑定的特性)"

                    v-on="事件 (组件事件监听器)"

                    v-html="内容 (复写元素的内容)"
                    v-text="">看我观察属性的顺序</p>
            </article>
            <article>
                <h4>v-for 使用</h4>
                <ul>
                    <li v-for="list in lists"
                        :key="list.id">
                        {{list.text}}
                    </li>
                </ul>
            </article>
        </div>
    </div>
</template>
<script>
  // 下面列出定义组件时 各组成的顺序 自上而下 这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新属性应该放到哪里。
  export default {
    // el: '', // 1 副作用 (触发组件外的影响)
    name: 'StyleGuide',   // A 驼峰命名
    // parent: '', // 2 全局感知 (要求组件以外的知识)
    // functional: '', // 3 组件类型 (更改组件的类型)
    // delimiters: '',
    // comments: '',  // 4 模板修改器 (改变模板的编译方式)
    // components: {},
    directives: {
      dirTest: {
        bind (el, binding, vnode, oldVnode) {
          let s = JSON.stringify
          el.innerHTML =
            'name: ' + s(binding.name) + '<br>' +
            'value: ' + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: ' + s(binding.arg) + '<br>' +
            'modifiers: ' + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ')
          // console.log(el, binding, vnode, oldVnode)
        }
      }
    },
    // filters: {},  // 5 模板依赖 (模板内使用的资源)
    // extends: {},
    // mixins: {},  // 6 组合 (向选项里合并属性)
    // inheritAttrs: {},
    // model: {},
    props: {  // A Prop 定义应该尽量详细。
      text: {
        type: String,
        required: true,
        validator: function (val) {
          // 校验传入的值
          return val === 'text'
        }
      }
    }, // 7 接口 (组件的接口)
    data () {  // A 组件内数据必须用函数返回对象的形式输出
      return {
        msg: 'hello world',
        setObj: {},
        lists: [
          {
            id: 1,
            text: 'A 为组件样式设置作用域: 这条规则只和单文件组件有关。你不一定要使用 scoped 特性。设置作用域也可以通过 CSS Modules，那是一个基于 class 的类似 BEM 的策略，当然你也可以使用其它的库或约定。'
          },
          {
            id: 2,
            text: 'A 私有属性名: 在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突'
          },
          {
            id: 3,
            text: 'B 组件文件: 只要有能够拼接文件的构建系统，就把每个组件单独分成文件。'
          },
          {
            id: 4,
            text: 'B 单文件组件文件的大小写: 单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。'
          },
          {
            id: 5,
            text: 'B 基础组件名: 应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。'
          },
          {
            id: 6,
            text: 'B 单例组件名: 只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。 这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。'
          },
          {
            id: 7,
            text: 'B 紧密耦合的组件名: 和父组件紧密耦合的子组件应该以父组件名作为前缀命名。如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。' +
            '因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起:\nTodoList.vue\n' +
            '|- TodoListItem.vue\n' +
            '|- TodoListItemButton.vue'
          },
          {
            id: 8,
            text: 'B 组件名中的单词顺序: 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。|- SearchButtonClear.vue\n' +
            '|- SearchButtonRun.vue\n' +
            '|- SearchInputQuery.vue\n' +
            '|- SearchInputExcludeGlob.vue'
          },
          {
            id: 9,
            text: 'B 自闭合组件: 在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。<my-component></my-component>'
          },
          {
            id: 10,
            text: 'B 模板中的组件名大小写 对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该总是 PascalCase 的——但是在 DOM 模板中总是 kebab-case 的。在所有的地方都使用 kebab-case 同样是可以接受的。'
          },
          {
            id: 11,
            text: 'B JS/JSX 中的组件名大小写: JS/JSX 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用 Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串。'
          },
          {
            id: 12,
            text: 'B 完整单词的组件名: 组件名应该倾向于完整单词而不是缩写。编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。'
          },
          {
            id: 13,
            text: 'B Prop 名大小写: 在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。'
          },
          {
            id: 14,
            text: 'B 多个特性的元素: 多个特性的元素应该分多行撰写，每个特性一行'
          },
          {
            id: 15,
            text: 'B 模板中简单的表达式: 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。'
          },
          {
            id: 16,
            text: 'B 简单的计算属性: 应该把复杂计算属性分割为尽可能多的更简单的属性。'
          },
          {
            id: 17,
            text: 'B 带引号的特性值: 非空 HTML 特性值应该始终带引号 (单引号或双引号，选你 JS 里不用的那个)。'
          },
          {
            id: 18,
            text: 'B 指令缩写: 指令缩写 (用 : 表示 v-bind: 和用 @ 表示 v-on:) 应该要么都用要么都不用。'
          },
          {
            id: 19,
            text: 'C 组件/实例的选项的顺序: 组件/实例的选项应该有统一的顺序。'
          },
          {
            id: 20,
            text: 'C 元素特性的顺序: 元素 (包括组件) 的特性应该有统一的顺序。'
          },
          {
            id: 21,
            text: 'C 组件/实例选项中的空行: 你可能想在多个属性之间增加一个空行，特别是在这些选项一屏放不下，需要滚动才能都看到的时候。'
          },
          {
            id: 22,
            text: 'C 单文件组件的顶级元素的顺序: 单文件组件应该总是让 template、script 和 style 标签的顺序保持一致。且 <style> 要放在最后，因为另外两个标签至少要有一个。'
          },
          {
            id: 23,
            text: 'D 没有在 v-if/v-if-else/v-else 中使用 key: 如果一组 v-if + v-else 的元素类型相同，最好使用 key (比如两个 <div> 元素)。'
          },
          {
            id: 24,
            text: 'D scoped 中的元素选择器: 元素选择器应该避免在 scoped 中出现。在 scoped 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的。'
          },
          {
            id: 25,
            text: 'D 隐性的父子组件通信: 应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或改变 prop。'
          },
          {
            id: 26,
            text: 'D 非 Flux 的全局状态管理: 应该优先通过 Vuex 管理全局状态，而不是通过 this.$root 或一个全局事件总线。'
          }
        ]
      }
    },
    // computed: {}, // 8 本地状态 (本地的响应式属性)
    watch: {},
    // 生命周期钩子 (按照它们被调用的顺序) // 9 事件 (通过响应式事件触发的回调)
    beforeCreate () {
      // 数据观察什么的都没好
      console.log('beforeCreate', this)
    },
    created () {
      // data数据已设定，$el还没有
      console.log('created', this)
    },
    beforeMount () {
      // 在挂载开始之前被调用：相关的 render 函数首次被调用。
      console.log('beforeMount', this)
    },
    mounted () {
      // 调用时 $el 以挂载好，但是子组件不一定都完成渲染
      // 若要确保 所有组件都渲染完 需要在this.nextTick回调后
    },
    beforeUpdate () {
      // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
    },
    updated () {
      // 当这个钩子被调用时，组件 DOM 已经更新，
      // 但不保证子组件更新，若要确保 需要在this.nextTick后
    },
    activated () {
      // keep-alive 组件激活时调用。
    },
    deactivated () {
      // keep-alive 组件停用时调用。
    },
    beforeDestroy () {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    destroyed () {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    },
    errorCaptured () {
      // 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
    },
    methods: {
      async changeVal () { // 在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀，并附带自己的命名空间
        this.msg += ' next'
        console.log(this.$el)
        let r = await this.$nextTick()
        console.log(r)
        // console.log(this.$nextTick().then(function (e) {
        //   console.log(e)
        // }))
      },
      setVal () {
        this.$set(this.setObj, 'setText', 'setText')
      },
      normalizedFullName (fullName = '') {
        return fullName.split(' ').map(function (word) {
          return word[0].toUpperCase() + word.slice(1)
        }).join(' ')
      }
    } // 10 非响应式的属性 (不依赖响应系统的实例属性),
    // renderError: {},
    // template / render  // 11 渲染 (组件输出的声明式描述)
  }
</script>
<!--A style 使用scoped 或者 module 或者BEM格式 -->
<style rel="stylesheet/stylus" lang="stylus" scoped>
    @import "assets/stylus/minixs/_fixed.styl"
    .style-guide{
        _fixed(1200, 0, 0, 0, 0)
        padding 10px
        background #f8f8f8
        box-shadow 0 0 5px hsla(0, 0, 100%, .45)
        max-height 100vh
        overflow-y scroll
        .describe {
            font-size 20px
        }
        .center {
            h4{
                font-size 24px
            }
            p {
                font-size 20px
            }
            ul {
                li {
                    padding 20px 10px
                    font-size 20px
                }
            }
        }
    }
</style>
