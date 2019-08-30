<template>
  <div id="app">

    <el-container v-if="$route.name!=='Inlet'">
      <el-header>Header</el-header>

      <el-main>
        Main
        <router-view/>
      </el-main>
    </el-container>

    <router-view v-if="$route.name=='Inlet'"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      timer: null // 节流
    }
  },
  created () {
    this.throttle()
  },
  mounted () {
    // 文档可视区尺寸发生变化时,获取 宽高
    window.onresize = () => {
      this.throttle()
    }
  },
  methods: {
    throttle () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.innerSize()
      }, 300)
    },
    // 内容区域尺寸
    innerSize () {
      let size = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      this.$store.commit('SInnerSize', size)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html {
  font-size: 10px;
}
a {
  text-decoration: none;
  color: #000;
}
ul, ol {
  margin: 0;
}
ul, ol {
  list-style: none;
}
li {
  margin: 0;
}
html, body{
  width: 100%;
  height: 100%;
}
</style>
