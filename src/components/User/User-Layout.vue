<template>
  <!-- 首页布局设置 -->
  <ElevatorItem class="layout">
    <div class="layout-title title">
      <p>主页布局设置</p>
      <el-divider></el-divider>
    </div>

    <div class="layout-body">
      <el-slider show-stops v-model="form.row" :min='3' :max='9' show-input vertical :height="sliderHeight*0.9+'px'"></el-slider>
      <section>
        <div v-for="(v, k) in cardCount" :key="k"
          :style="`width: calc((100% - (10px * ${form.col-1})) / ${form.col});
          height: calc((100% - (10px * ${form.row-1}) - 10px) / ${form.row});`"></div>
      </section>
    </div>

    <div class="layout-footer">
      <el-slider show-stops v-model="form.col" :min='3' :max='9' show-input></el-slider>
    </div>

  </ElevatorItem>
</template>

<script>
// import api from '@api'
// import main from '@main'
import { ElevatorItem } from '@myui'

export default {
  components: {
    ElevatorItem
  },
  // props: [''],
  computed: {
    InnerSize () { // 文档可视区尺寸
      return this.$store.getters.InnerSize
    },
    height () {
      return this.InnerSize.height - 61 - 40
    },
    sliderHeight () {
      return this.InnerSize.height - 61 - 40 - 38 - 100
    },
    cardCount () {
      return this.form.row * this.form.col
    }
  },
  data () {
    return {
      form: {
        row: 3,
        col: 4
      }
    }
  },
  methods: {
    // 初始化:取缓存中行数列数
    init () {
      let _cardNum = window.localStorage.getItem('cardNum')

      if (_cardNum) {
        _cardNum = JSON.parse(_cardNum)

        if (_cardNum.row) { // 缓存的数据
          this.form.row = _cardNum.row
        }

        if (_cardNum.col) {
          this.form.col = _cardNum.col
        }
      }
    },
    // 卡片行列数量调整时 缓存数据
    storage () {
      let data = { row: this.form.row, col: this.form.col }
      let cardNum = JSON.stringify(data)
      window.localStorage.setItem('cardNum', cardNum)
    }
  },
  beforeCreate () {},
  created () {
    this.init()
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
    'form.row' () {
      this.storage()
    },
    'form.col' () {
      this.storage()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@style/index.scss';

@import '@style/user.scss';
// 布局
.layout{
  display: flex;
  flex-direction: column;
}
.layout>.layout-body{
  display: flex;
  justify-content: space-between;
}
.layout>.layout-body>section{
  width: 100%;
  padding: 15px;
  @include flex-between-wrap;
  div{
    border-radius: 5px;
    background-color: #ffffff90;
    box-shadow: 2px 2px 5px #00000040;
  }
}
</style>
