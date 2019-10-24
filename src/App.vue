<template>
  <div id="app">

    <el-container v-if="$route.name!=='Inlet'">
      <el-header>
        <Header></Header>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

    <router-view v-if="$route.name=='Inlet'"/>

    <Background></Background>
  </div>
</template>

<script>
import Header from './components/Header'
import Background from './components/Background'

export default {
  name: 'App',
  components: {
    Header,
    Background
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    // 节流
    throttle () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.innerSizeCount()
      }, 300)
    },

    // 文档可视区尺寸
    innerSizeCount () {
      let size = { // 内容区域尺寸
        width: window.innerWidth,
        height: window.innerHeight
      }
      this.$store.commit('SInnerSize', size)
    }
  },
  created () {
    this.innerSizeCount()
  },
  mounted () {
    window.onresize = () => {
      this.throttle()
    }
  },
  watch: {}
}
</script>

<style lang='scss' scoped>
.el-header{
  padding: 0;
  background: #fff;
  position: relative;
  z-index: 1;
}
</style>
