<template>
  <div class="box">
    <div class="padding">
      <p class="h">密码找回</p>
      <div>
        <el-form :model="form"  label-position="left" :rules="rules" ref="form">

          <el-form-item label="" :label-width="formLabelWidth" prop='field'>
            <el-input placeholder="邮箱 / 手机" v-model="form.field" class="input-with-select" @keyup.native="keyup($event)">
              <el-button slot="append" :disabled="verificationCode" @click="getVerificationCode">{{btnInfo}}</el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth" prop='verificationCode'>
            <el-input clearable v-model="form.verificationCode" placeholder="验证码"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth" prop='password'>
            <el-input clearable v-model="form.password" show-password placeholder="新密码" @keyup.native="keyup2($event)"></el-input>
          </el-form-item>

          <div class="footer">

            <el-checkbox v-model="checked">我已阅读并接受</el-checkbox>
            <el-link class="rules" type="success">服务条例</el-link>

            <el-button type="success" class="btn" :disabled="!checked" @click="submit('form')">密码找回</el-button>

            <p>
              <el-link type="success" @click="mode(1)">签订契约</el-link>
              &nbsp;
              <el-link type="success" @click="mode(0)">立即登录</el-link>
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
        field: '',
        password: ''
      },

      checked: true,
      btnInfo: '获取验证码',
      verificationCode: false,
      rules: {
        field: [
          { required: true, message: '手机或邮箱不可为空', trigger: 'blur' }
        ],

        verificationCode: [
          { required: true, message: '验证码不可为空', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      timer: null
    }
  },
  created () {},
  mounted () {},
  methods: {
    mode (code) {
      this.$store.commit('SMode', code)
    },
    keyup (e) {
      if (e.keyCode === 13) {
        this.getVerificationCode()
      }
    },

    keyup2 (e) {
      if (this.checked === false) {
        return
      }

      if (e.keyCode === 13) {
        this.submit('form')
      }
    },
    // 判断邮箱 或 电话是否填写格式是否正确
    valid () {
      if (this.form.field === '') {
        main.openWarningInfo('手机或邮箱不可为空')
        return false
      }

      if (main.reg.phone.test(this.form.field)) {
        return true
      }

      if (main.reg.email.test(this.form.field)) {
        return true
      }

      main.openWarningInfo('手机或邮箱格式不正确')
      return false
    },

    // 获取验证码
    getVerificationCode () {
      if (!this.valid()) {
        return
      }

      this.verificationCode = true
      let i = 30
      this.timer = setInterval(() => {
        this.btnInfo = `${i}秒后重新获取`

        if (i === 0) {
          clearInterval(this.timer)
          this.verificationCode = false
          this.btnInfo = `获取验证码`
        }
        i--
      }, 1000)

      api.verificationCode(this.form.field).then(({data}) => {
        console.log('验证码', data)
        if (data.code === 0) {

        } else {
          main.openWarningInfo(data.msg)
        }
      })
    },

    // 提交修改
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          api.forgetPassword(this.form).then(({data}) => {
            console.log(data)
            if (data.code === 0) {
              this.$store.dispatch('AMode', 0)
              main.openSuccessInfo(data.msg)
            } else {
              main.openInfo(data.msg)
            }
          })
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
.el-button.btn{
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
