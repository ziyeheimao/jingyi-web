<template>
  <div>
    <span>这是用户设置 /user 页面</span>

    <div>
      卡片行数:<el-input-number size="mini" v-model="form.row" :min="3" :max="9" @change="rowChange"></el-input-number>
    </div>

    <div>
      卡片列数:<el-input-number size="mini" v-model="form.col" :min="3" :max="9" @change="colChange"></el-input-number>
    </div>
  </div>
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

    // 行变化
    colChange () {
      this.storage()
    },
    // 列变化
    rowChange () {
      this.storage()
    },
    // 存
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
  watch: {}

}
</script>

<style scoped>
</style>
