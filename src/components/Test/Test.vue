<template>
  <div class="d1">
    <Menu :list='list'></Menu>
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
      list: [
        {ctn: '修 改', index: 1, color: ''},
        {ctn: '删 除', index: 2, color: ''},
        {ctn: '添加到', index: 3, color: ''},
        {ctn: '移动到', index: 4, color: ''}
      ]
    }
  },
  methods: {

  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {

  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
@import '@style/index.scss';
.d1{
  // color: $lightBlue;
}
</style>
