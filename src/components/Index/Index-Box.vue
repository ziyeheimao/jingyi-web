<template>
  <div id="ctnBox">
    <!-- 内容卡片 -->
    <ExchangeBox :style="'height:'+height+'px;'">
      <ExchangeCard v-for="(v, k) in cardList" :key="k" @click="open(v.webUrl, v.index)"
       :title='v.webName' :iconUrl='v.webImgUrl' :ctnText='v.description'></ExchangeCard>
    </ExchangeBox>

    <!-- 分页 -->
    <footer class="page">
      <el-pagination
        :small='true'
        :background='true'
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="12"
        :pager-count="5"
        layout="prev, pager, next, jumper"
        :total="cardCount">
      </el-pagination>
    </footer>

    <!-- 添加新标签模态框 -->
    <el-dialog :visible.sync="dialogVisibleAdd" title="添加新标签" width="40%">

      <el-form :model="form"  label-position="left" :rules="rules" ref="form" size='mini'>

        <el-form-item prop='webName'>
          <el-input clearable v-model="form.webName" placeholder="网站名称"></el-input>
        </el-form-item>

        <el-form-item prop='description'>
          <el-input clearable v-model="form.description" placeholder="网站简介"></el-input>
        </el-form-item>

        <el-form-item prop='webUrl'>
          <el-input clearable v-model="form.webUrl" placeholder="域名"></el-input>
        </el-form-item>

        <el-radio-group v-model="RadioLogo">
          <el-radio :label="0">自动爬取logo</el-radio>
          <el-radio :label="1">使用logo链接</el-radio>
          <el-radio :label="2">上传logo图片</el-radio>
        </el-radio-group>

        <el-form-item v-if="RadioLogo === 1" prop='webImgUrl'>
          <el-input clearable v-model="form.webImgUrl" placeholder="LOGO链接"></el-input>
        </el-form-item>

        <el-upload
          ref="upload"
          v-if="RadioLogo === 2"
          :action="main.serverUrl + api.cardUpload"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          :data='form'
          :headers="headers"

          :before-upload="beforeAvatarUpload"
          :on-success='handleSuccess'
          :on-error='handleError'>

          <span>+</span>

          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">

            <span class="el-upload-list__item-actions">
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>

        </el-upload>

        <el-dialog :visible.sync="dialogVisibleUpdata">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="sbumit('form')">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from '@api'
import main from '@main'

import {ExchangeBox, ExchangeCard} from '@myui'

export default {
  components: {
    ExchangeBox,
    ExchangeCard
  },
  computed: {
    InnerSize () {
      return this.$store.getters.InnerSize
    },
    width () {
      return this.InnerSize.width * 0.85
    },
    height () {
      //                           大导航 上下边距 小导航 分页 边距
      return this.InnerSize.height - 60 - 40 - 20 - 40 - 26 - 20
    },
    ActiveClassId () {
      return this.$store.getters.ActiveClassId // 当前激活的卡片分类
    },
    cardNumber () {
      return 4 * 3 // 卡片数量 = 行 * 列
    }
  },
  data () {
    return {
      // 上传 ↓
      dialogImageUrl: '', // 回显图片链接
      dialogVisibleUpdata: false,
      disabled: false,
      fileList: [], // 文件列表
      headers: {
        Token: window.sessionStorage.getItem('token')
      },
      RadioLogo: 0,
      main: {},
      api: {},
      // 上传 ↑

      index: '', // 当前点击的<添加>标号
      dialogVisibleAdd: false, // 添加新标签模态框
      currentPage: 1, // 当前页
      cardList: [], // 卡片数据
      cardCount: 1, // 卡片数量

      addCard: { // <添加> 的卡片模板
        description: '添加新标签打造你得专属导航!',
        keyword: '',
        userId: '',
        webId: 0,
        webImgUrl: '../../../static/img/xxx.png',
        webName: '添加新标签',
        webUrl: '',
        index: '' // 前端判断哪个位置在爬取时图标变化
      },

      form: {
        // keyword: '',
        // userId: '',
        // webId: 0,
        webName: '',
        description: '',
        webImgUrl: '',
        webUrl: ''
      },
      rules: {
        webName: [],
        description: [],
        webImgUrl: [
          { pattern: /[a-zA-z]+:\/\/[^\s]*/, message: '请输入正确的域名' }
        ],
        webUrl: [
          { required: true, message: '域名不可为空', trigger: 'blur' },
          { pattern: /[a-zA-z]+:\/\/[^\s]*/, message: '请输入正确的域名' }
        ]
      }
    }
  },
  methods: {
    // 获取卡片
    cardGet () {
      let req = {
        classId: this.ActiveClassId,
        page: this.currentPage,
        limit: this.cardNumber
      }
      api.cardGet(req).then(({data}) => {
        if (data.code === 0) {
          // 如果卡片数量 正好能被 组数量整除 则加一组(<添加>空卡片)
          if (data.cardCount % this.cardNumber === 0) {
            this.cardCount = data.cardCount + this.cardNumber
          } else {
            this.cardCount = data.cardCount
          }

          if (data.data.length === this.cardNumber) {
            this.cardList = data.data
          } else {
            for (let i = data.data.length; i < this.cardNumber; i++) {
              // 随机加号图片
              let index = main.random.num(1, 12) + ''
              let obj = main.clone(this.addCard)
              obj.webImgUrl = `../../../static/img/${index}.png`
              obj.index = i
              data.data.push(obj) // 向不足一组卡片的数组中添加 <添加标签> 直到补满一组
            }
            this.cardList = data.data
            console.log(this.cardList)
          }
        }
      })
    },

    // 分页功能回调函数
    handleCurrentChange (val) {
      this.currentPage = val
      this.cardGet()
    },

    // 卡片点击事件
    open (url, index) {
      this.index = index
      if (url === '') {
        this.dialogVisibleAdd = true
      } else {
        window.open(url, '_blank')
      }
    },

    sbumit (form) {
      // 点击的 <添加> 标签进入 <加载> 状态
      for (let i of this.cardList) {
        if (i.index === this.index) {
          i.webImgUrl = '../../../static/img/load.gif'
          i.webName = '加载中'
          i.description = '数据爬取中...'
        }
      }

      switch (this.RadioLogo) {
        case 2: // 以上传文件附带参数形式发请求
          this.$refs.upload.submit() // 上传图片
          break

        case 1: // 0 1 以json形式发请求↓
        case 0:
          this.add(form)
          break
      }
    },
    // 添加卡片json
    add (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let data = main.clone(this.form)
          data.classId = this.ActiveClassId
          api.cardAdd(data).then(({data}) => {
            let res = main.msg(data.code, data.msg)
            if (res) {
              this.cardGet() // 重新获取当前页卡片
            }
          })
          this.dialogVisibleAdd = false
        }
      })
    },

    // 移除选中图片
    handleRemove (file) {
      // console.log(file, this.fileList)
      this.fileList = []
    },

    // 上传之前
    beforeAvatarUpload (file) {
      this.form.classId = this.ActiveClassId
      console.log('上传之前', this.form)
      const webUrl = this.form.webUrl
      const type = file.type.indexOf('image') !== -1
      const size = file.size / 1024 / 1024 < 1

      if (!webUrl) {
        this.$message.error('域名是必填项!')
      }
      if (!type) {
        this.$message.error('上传的文件只能是图片格式!')
      }
      if (!size) {
        this.$message.error('文件大小不能超过1MB!')
      }

      let res = type && size && webUrl
      if (res) {
        this.dialogVisibleAdd = false
      }

      return type && size && webUrl
    },

    // 上传成功钩子
    handleSuccess (response, file, fileList) {
      console.log('上传成功', response)
      main.msg(response.code, response.msg) // 提示信息

      setTimeout(() => {
        this.cardGet() // 重新获取当前页卡片
      }, 1000)
    },
    // 上传失败钩子
    handleError (err, file, fileList) {
      console.log('上传失败', err, file, fileList)

      setTimeout(() => {
        this.cardGet() // 重新获取当前页卡片
      }, 1000)
    }
  },
  created () {
    this.cardGet() // 获取卡片
    this.main = main
    this.api = api
  },
  mounted () {},
  watch: {
    ActiveClassId () {
      this.cardGet()
    }
  }
}
</script>

<style scoped>
#ctnBox{
  width: 100%;
}
footer.page{
  display: flex;
  justify-content: center;
}

/* 单选 */
#ctnBox .el-dialog .el-form .el-radio-group{
  margin: 20px 0 10px 5px;
}
</style>
