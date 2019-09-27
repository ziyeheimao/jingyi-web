<template>
  <div id="container">
    <div id="user" @click="userSet">
      <el-avatar :src="User.userPicUrl !== null ? User.userPicUrl : defaultPic" :size="size" :fit="fits[0]"></el-avatar>
      <span class="userName">{{User.userName}}</span>
    </div>

    <ul id="userSet">
      <li @click="userSet">用户设置</li>
      <li @click="quit">退出登录</li>
    </ul>
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
      size: 45,
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      defaultPic: ''
    }
  },
  methods: {
    // 用户设置
    userSet () {
      this.$router.push('/user')
    },

    // 退出登录
    quit () {
      this.$router.push('/inlet')
    }
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

<style scoped>
/* 容器 */
#container {
  height: 60px;
}
/* 显示/隐藏 */
#container:hover #userSet{
  display: block;
}

/* 用户 */
#user{
  height: 100%;
  display: flex;
  align-items: center;
}
#user > .el-avatar{
  cursor: pointer;
  transition: all 0.4s;
}
#user > span.userName{
  color: #67c23a;
  font-size: 1.3rem;
  font-family: huakang-shaonv;
  cursor: pointer;

  margin-left: 10px;
  min-width: 50px;
  max-width: 120px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#user > span:hover{
  color: #85ce61;
}

/* 用户设置 */
#userSet{
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  display: none;
  box-shadow: 2px 2px 5px #00000030;
}
#userSet>li{
  background: #fff;
  padding: 10px 0;
  text-align: center;
  font-size: 1.3rem;
  cursor: pointer;
}
#userSet>li:hover{
  background: #85ce61;
  color: #fff;
}
#userSet>li:first-child{
  border-bottom: #ddd 1px solid;
}
</style>
