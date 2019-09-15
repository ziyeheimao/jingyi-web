<template>
  <div>
    <ul class="color-show">
      <li v-for="color in colors" :key="color.text"
       v-dragging="{ list: colors, item: color, group: 'color2' }"
       class="color-box"
       >{{color.name}}</li>
    </ul>
    <el-input v-model="inp"></el-input>
    <el-button @click="click">去首尾空格</el-button>
    <ExchangeBox></ExchangeBox>
    <ExchangeCard></ExchangeCard>

  </div>
</template>

<script>
// import api from '@api'
import main from '@main'
import { ExchangeBox, ExchangeCard } from '@myui'

export default {
  components: {
    ExchangeBox, ExchangeCard
    // ExchangeBox,
    // ExchangeCard
  },
  // props: [''],
  computed: {

  },
  data () {
    return {
      colors: [
        { text: '#000000',
          name: '标签1'
        },
        { text: 'Hotpink',
          name: '标签2'
        },
        { text: 'Gold',
          name: '标签3'
        },
        { text: 'Crimson',
          name: '标签4'
        },
        { text: 'Blueviolet',
          name: '标签5'
        },
        { text: 'Lightblue',
          name: '标签6'
        },
        { text: 'Cornflowerblue',
          name: '标签7'
        },
        { text: 'Skyblue',
          name: '标签8'
        }
      ],
      inp: ''
    }
  },
  methods: {
    click () {
      this.inp = main.trim(this.inp)
      console.log('|' + this.inp + '|')
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    // 碰撞检测
    this.$dragging.$on('dragged', function (data) {
      console.log('dragged', data)
    })
    // 拖拽结束
    this.$dragging.$on('dragend', function (data) {
      console.log('dragend', data)
    })
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {}
}
</script>

<style scoped>
/* 父元素 */
.color-show {
  /* display: flex;
  flex-wrap: wrap;
  width: 30rem; */
}
/* 子元素 */
.color-box {
  padding: 5px 15px;
  display: inline-block;
  /* width: 33%; */
  /* height: 6rem; */
  /* line-height: 6rem; */

  background: #bbf;
  color: #fff;
  text-align: center;
  /* transition: transform 0.3s; */
}
/* 被碰撞位置央视变化 */
.color-box.dragging {
  transform: scale(1.1);
  outline: 1px solid red;
}
</style>
