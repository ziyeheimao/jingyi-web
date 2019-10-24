<template>
  <div class="box">
    <div class="padding">
      <p class="h">欢迎注册</p>
      <div>
        <el-form :model="form"  label-position="left" :rules="rules" ref="form">

          <el-form-item label="" :label-width="formLabelWidth" prop='email'>
            <el-input clearable v-model="form.email" placeholder="邮箱" @blur="checkUserNamePhoneEmail(form.email, 1)"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth" prop='phone'>
            <el-input clearable v-model="form.phone" placeholder="手机" @blur="checkUserNamePhoneEmail(form.phone, 2)"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth" prop='userName'>
            <el-input clearable v-model="form.userName" placeholder="昵称" @blur="checkUserNamePhoneEmail(form.userName, 3)"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth" prop='password'>
            <el-input clearable v-model="form.password" show-password placeholder="密码" @keyup.native="keyup($event)"></el-input>
          </el-form-item>

          <div class="footer">
            <el-checkbox v-model="checked">我已阅读并接受</el-checkbox>
            <el-link class="rules" type="success">服务条例</el-link>
            <el-button type="success" :disabled="!checked" @click="submit('form')">注 册</el-button>

            <p>
              <el-link type="success" @click="mode(0)">立即登录</el-link>
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
import main from '@main'

export default {
  components: {},
  // props: ['row'],
  computed: {
  },
  data () {
    return {
      formLabelWidth: '0',
      disabled: false,
      form: {
        phone: '',
        email: '',
        userName: '',
        password: ''
      },

      checked: true,
      msg: '',
      timer: null,

      checkEmail: false,
      checkPhone: false,
      checkUserName: false,
      checkPassword: false,

      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // eslint-disable-next-line no-useless-escape
          { pattern: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, message: '请输入正确的邮箱格式' }
        ],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { pattern: /^1([0-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号' }
        ],
        userName: [ // 姓名
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '用户名在1到20位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1到20位密码', trigger: 'blur' }
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

    // 注册
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid * this.checkEmail * this.checkPhone * this.checkUserName * this.checkPassword) {
          api.register(this.form).then(({data}) => {
            if (data.code === 0) {
              main.openSuccessInfo(data.msg)
              this.login()
            } else {
              main.openErrorInfo(data.msg)
            }
          })
        }
      })
    },

    // 检测 手机 邮箱 昵称 是否被占用
    checkUserNamePhoneEmail (field, type) {
      return new Promise((resolve, reject) => {
        if (field === '') { return }

        if (type === 3) {
          if (main.reg.email.test(field)) {
            main.openWarningInfo('不可用邮箱作为昵称')
            this.checkUserName = false
            return
          }
          if (main.reg.phone.test(field)) {
            main.openWarningInfo('不可用手机作为昵称')
            this.checkUserName = false
            return
          }
        }

        let data = { field }
        api.checkUserNamePhoneEmail(data).then(({data}) => {
          console.log('验证结果', data)
          if (data.code === 0) {
            switch (type) {
              case 1:
                this.checkEmail = true
                break
              case 2:
                this.checkPhone = true
                break
              case 3:
                this.checkUserName = true
                break
            }
            resolve()
          } else {
            main.openWarningInfo(data.msg)
            switch (type) {
              case 1:
                this.checkEmail = false
                break
              case 2:
                this.checkPhone = false
                break
              case 3:
                this.checkUserName = false
                break
            }
            resolve()
          }
        })
      })
    },

    // 注册成功后自动登录
    login () {
      let data = {
        field: this.form.phone,
        password: this.form.password
      }

      api.login(data).then(({data}) => {
        if (data.code === 0) {
          let token = data.token
          window.sessionStorage.setItem('token', token)
          this.$store.dispatch('AToken', token)

          this.$store.dispatch('AUser', data.result[0])

          let i = 3
          this.timer = setInterval(() => {
            if (i === 0) {
              clearInterval(this.timer)
              this.$router.push('/')
            }

            this.msg = `${i}秒钟后跳转至首页 (๑•̀ㅂ•́)و✧`
            main.openSuccessInfo(this.msg)

            i--
          }, 1000)
        }
      })
    },

    // 绑定回车
    keyup (e) {
      if (this.form.checked === false) {
        return
      }

      if (e.keyCode === 13) {
        this.submit('form')
      }
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
