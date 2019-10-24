<template>
  <div class="user avatar">
    <el-avatar :src="User.userPicUrl !== null ? User.userPicUrl : defaultPic" :size="size" :fit="fits[0]"></el-avatar>
    <p>
      <output>{{User.userName}}</output>
    </p>
  </div>
</template>

<script>
// import api from '@api'
import main from '@main'

export default {
  components: {
    // x
  },
  // props: [''],
  computed: {
    User () {
      if (this.$store.getters.User === null) {
        return {userPicUrl: null}
      }
      return this.$store.getters.User
    }
  },
  data () {
    return {
      size: 80,
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      defaultPic: ''
    }
  },
  methods: {

  },
  beforeCreate () {},
  created () {
    this.defaultPic = main.defaultPic
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

<style lang='scss' scoped>
@import '@style/index.scss';
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
</style>
