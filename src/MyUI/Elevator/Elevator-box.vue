<template>
  <section class="ElevatorBox" id='scrollBox'
    :style="'height:'+(height-80)+'px;max-height:'+(height-80)+'px;'"
    style="padding: 15px;"
    @scroll='scrollListener($event)'>
    <ul>
      <slot></slot>
    </ul>
  </section>
</template>

<script>
// import api from '@api'
// import main from '@main'

export default {
  components: {
    // x
  },
  props: {
    height: {type: Number, defalut: 500},
    scrollTo: {type: String, defalut: ''}, // 滚动到哪个? li 的位置
    mode: {type: String, defalut: ''} // 滚动方式 像电梯一样 快速滚动 ...
  },
  computed: {

  },
  data () {
    return {
      childLiHeigth: [{class: '', height: 0}],
      throttle: null
    }
  },
  methods: {
    // 计算每个子元素的高度形成数组
    childHeigth () {
      let liAll = document.querySelectorAll('#scrollBox>ul>li')
      liAll = [...liAll]

      this.childLiHeigth = []

      for (let i of liAll) {
        let obj = {}
        obj.height = i.offsetHeight
        obj.class = i.className.split(' ')[1]
        this.childLiHeigth.push(obj)
      }
      console.log(this.childLiHeigth)
    },

    // 滚动控制
    scroll (scrollTo) {
      if (!scrollTo) return false

      this.childHeigth() // 计算所有li的高度
      let scrollBox = document.getElementById('scrollBox')
      let scrollHeight = 0 // 需要滚动的高度

      // let liHeigthSum = 0 // 子元素高度求和
      // for (let i of this.childLiHeigth) {
      //   liHeigthSum += i.height
      // }

      for (let i = 0; i < this.childLiHeigth.length; i++) {
        scrollHeight += this.childLiHeigth[i].height
        if (this.childLiHeigth[i].class === scrollTo) {
          scrollHeight -= this.childLiHeigth[i].height // 减去当前自身高度
          this.scrollMode(scrollBox, scrollHeight) // 滚动的父元素 父元素高度 需要滚动到的高度 最大可溢出高度
          break
        }
      }
    },

    // 滚动细节 要像电梯一样滚 ヾ(●゜ⅴ゜)ﾉ
    scrollMode (scrollBox, scrollHeight) {
      clearInterval(this.timer)
      if (!this.mode) { // 无动画
        scrollBox.scrollTop = scrollHeight
      } else if (this.mode === '1') { // 电梯

      } else if (this.mode === '2') { // 匀速
        // if (scrollBox.scrollTop < scrollHeight) {
        //   this.timer = setInterval(() => {
        //     scrollBox.scrollTop = scrollBox.scrollTop + 3

        //     console.log('向下滚动↓', '当前滚动的高度:', scrollBox.scrollTop, '要去的滚动高度:', scrollHeight, scrollBox.scrollTop >= scrollHeight)
        //     if (scrollBox.scrollTop >= scrollHeight) {
        //       clearInterval(this.timer)
        //     }
        //   }, 1)
        // } else if (scrollBox.scrollTop > scrollHeight) {
        //   this.timer = setInterval(() => {
        //     scrollBox.scrollTop = scrollBox.scrollTop - 3

        //     console.log('向上滚动↑', '当前滚动的高度:', scrollBox.scrollTop, '要去的滚动高度:', scrollHeight)
        //     if (scrollBox.scrollTop <= scrollHeight) {
        //       clearInterval(this.timer)
        //     }
        //   }, 1)
        // }
      }
    },
    // 滚动监听
    scrollListener (e) {
      clearInterval(this.throttle)
      setTimeout(() => {
        console.log(e.target.scrollTop)
      }, 100)
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
  watch: {
    scrollTo () {
      this.scroll(this.scrollTo)
    }
  }
}
</script>

<style lang='scss' scoped>
// 隐藏滚动条 但能滚动
.ElevatorBox{
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  &::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
}
</style>
