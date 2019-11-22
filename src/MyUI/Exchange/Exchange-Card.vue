<template>
  <div class="Exchange-Card Card" ref="card" @click='click'
   :style="`width: calc((100% - (20px * ${cardNum.col-1})) / ${cardNum.col});
   height: calc((100% - (20px * ${cardNum.row-1}) - 20px) / ${cardNum.row});`">
    <div class="cardImg" ref="cardImg">
      <img :src="iconUrl" alt="LOGO">
    </div>

    <div class="ctn" ref="ctn">
      <h4>{{title}}</h4>
      <p>{{ctnText}}</p>
    </div>

    <!-- <slot></slot> -->
    <!-- <slot name="my-header">头部默认值</slot>
    <slot name="my-body">主体默认值</slot>
    <slot name="my-footer">尾部默认值</slot> -->

    <!-- 父组件 -->
    <!-- <p slot="my-header">我是头部</p>
    <p slot="my-footer">我是尾部</p> -->
  </div>
</template>

<script>
export default {
  components: {
    // x
  },
  props: {
    title: {type: String, default: ''},
    iconUrl: {type: String, default: ''},
    ctnText: {type: String, default: ''}
  },
  computed: {
    InnerSize () {
      return this.$store.getters.InnerSize
    },
    cardNum () {
      let cardNum = window.localStorage.getItem('cardNum')
      if (cardNum) {
        return JSON.parse(cardNum)
      } else {
        return { row: 4, col: 3 }
      }
    }
  },
  data () {
    return {
      timer: null, // 节流
      cardHeight: null, // 卡片高度
      cardWidth: null // 卡片宽度
    }
  },
  methods: {
    // 获取卡片高度尺寸 并赋给 card-img
    cardSize () {
      this.cardWidth = this.$refs.card.clientWidth
      this.cardHeight = this.$refs.card.clientHeight

      // img
      let cardImg = this.$refs.cardImg
      cardImg.setAttribute('style', `width:${this.cardHeight}px;height:${this.cardHeight}px;`)

      // ctn
      let ctn = this.$refs.ctn
      ctn.setAttribute('style', `width:${this.cardWidth - this.cardHeight - 4}px;height:${this.cardHeight}px;`)
    },
    click (event) {
      return this.$emit('click', event)
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.cardSize()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
    // 文档可视区大小变化时修改卡片尺寸
    InnerSize () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.cardSize()
      }, 300)
    }
  }
}
</script>

<style scoped>
.Exchange-Card{
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #00000020;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #666;
}
.Exchange-Card>div{
  display: inline-block;
}

/* LOGO图片 */
.Exchange-Card>.cardImg{
  display: flex;
  justify-content: center;
  align-items: center;
}
.Exchange-Card>.cardImg>img{
  width: 70%;
  height: 70%;
  transition: transform 0.5s linear;
}
.Exchange-Card:hover{
  box-shadow: 4px 4px 6px #00000040;
  color: #333;
}
.Exchange-Card:hover >.cardImg>img{
  transform: scale(1.1);
}
/* 内容文字 */
.Exchange-Card>div.ctn{
  box-sizing: border-box;
  padding: 0 10px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 标题 */
.Exchange-Card>div.ctn>h4{
  font-size: 1.6rem;
  font-weight: 100;
  font-family: hanyi-xiuying;
  margin-bottom: 0.4em;
  padding: 0 1rem;

  /* 单行溢出显示 ... */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

/* 简介 */
.Exchange-Card>div.ctn>p{
  text-indent: 2rem;
  font-family: huakang-shaonv;
  line-height: 1.4rem;

  /* 如果文本溢出显示... */
  max-height: 48px;
  overflow: hidden;

  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
