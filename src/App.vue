<template>
  <div class="app">
    <!--<transition name="slide-fade">-->
    <!--切换动画-->
    <!--</transition>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from 'store/index'
  import * as types from 'store/mutation-types'

  // import Test from 'test/Test'

  export default {
    name: 'App',
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({

      })
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  .app {
    position relative
    background transparent
    min-height 100vh
  }
</style>
