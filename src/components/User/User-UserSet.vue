<template>
  <!-- 用户设置 -->
  <ElevatorItem class="userSet">
    <div class="userSet-title title">
      <p>用户设置</p>
      <el-divider></el-divider>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="userSet-body" label="个人信息" name="info">
          <el-form ref="userSetForm" :model="userSetForm" :rules="userSetRules"
            label-width="70px" size='small' :inline="true" class="userSetForm">
            <div>
              <el-form-item label="昵称">
                <el-input :style="inputWidth" v-model="userSetForm.userName" clearable placeholder="请输入昵称"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-select :style="inputWidth" v-model="userSetForm.sex" clearable placeholder="请选择性别">
                  <el-option label="保密" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="缓存">
                <el-select :style="inputWidth" v-model="userSetForm.cache" clearable placeholder="请选择缓存有效时间">
                  <el-option label="会话" value="session"></el-option>
                  <el-option label="永久" value="local"></el-option>
                  <el-option label="时效" value=""></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="有效期">
                <el-input-number :style="inputWidth" v-model="userSetForm.date" :disabled='userSetForm.cacheDate!==""'
                  :min="180000" :max="86400000" :step="10000" controls-position="right" placeholder="单位 / 毫秒"></el-input-number>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="邮箱">
                <el-input :style="inputWidth" v-model="userSetForm.email" clearable placeholder="请输入邮箱">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="验证码">
                <el-input :style="inputWidth" v-model="userSetForm.emailVali" clearable placeholder="请输入验证码"></el-input>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="手机">
                <el-input :style="inputWidth" v-model="userSetForm.phone" clearable placeholder="请输入手机">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </el-form-item>

              <el-form-item label="验证码">
                <el-input :style="inputWidth" v-model="userSetForm.phoneVali" clearable placeholder="请输入验证码"></el-input>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="职业">
                <el-cascader :style="inputWidth" v-model="userSetForm.occupationName" :options="Occupation" clearable placeholder="请选择职业"
                  :props="{ expandTrigger: 'hover' }"></el-cascader><!-- @change="handleChange" -->
              </el-form-item>

              <el-form-item label="区域">
                <el-cascader :style="inputWidth" v-model="userSetForm.region" :options="RegionInfo" clearable placeholder="请选择区域"
                  :props="{ expandTrigger: 'hover' }" ></el-cascader><!-- @change="handleChange" -->
              </el-form-item>
            </div>

            <div style="display: flex; justify-content: center; margin-top: 10px;">
              <el-form-item style="padding: 0 15px;">
                <el-button type="success" size='small' round style="width: 150px;">重 置</el-button>
              </el-form-item>

              <el-form-item style="padding: 0 15px;">
                <el-button type="success" @click="userSet('userSetForm')" size='small' round style="width: 150px;">保 存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane class="userSet-body" label="用户头像" name="pic">
          <section class="userPic">
            <div style="width:80px;height:80px;border:1px solid #00000010; border-radius: 50%; overflow: hidden;">
              <img :src="userInfo.userPicUrl" alt="" width="100%" height="100%">
            </div>
            <div>
              <div class="link">
                <el-link type="primary">静图上传</el-link>
                <el-link type="success">动图上传</el-link>
              </div>
              <p class="info">
                大小 180 * 180 像素，支持
                <br>
                JPG、PNG、GIF等格式，图片需要小于20M
              </p>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </div>

  </ElevatorItem>
</template>

<script>
import api from '@api'
// import main from '@main'
import { ElevatorItem } from '@myui'

export default {
  components: {
    ElevatorItem
  },
  // props: [''],
  computed: {
    RegionInfo () {
      return this.$store.getters.RegionInfo // 职业
    },
    Occupation () {
      return this.$store.getters.Occupation // 区域
    },
    inputWidth () {
      return 'width: 260px;'
    }
  },
  data () {
    return {
      // 用户设置
      userInfo: {}, // 用户设置表格数据
      userSetForm: {
        userName: '',
        sex: 0,
        cache: '',
        cacheDate: '',
        email: '',
        emailVali: '',
        phone: '',
        phoneVali: ''
        //
        //
      },
      userSetRules: {
        userName: [
          { required: true, message: '昵称不可为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ]
      },
      activeName: 'info'
    }
  },
  methods: {
    // 获取当前用户信息
    getUserInfo () {
      api.getUserInfo().then(({data}) => {
        if (data.code === 0) {
          this.userInfo = data.res_
        }
      })
    },
    // 用户设置 tabs 钩子
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    // 用户设置
    userSet (from) {
      this.$refs[from].validate((valid) => {
        if (valid) {
          alert('submit!')
        }
      })
    }
  },
  beforeCreate () {},
  created () {
    this.getUserInfo()
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
@import '@style/user.scss';
// 用户设置
.userSet-body{
  display: flex;
  justify-content: center;
  padding: 15px 0 0 0;
}

// 用户设置-头像
.userPic{
  display: flex;
  align-items: center;
  &>div{
    margin: 0 10px;
  }
}
.userPic .link{
  margin-bottom: 6px;
  &>.el-link{
    font-size: 1.7rem;
  }
}
.userPic .info{
  font-size: 1.5rem;
}
</style>
