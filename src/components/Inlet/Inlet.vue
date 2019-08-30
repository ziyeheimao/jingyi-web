<template>
  <div>
    <el-container>
      <el-main :style='"height:" + InnerSize.height + "px"'>

        <!-- 内容 -->
        <section class="ctn" :style='"height:" + (InnerSize.height-42) + "px"'>

          <div class="img" :style='"max-height:" + (InnerSize.height-42) + "px"'>
            <img src="../../assets/inlet/bgi.jpg" alt="">
          </div>

          <div class="box" :style='"max-height:" + (InnerSize.height-42) + "px"'>
            <Login v-if="Mode === 0"></Login>
            <Reg v-if="Mode === 1"></Reg>
            <SetPwd v-if="Mode === 2"></SetPwd>
          </div>

        </section>

        <!-- 背景装饰 -->
        <div class="rigthTop">
          <img src="../../assets/inlet/Inlet2.png" alt="">
        </div>
        <div class="leftBottom">
          <img src="../../assets/inlet/Inlet1.png" alt="">
        </div>

      </el-main>
    </el-container>

    <!-- 背景 -->
    <!-- <BackgroundImg></BackgroundImg> -->
  </div>
</template>
<script>
// import api from "@api"
// import BackgroundImg from '../Background.vue'

// import Header from '../Header.vue'

import Login from './Login.vue'
import Reg from './Reg.vue'
import SetPwd from './SetPwd.vue'

export default {
  components: {
    // BackgroundImg, // 背景
    // Header, // 页头
    Login, // 登录
    Reg, // 注册
    SetPwd // 改密码
  },
  // props: ['row'],
  computed: {
    InnerSize () {
      return this.$store.getters.InnerSize
    },
    Mode () {
      return this.$store.getters.Mode
    }
  },
  data () {
    return {
      formLabelWidth: '0',
      form: {},
      rules: {}
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped>
/* 背景 */
.el-main{
  background: rgb(138, 221,255);
  position: relative;
}

/* 背景装饰 */
.rigthTop{
  width: 270px;
  position: absolute;
  right: 0;
  top: 0;
}
.leftBottom{
  width: 240px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.rigthTop>img,
.leftBottom>img{
  width: 100%;
}

/* 内容 */
section.ctn{
  padding: 0 90px;
  display: flex;
  justify-content: space-around;
}
section.ctn>div{
  width: 40%;
}
section.ctn>div.img{
  min-width: 623px;
  display: flex;
  align-items: center;
}
section.ctn>div.img>img{
  width: 100%;
}

div.box{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
