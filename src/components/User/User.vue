<template>
  <el-container :style="'height:'+ height +'px;'" :dataList='dataList'>
    <!-- 左栏 -->
    <el-aside width="20%">
      <div class="user">
        <el-avatar :src="User.userPicUrl !== null ? User.userPicUrl : defaultPic" :size="size" :fit="fits[0]"></el-avatar>
        <p>
          <output>{{User.userName}}</output>
        </p>
      </div>

      <ul class="nav">
        <li v-for="(v, k) in dataList" :key="k">
          <p>
            <i :class="v.icon"></i>
            {{v.label}}
          </p>
        </li>
      </ul>
    </el-aside>

    <!-- 内容区 -->
    <el-main style="padding:0;overflow: hidden;">
      <ul :style="'height:'+height+'px;'" class="ctn">
        <li class="layout">
          <div>
            <el-slider show-stops v-model="form.row" :min='3' :max='8' show-input vertical :height="sliderHeight+'px'"></el-slider>
            <section>
              <div v-for="(v, k) in cardCount" :key="k"
                :style="`width: calc((100% - (10px * ${form.col-1})) / ${form.col});
                height: calc((100% - (10px * ${form.row-1}) - 10px) / ${form.row});`"></div>
            </section>
          </div>

          <div>
            <el-slider show-stops v-model="form.col" :min='3' :max='8' show-input></el-slider>
          </div>
        </li>

        <li></li>

        <li></li>

        <li></li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
// import api from '@api'
import main from '@main'
// import { Elevator } from '@myui'

export default {
  components: {
    // Elevator
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
    // width () {
    //   return this.InnerSize.width - 40
    // },
    User () {
      if (this.$store.getters.User === null) {
        return {userPicUrl: null}
      }
      return this.$store.getters.User
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
      },
      dataList: [
        { label: '用户设置', value: 1, icon: 'el-icon-user-solid' },
        { label: '页面设置', value: 2, icon: 'el-icon-menu' },
        { label: '其他设置', value: 3, icon: 'el-icon-s-operation' },
        { label: '数据统计', value: 4, icon: 'el-icon-s-data' }
      ],
      size: 80,
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      defaultPic: ''
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
    this.defaultPic = main.defaultPic
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
    },
    InnerSize () {
      console.log(this.InnerSize)
    }
  }

}
</script>

<style lang='scss' scoped>
@import '@style/index.scss';
*{
  // outline: 1px solid red;
}

.el-aside{
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}

// 用户区域
.user{
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.user>p{
  margin-top: 15px;
  font-size: 1.5rem;
  color: #85ce61;
  font-family: huakang-shaonv;
  text-align: center;
}

// 导航
ul.nav{
  transition: all 0.5 linear;
  li{
    font-size: 1.7rem;
    text-align: center;
    padding: 10px 25px;
    transition: all 0.5 linear;
    color: #666;
    vertical-align: middle;
  }
}

// 内容区 ↓
ul.ctn{
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.5 linear;
  li{
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px;
    position: relative;
    top: 0;
    transition: all 0.5 linear;
  }
}

.layout{
  display: flex;
  flex-direction: column;
}
.layout>div:first-child{
  display: flex;
  justify-content: space-between;
}
.layout section{
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
