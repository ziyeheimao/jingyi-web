<template>
  <div id="ctnBox">
    <!-- 内容卡片 -->
    <ExchangeBox :style="'height:'+height+'px;'">
      <ExchangeCard v-for="(v, k) in cardList" :key="k" @click="open(v.webUrl)"
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
  </div>
</template>

<script>
import api from '@api'
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
    User () {
      return this.$store.getters.User
    },
    ActiveClassId () {
      return this.$store.getters.ActiveClassId // 当前激活的卡片分类
    }
  },
  data () {
    return {
      currentPage: 1, // 当前页
      cardList: [], // 卡片数据
      cardCount: 1 // 卡片数量
    }
  },
  methods: {
    // 分页功能回调函数
    handleCurrentChange (val) {
      this.currentPage = val
      this.cardGet()
    },

    // 卡片点击事件
    open (url) {
      window.open(url, '_blank')
    },

    // 获取卡片
    cardGet () {
      let req = {
        classId: this.ActiveClassId,
        userId: this.User.userId,
        page: this.currentPage,
        limit: 12
      }
      console.log(req)
      api.cardGet(req).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.cardCount = data.cardCount
          this.cardList = data.data
        }
      })
    }
  },
  created () {
    this.cardGet() // 获取卡片
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
</style>
