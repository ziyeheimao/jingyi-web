<template>
  <div class="box">
    <div class="padding">
      <p class="h">密码找回</p>
      <div>
        <el-form :model="form"  label-position="left" :rules="rules" ref="form">

          <!-- <el-form-item label="" :label-width="formLabelWidth">
            <el-input clearable v-model="form.phone" placeholder="手机"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth">
            <el-input clearable v-model="form.email" placeholder="邮箱"></el-input>
          </el-form-item> -->

          <el-form-item label="" :label-width="formLabelWidth">
            <el-input placeholder="邮箱 / 手机" v-model="form.field" class="input-with-select">
              <!-- <el-select v-model="form.select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select> -->
              <el-button slot="append" :disabled="verificationCode" @click="getVerificationCode">{{btnInfo}}</el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth">
            <el-input clearable v-model="form.verificationCode" placeholder="验证码"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth">
            <el-input clearable v-model="form.password" show-password placeholder="新密码"></el-input>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth">
            <el-input clearable v-model="form.password2" show-password placeholder="确认密码"></el-input>
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
    InnerSize () {
      return this.$store.getters.InnerSize
    }
  },
  data () {
    return {
      formLabelWidth: '0',
      disabled: false,
      form: {
        // phone: '',
        // email: '',
        // select: '',

        field: '',

        password: '',
        password2: ''
        // selectField: ''
      },

      checked: true,
      btnInfo: '获取验证码',
      verificationCode: false,
      rules: {},
      timer: null
    }
  },
  created () {},
  mounted () {},
  methods: {
    mode (code) {
      this.$store.commit('SMode', code)
    },

    // 判断邮箱 或 电话是否填写格式是否正确
    valid () {
      if (this.field === '') {
        main.openWarningInfo('手机或邮箱不可为空')
        return false
      }

      if (main.reg.phone.test(this.field) || main.reg.email.test(this.field)) {
        return true
      } else {
        main.openWarningInfo('手机或邮箱格式不正确')
        return false
      }
    },

    // 获取验证码
    getVerificationCode () {
      if (!this.valid) {
        return
      }
      this.verificationCode = true
      let i = 10
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
      })
    },

    // 提交修改
    submit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {

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

/*
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}  */
</style>
