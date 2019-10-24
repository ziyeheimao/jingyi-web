<template>
  <ul class="nav">
    <li v-for="(v, k) in dataList" :key="k" @click="toClass(v.toClass, k)" :class="activeNav===k ? 'activeNav' : ''">
      <p>
        <i :class="v.icon"></i>
        {{v.label}}
      </p>
    </li>
  </ul>
</template>

<script>
// import api from '@api'
// import main from '@main'

export default {
  components: {
    // x
  },
  // props: [''],
  computed: {

  },
  data () {
    return {
      scrollTo: '', // 滚动页面 到哪个class
      activeNav: 0,
      dataList: [
        { label: '用户设置', value: 1, icon: 'el-icon-user-solid', toClass: 'userSet' },
        { label: '页面设置', value: 2, icon: 'el-icon-menu', toClass: 'layout' },
        { label: '其他设置', value: 3, icon: 'el-icon-s-operation', toClass: 'otherSet' },
        { label: '数据统计', value: 4, icon: 'el-icon-s-data', toClass: 'dataStatistics' }
      ]
    }
  },
  methods: {
    // 左侧导航栏点击时右侧电梯跳转
    toClass (toClass, key) {
      this.scrollTo = toClass
      this.activeNav = key

      this.$emit('Jump', this.scrollTo)
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
// 导航
ul.nav{
  transition: all 0.5 linear;
  &>li{
    font-size: 1.7rem;
    text-align: center;
    padding: 10px 25px;
    transition: all 0.5 linear;
    color: #666;
    vertical-align: middle;
    cursor: pointer;
  }
  &>li:hover{
    color: #fff;
    background-color: #85ce61;
  }
  &>.activeNav{
    color: #fff;
    background-color: #85ce61;
  }
}
</style>
