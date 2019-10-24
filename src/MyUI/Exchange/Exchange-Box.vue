<template>
  <section class="Exchange-Box" id="Exchange-Box">
    <slot></slot>
  </section>
</template>

<script>

export default {
  components: {
    // x
  },
  props: {
    row: { type: Number, defalut: 4 }, // 行数
    col: { type: Number, defalut: 3 } // 列数
  },
  computed: {},
  data () {
    return {}
  },
  methods: {
    init () {
      let data = {}
      let _cardNum = window.localStorage.getItem('cardNum')
      if (_cardNum) {
        _cardNum = JSON.parse(_cardNum)

        if (_cardNum.row && _cardNum.col) {
          data = { row: _cardNum.row, col: _cardNum.col } // 缓存的数据
        }

        if (this.row && this.col) {
          data = { row: this.row, col: this.col } // 传参的数据 优先级大于缓存数据
        }
      } else { // 没有缓存时
        if (this.row && this.col) { // 有传参 使用传参
          data = { row: this.row, col: this.col } // 传参的数据
        } else { // 啥也没有
          data = { row: 4, col: 3 }
        }
      }

      let cardNum = JSON.stringify(data)
      window.localStorage.setItem('cardNum', cardNum)
    }
  },
  beforeCreate () {},
  created () {
    this.init()
  },
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

<style lang='scss' scoped>
@import '@style/index.scss';

.Exchange-Box{
  @include flex-between-wrap;
}
</style>
