<template>
  <div id="tabs">
    <!-- 导航 -->
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :router='true'
      background-color="#fff" text-color="#666" active-text-color="#b0c358" class="el-menu-demo">
      <el-menu-item index="/index">静逸导航</el-menu-item>
      <el-menu-item index="/user">用户中心</el-menu-item>
      <el-menu-item index="/recommend">猜你喜欢</el-menu-item>
      <el-menu-item index="/links">友情链接</el-menu-item>
      <el-menu-item index="/introduction">关于本站</el-menu-item>
      <el-menu-item index="/message">在线留言</el-menu-item>
    </el-menu>

    <!-- 用户模块 -->
    <User></User>
  </div>
</template>

<script>
import User from './Header-User'
export default {
  components: {
    User
  },
  computed: {},
  data () {
    return {
      activeIndex: '/index'
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    }
  },
  watch: {
    // 监听地址栏变化
    $route (to, from) {
      // console.log(to, from)
      this.activeIndex = `/${window.location.href.split('/#/')[1]}` // this.$route.fullPath
      if (this.activeIndex === '/') {
        this.activeIndex = '/index'
      }
    }
  }
}
</script>

<style scoped>
#tabs{
  padding: 0 40px;
  width: calc(100%-80px);
  display: flex;
  justify-content: space-between;
}
#tabs li.el-menu-item{
  font-size: 1.6rem;
}
#tabs li.el-menu-item:hover{
  background: #b0c358 !important;
  color: #fff !important;
}
</style>
