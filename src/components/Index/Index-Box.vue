<template>
  <div id="ctnBox">
    <!-- 内容卡片 -->
    <ExchangeBox :style="'height:'+height+'px;'">
      内容
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
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style scoped>
*{
  outline: 1px solid red;
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
