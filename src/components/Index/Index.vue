<template>
  <div id="ctn" :style="'width:'+width+'px;height:'+height+'px;'">
    <header>
      <ul id="tabs2">
        <li v-for="(v, k) in tabsData" :key="k"
          @click="clickLi(v.classId, $event)" :class="v.classId === activeLi ? 'active' : ''"
          @blur="blurLi(v.classId, $event)"
        >{{v.name}}</li>
      </ul>

      <Search></Search>
    </header>

    <section>
      内容
    </section>

    <footer>分页</footer>
  </div>
</template>

<script>
import Search from './Index-Search'

// import api from '@api'
import main from '@main'

export default {
  components: {
    Search
  },
  computed: {
    InnerSize () {
      return this.$store.getters.InnerSize
    },
    width () {
      return this.InnerSize.width * 0.85
    },
    height () {
      return this.InnerSize.height - 60 - 40 - 20
    }
  },
  data () {
    return {
      activeLi: 0,
      tabsData: [
        { name: '全部', classId: 0 },
        { name: '学习', classId: 1 },
        { name: '音乐', classId: 2 },
        { name: '视频', classId: 3 },
        { name: '游戏', classId: 4 },
        { name: '其他', classId: 5 },
        { name: '+', classId: -1 }
      ],
      doubleClick: null,
      double: false // 双击中~
    }
  },
  methods: {
    clickLi (classId, e) {
      if (this.double === true) { // 《双击》的第二次 // 进入《修改》当前分类名状态
        e.target.setAttribute('contenteditable', 'true')
      } else { // 《单击》 // 请求《查询》内容卡片
        this.double = true
        console.log('触发单击')
        if (classId === -1) {
          this.add()
        }
      }

      this.doubleClick = setTimeout(() => {
        this.double = false
      }, 500)

      if (classId !== -1) { // 取出(添加+)边界情况
        this.activeLi = classId // 修改颜色
      }
    },

    // li失去焦点时自动《保存修改》的内容
    blurLi (classId, e) {
      e.target.setAttribute('contenteditable', 'false') // 恢复不可修改状态
      // 判断内容是否有变化 有变化发请求更新数据 无变化无视
      if (main.trim(e.target.innerText) === '') { // 《删除》当前空li
        let ul = document.getElementById('tabs2')
        let lis = ul.children
        let arr = [...lis]
        // console.log('空', lis[arr.length - 2])
        ul.removeChild(lis[arr.length - 2])
        return
      }

      if (e.target.innerText !== main.findAttrVal(classId, this.tabsData, 'classId', 'name')) {
        console.log('内容变了,发请求')
      } else {
        console.log('内容没变,无视')
      }
    },

    // 添加新的分类
    add () {
      this.tabsData.splice(this.tabsData.length - 1, 0, { name: '', classId: '' })

      let ul = document.getElementById('tabs2')
      let lis = ul.children

      let arr = [...lis]
      lis[arr.length - 1].setAttribute('contenteditable', 'true')
      lis[arr.length - 1].focus()
    }
  },
  created () {
  },
  watch: {}
}

</script>

<style scoped>
*{
  /* outline: 1px solid red; */
}
#ctn{
  margin: 0 auto;
  width: 1100px;
  height: 600px;
}
header{
  background: #fff;
  border-radius: 5px;
  padding: 0 20px 0 20px;
  height: 40px;
  box-shadow: 2px 2px 5px #00000030;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 小标题 */
#tabs2{
  height: 40px;
  display: inline-block;
}
#tabs2>li{
  float: left;
  padding: 0 10px;
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 40px;
  position: relative;

  /* 文字不可被选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#tabs2>li>div{
  display: none;
  width: 100%;
  height: 2px;
  background: #85ce61;
  position: absolute;
  left: 0;
  bottom: 0;
}
/* 鼠标悬停 */
#tabs2>li:hover{
  color: #85ce61;
}
#tabs2>li:hover>div{
  display: block;
}
/* 激活状态 */
#tabs2>li.active{
  color: #85ce61;
}
#tabs2>li.active>div{
  display: block;
}
</style>
