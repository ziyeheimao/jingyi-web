<template>
  <div id="ctn" :style="'width:'+width+'px;height:'+height+'px;'">
    <div class="btn">
      <el-button @click="quit" round type="warning" size='medium'>返回首页</el-button>
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
    InnerSize () {
      return this.$store.getters.InnerSize
    },
    width () {
      return this.InnerSize.width * 0.85
    },
    height () {
      return this.InnerSize.height - 60 - 40 - 20 - 40
    }
  },
  data () {
    return {}
  },
  methods: {
    quit () {
      this.$router.push('/')
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
  watch: {}
}
</script>

<style scoped>
*{
  /* outline: 1px solid red; */
}
#ctn{
  border-radius: 5px;
  margin: 20px auto 0;
  box-shadow: 2px 2px 5px #00000020;
  background-color: #ffffff80;
  background-image: url(../../assets/404/404.png);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50% 40%;
  position: relative;
}
#ctn>.btn{
  width: 100%;
  /* display: inline-block; */
  text-align: center;
  margin: 0 auto;
  position: absolute;
  bottom: 10%;
}
</style>
