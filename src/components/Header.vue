<template>

  <header class="myNav container-fluid">
    <!-- 不折叠页头↓ -->
    <div class="row" v-if="TilingIsShow" id="tiling">
      <!-- 标题栏 -->
      <nav class="tabs col-xs-11 col-sm-11 col-md-10 col-lg-10">
        <!-- 左按钮 -->
        <div class="lt" v-if="btnIsShow" @click="move(-1)">&lt;</div>
        <ul ref="tabs">
          <li :data-index='0' @click="activate(0)" :class='0 == select? "activate" : ""'
          style="position: relative;"
          :style='"left:" + left + "px;"'
          >
            <img src="../assets/logo.svg" alt="logo" width="66px" height="30px">
          </li>
          <li v-for="(value, key) in tabsList" :key="key + 1"
          :data-index="key + 1"
          @click="activate(key + 1)"
          :class='key + 1 == select? "activate" : ""'
          style="position: relative;"
          :style='"left:" + left + "px;"'
          >{{value}}</li>
          <!-- <li @click="add">+</li> -->
        </ul>
        <!-- 右按钮 -->
        <div class="gt" v-if="btnIsShow" @click="move(1)">&gt;</div>
      </nav>

      <!-- 用户↓ -->
      <div class="user col-md-2 col-lg-2">
        <!-- col-xs-0 col-sm-0 -->
        <img src="../assets/userPic.png" alt="user">
        <a href="javascript:;" @click="handleSwitch(0)">登录</a>
        /
        <a href="javascript:;" @click="handleSwitch(1)">注册</a>
      </div>
    </div>

    <!-- 折叠页头↓ -->
    <div class="row" v-if="!TilingIsShow" id="fold">
      <!-- 显示部分 -->
      <div class="col-12">
        <div class="row title">

          <div class="logo" @click="activate(0)">
            <img src="../assets/logo.svg" alt="logo" width="66px" height="30px">
          </div>

          <div class="ctn">
            <span class="" @click="show">{{tabsList[index]}}</span>
          </div>

          <div class="icon" @click="show">
            <i class="el-icon-more-outline"></i>
          </div>

        </div>
      </div>
      <!-- 隐藏部分 -->
      <ul class="col-12 list" :class="display">
        <li v-for="(value, key) in tabsList" :key="key + 1"
        :data-index="key + 1"
        @click="activate(key + 1, true)"
        >{{value}}</li>
      </ul>
    </div>
  </header>

</template>

<script>
export default {
  computed: {
    tabsActivate () {
      return this.$store.getters.tabsActivate // 获取当前激活的tabs下标
    },
    PageSizeChange () {
      return this.$store.getters.PageSizeChange
    }
  },
  data () {
    return {
      tabsList: ['用户中心', '猜你喜欢', '友情链接', '关于本站', '在线留言'], // 选项卡选项
      index: 0, // 折叠面板选中项下标
      select: '0', // tabs被点击时激活的样式
      TilingIsShow: true, // 屏幕尺寸 // 平铺tabs是否显示
      innerWidth: 0, // 文档显示区宽度
      throttle: 0, // 节流计数
      btnIsShow: false, // 箭头是否显示
      left: 0, // 选项卡li标签偏移量
      timer: null, // 控制页面大小变化时计算频率
      display: 'none' // 'block'
    }
  },
  created () {
    this.judgeSize()
  },
  mounted () {
    if (this.TilingIsShow) {
      this.getUlWidth()
    }
  },
  methods: {
    // 防抖
    debounce () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.TilingIsShow) {
          this.getUlWidth() // 获取当前选项卡ul总宽度对比li宽总和计算是否开启滑动开关和两边按钮
        }
      }, 300)
    },
    // 判断用户显示器分辨率
    judgeSize () {
      this.innerWidth = window.innerWidth
      if (window.innerWidth > 767) {
        this.TilingIsShow = true
      } else {
        this.TilingIsShow = false
      }
    },
    // 获取文档显示区宽度计算出ul的宽度后
    getUlWidth () {
      // console.log(this.$refs.tabs)
      if ((this.innerWidth * 0.8 - this.$refs.tabs.clientWidth * 0.15) < this.$refs.tabs.clientWidth) {
        // 显示按钮
        console.log('tabs达到临界值')
        this.btnIsShow = true // 显示左右按钮
      } else {
        console.log('tabs正常宽度范围')
        this.btnIsShow = false // 隐藏按钮
        this.left = 0 // 列表所有li回复默认起始位置
      }
    },
    // 选项卡点击事件
    activate (key, isShow) {
      if (isShow) {
        this.display = 'none' // 隐藏选项列表
      }
      this.$store.commit('setTabsActivate', key) // 将当前激活的tabs下标存入vuex
      this.select = key
      this.index = key - 1 // 修改折叠面板选中项下标
    },
    // 选择注册&登录
    handleSwitch (index) {
      // console.log(index)
      this.$store.commit('setWebIndex', index) // 将当前激活的功能页面下标存入vuex
    },
    // 选项卡左右按钮效果
    move (index) {
      // console.log('left', this.left)
      if (index < 0) { // 左按钮点击 内容向右移动 94
        // 如果左侧没有剩余空间，则不移动
        if (this.left >= 0) {
          return false
        }
        // 如果左侧剩余空间小于100直接让left归零
        if (Math.abs(this.left) <= 100) {
          this.left = 0
          return false
        }
        this.left += 100
      } else { // 右按钮点击 内容向左移动
        // console.log('当前ul', this.$refs.tabs.scrollWidth)
        // console.log('', this.$refs.tabs.children)

        var lis = this.$refs.tabs.children
        var liTotalWidth = 0 // 所有li总宽度
        for (var li of lis) {
          liTotalWidth = liTotalWidth + li.offsetWidth + 5
        }

        // 如果右侧没有内容可显示 则不移动
        // console.log('总宽', liTotalWidth, 'ul宽', this.innerWidth * 10 / 12, '移动距离', this.left * -1)
        if ((this.left * -1) >= (liTotalWidth - this.innerWidth * 10 / 12) + 50) { // 加50差补
          return false
        }
        // 如果右侧剩余空间小于100直接移动到末尾
        // if ((liTotalWidth - (this.left * -1) - (this.innerWidth * 10 / 12)) < 100) {
        //   // this.left = -1 * (liTotalWidth - (this.innerWidth * 10 / 12) + 90)
        //   console.log('情况2')
        //   return
        // }
        this.left -= 100
      }
    },
    // 折叠面板下点击事件
    show () {
      if (this.display === 'none') {
        this.display = 'block'
      } else {
        this.display = 'none'
      }
    }

  },
  watch: {
    PageSizeChange () {
      this.$store.commit('SetPageSizeChange', false)

      this.judgeSize() // 判断当前显示区大小
      this.debounce()
    }
  }
}
</script>

<style scoped>
*{
  /* outline: 1px solid red; */
}
.myNav{
  height: 60px;
  background: #fff;
}
#tiling{
  height: 60px
}

/* 不折叠状态选项卡 ------------------------------------------------------------------------------ */
#tiling>.tabs{
  height: 100%;
  display: flex;
  align-items: center;
}
#tiling>.tabs>ul{
  margin-left: 5%;
  position: relative;

  white-space: nowrap; /* 禁止换行 */
  overflow: hidden;
  /* text-overflow: ellipsis; */
  /* ... */
  padding-top: 15px;
  height: 60px;
}
  /* 默认样式 */
#tiling>.tabs>ul>li{
  display: inline;
  height: 30px;
  line-height: 30px;
  /* float: left; */
  font-size: 1.7rem;
  color: rgb(122, 122, 122);
  padding: 0 1.2rem;
  cursor: pointer;
  position: relative;
  /* left: 0px; */
  margin-right: 5px;
  transition: all 0.5s linear;
}
#tiling>.tabs>ul>li>img{
  position: relative;
  top: -2px;
}
#tiling>.tabs>ul>li::after{
  content: "";
  display: none;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right,rgba(176,195,88,0.25),rgb(176,195,88),rgba(176,195,88,0.25));
  transform: translateX(0px) translateY(19px);
}
  /* 鼠标悬停 */
#tiling>.tabs>ul>li:hover{
  color: rgb(176,195,88);
}
#tiling>.tabs>ul>li:hover::after{
  display: block;
}
  /* 激活 */
#tiling>.tabs>ul>li.activate{
  color: rgb(176,195,88);
}
#tiling>.tabs>ul>li.activate::after{
  display: block;
}

/* 功能箭头 */
#tiling .lt,#tiling .gt{
  width: 20px;
  font-size: 1.7rem;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: rgb(122,122,122);
  cursor: pointer;
}
#tiling .lt:hover,#tiling .gt:hover{
  color: rgb(176,195,88);
}
#tiling .tabs>.lt{
  position: absolute;
  left: 5%;
  z-index: 2;
}

/* 用户 */
#tiling>.user{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
#tiling>.user>img{
  margin-right: 3px;
  width: 45px;
  height: 45px;
  overflow: hidden;
}
#tiling>.user>a{
  margin: 0 5px;
  color: rgb(128, 201, 60);
  text-decoration: none;
}
#tiling>.user{
  color: rgb(128, 201, 60);
}

/* 折叠状态----------------------------------------------------------------------------------- */
#fold{
  border-bottom: 1px solid #eee;
}
#fold, #fold>.col-12, #fold>.col-12>.title{
  height: 100%;
}
#fold>.col-12>.title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#fold>.col-12>.title>.logo{
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
}
#fold>.col-12>.title>.ctn{
  font-size: 1.4rem;
  cursor: pointer;
  padding: 10px 20px;
}
#fold>.col-12>.title>.icon{
  padding: 28px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
#fold>.col-12>.title>.icon>i{
  padding: 7px;
  border-radius: 3px;
}
#fold>.col-12>.title>.icon>i:hover{
  background: rgb(176,195,88);
  color: #fff;
}
/* 选项部分 */
#fold>.list{
  position: relative;
  z-index: 1;
  padding-bottom: 15px;
  background: #fff;
}
#fold>.list>li{
  padding: 5px;
  background: #fff;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 1.4rem;
  cursor: pointer;
}
#fold>.list>li:hover{
  background: rgb(177,210,224);
  color: #fff;
}
#fold>.list>li:first-child{
  border-top: 1px solid #eee;
}
#fold>.list>li:last-child{
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* vue绑定 */
.none{
  display: none;
}
.block{
  display: block;
}

</style>
