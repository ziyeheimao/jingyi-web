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
        <div class="rigthTop"></div>
        <div class="leftBottom"></div>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import Login from './Login.vue'
import Reg from './Reg.vue'
import SetPwd from './SetPwd.vue'

export default {
  components: {
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
    sessionStorage.clear() // 清除缓存
    this.$store.commit('SToken')
  },
  mounted () {},
  methods: {},
  watch: {}
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
  height: 150px;
  position: absolute;
  right: 0;
  top: 0;
  background-image: url(../../assets/inlet/Inlet2.png);
  background-size: 100% 100%;
}
.leftBottom{
  width: 240px;
  height: 200px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: url(../../assets/inlet/Inlet1.png);
  background-size: 100% 100%;
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
