<template>
  <div class="d1">
    <Menu :list='list' :show='show' :listStyle='listStyle' :position='position' @click="clickMenu" ></Menu>

    <div @contextmenu.prevent="isShow($event)">右键菜单</div>
    <div @contextmenu.prevent="isShow($event)">右键菜单</div>
    <div @contextmenu.prevent="isShow($event)">右键菜单</div>

  </div>
</template>

<script>
// import api from '@api'
// import main from '@main'
import { Menu, ExchangeBox, ExchangeCard } from '@myui'

export default {
  components: {
    ExchangeBox, ExchangeCard, Menu
  },
  // props: [''],
  computed: {

  },
  data () {
    return {
      show: false,
      listStyle: '',
      position: {},
      list: [
        { label: '修 改', value: 1, style: '' },
        { label: '删 除', value: 2, style: '' },
        { label: '添加到', value: 3, style: '' }, // , children: [] },
        { label: '移动到', value: 4, style: '' } // , children: [] }
      ]
    }
  },
  methods: {
    isShow (e) {
      this.position = {
        x: e.clientX,
        y: e.clientY
      }
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    },
    clickMenu (value1) {
      console.log('外层', value1)
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

<style lang="scss" scoped>
@import '@style/index.scss';
div{
  padding: 15px;
}
</style>
