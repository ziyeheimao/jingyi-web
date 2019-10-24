<template>
  <el-container :style="'height:'+ height +'px;'">
    <!-- 左栏 -->
    <el-aside width="20%">
      <!-- 用户头像 -->
      <Avatar></Avatar>

      <!-- 导航栏 -->
      <Nav @Jump='Jump'></Nav>
    </el-aside>

    <!-- 内容区 -->
    <el-main style="box-sizing: border-box; background: #ffffff70; margin: 0 0 0 10px;" :style="'height:'+height+'px;max-height:'+height+'px;'">
      <ElevatorBox :height='height' :scrollTo='scrollTo'>

        <!-- 用户设置 -->
        <UserSet></UserSet>

        <!-- 布局设置 -->
        <Layout></Layout>

        <!-- 其它设置 -->
        <OtherSet></OtherSet>

        <!-- 数据统计 -->
        <DataStatistics></DataStatistics>

      </ElevatorBox>
    </el-main>
  </el-container>
</template>

<script>
// import api from '@api'
// import main from '@main'
import { ElevatorBox } from '@myui'

import Avatar from './User-Avatar' // 用户头像
import Nav from './User-Nav' // 导航栏

import UserSet from './User-UserSet' // 用户设置
import Layout from './User-Layout' // 布局设置
import DataStatistics from './User-DataStatistics' // 数据统计
import OtherSet from './User-OtherSet' // 其他设置

export default {
  components: {
    ElevatorBox,

    Avatar,
    Nav,

    UserSet,
    Layout,
    DataStatistics,
    OtherSet
  },
  // props: [''],
  computed: {
    InnerSize () { // 文档可视区尺寸
      return this.$store.getters.InnerSize
    },
    height () {
      return this.InnerSize.height - 61 - 40
    }
    // width () {
    //   return this.InnerSize.width - 40
    // },
  },
  data () {
    return {
      scrollTo: '' // 滚动页面 到哪个class
    }
  },
  methods: {
    // 子组件传来的参数 跳转的class
    Jump (data) {
      this.scrollTo = data
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {}
}
</script>

<style lang='scss' scoped>
@import '@style/index.scss';

.el-aside{
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}
</style>
