<template>
  <div class="index">
    <h1>index</h1>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from 'store/index'
  import * as types from 'store/mutation-types'

  // import io from 'socket/index'

  // import Test from 'test/Test'

  export default {
    name: 'index',
    components: {},
    data () {
      return {}
    },
    computed: {
      ...mapState({})
    },
    mounted () {
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  .index {
    width 100vw
    height 100vh
  }
</style>
