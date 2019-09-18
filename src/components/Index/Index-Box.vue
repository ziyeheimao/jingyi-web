<template>
  <div id="ctnBox">
    <!-- 内容卡片 -->
    <ExchangeBox :style="'height:'+height+'px;'">
      <ExchangeCard v-for="(v, k) in 12" :key="k" @click="open(v)"></ExchangeCard>
    </ExchangeBox>

    <!-- 分页 -->
    <footer class="page">
      <el-pagination
        :small='true'
        :background='true'
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="12"
        :pager-count="5"
        layout="prev, pager, next, jumper"
        :total="1000">
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
      currentPage3: 5
    }
  },
  methods: {
    // 分页功能回调函数
    handleCurrentChange (val) {
      // this.page = val
      console.log(val)
    },

    // 卡片点击事件
    open (cardId) {
      console.log(cardId)
    },

    // 获取卡片
    cardGet () {
      let req = {
        classId: this.ActiveClassId,
        userId: this.User.userId,
        page: 1,
        limit: 12
      }
      api.cardGet(req).then(res => {
        console.log(res)
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
*{
  /* outline: 1px solid red; */
}
#ctnBox{
  width: 100%;
  /* height: 100%; */
}
footer.page{
  display: flex;
  justify-content: center;
}
</style>
