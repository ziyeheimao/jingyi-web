<template>
  <div class="box">
    <div class="padding">
      <p class="h">登 录</p>
      <div>
        <el-form :model="form"  label-position="left" :rules="rules" ref="form">

          <el-form-item label="" :label-width="formLabelWidth" prop='field'>
            <el-input clearable v-model="form.field" placeholder="手机 / 邮箱 / 昵称" @keyup.native="keyup($event)"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth" prop='password'>
            <el-input clearable v-model="form.password" show-password placeholder="密码" @keyup.native="keyup($event)"></el-input>
          </el-form-item>

          <div class="footer">
            <el-checkbox v-model="checked">我已阅读并接受</el-checkbox>
            <el-link class="rules" type="success">服务条例</el-link>
            <el-button type="success" :disabled="!checked" @click="login('form')">登 录</el-button>

            <p>
              <el-link type="success" @click="mode(1)">签订契约</el-link>
              &nbsp;
              <el-link type="success" @click="mode(2)">忘记密码</el-link>
            </p>
          </div>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@api'
// import main from '@main'

export default {
  components: {},
  // props: ['row'],
  computed: {
    Token () {
      return this.$store.getters.Token
    }
  },
  data () {
    return {
      formLabelWidth: '0',
      disabled: false,
      checked: true,

      form: {
        field: '箫',
        password: '4869'
      },

      rules: {
        field: [
          { required: true, message: '昵称不可为空', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    mode (code) {
      this.$store.commit('SMode', code)
    },

    login (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          api.login(this.form).then(({data}) => {
            console.log('登录', data)
            if (data.code === 0) {
              this.occupation()
              this.regionInfo()

              let token = data.token
              window.sessionStorage.setItem('token', token)
              this.$store.dispatch('AToken', token)

              this.$store.dispatch('AUser', data.data)
              let user = JSON.stringify(data.data) // 对象转json字符串
              window.sessionStorage.setItem('user', user)

              this.$router.push('/')
            }
          })
        }
      })
    },

    // 绑定回车
    keyup (e) {
      if (this.checked === false) {
        return
      }

      if (e.keyCode === 13) {
        this.login('form')
      }
    },

    // 获取职业信息
    occupation () {
      api.occupation().then(({data}) => {
        if (data.code === 0) {
          let occupation = JSON.stringify(data.data)
          window.sessionStorage.setItem('occupation', occupation)
          this.$store.dispatch('AOccupation', data.data)
        }
      })
    },
    // 获取区域信息
    regionInfo () {
      api.regionInfo().then(({data}) => {
        if (data.code === 0) {
          let regionInfo = JSON.stringify(data.data)
          window.sessionStorage.setItem('regionInfo', regionInfo)
          this.$store.dispatch('ARegionInfo', data.data)
        }
      })
    }

  },
  watch: {}
}
</script>

<style scoped>
div.box{
  display: flex;
  justify-content: center;
  align-items: center;
}
.green{
  color: rgb(103,194,58);
}
.padding{
  background: #ffffff80;
  padding: 40px 50px;
  border-radius: 5px;
}
.el-button{
  margin: 20px 0;
  width: 100%;
}
.footer>p{
  text-align: center;
}
.footer>.el-checkbox{
  margin-left: 5px;
}
.h{
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 1.5px;
}
.rules{
  position: relative;
  top: -3px;
}
</style>
