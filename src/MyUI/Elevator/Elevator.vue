<template>
  <!-- 依赖Element -->
  <el-container>
    <!-- 左栏 -->
    <el-aside width="20%">
      <slot name="nav"></slot>

      <ul>
        <li v-for="(v, k) in dataList" :key="k">{{v.label}}</li>
      </ul>
    </el-aside>

    <!-- 内容区 -->
    <el-main style="padding:0;overflow: hidden;">
      <slot name="body"></slot>
    </el-main>
  </el-container>
</template>

<script>
// import api from '@api'
// import main from '@main'

export default {
  components: {
    // x
  },
  props: {
    dataList: { type: Array, defalut: [] } // 数据

  },
  computed: {

  },
  data () {
    return {}
  },
  methods: {

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
.el-container * {
  outline: 1px solid red;
}
</style>
