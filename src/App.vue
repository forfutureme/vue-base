<template>
  <div class="app">
    <router-view></router-view>
    <!--<transition name="slide-fade">-->
    <!--切换动画-->
    <!--</transition>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@store/index'
import * as types from '@store/mutation-types'

// import Test from 'test/Test'

export default {
  name: 'App',
  components: {
  },
  data() {
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
  width 100vw
}
</style>
