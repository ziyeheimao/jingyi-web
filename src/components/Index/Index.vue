<template>
  <div id="ctn" :style="'width:'+width+'px;height:'+height+'px;'">
    <header>
      <ul id="tabs2">
        <li v-for="(v, k) in tabsData" :key="k"
          @click="clickLi(v.classId, $event)" :class="v.classId === activeLi ? 'active' : ''"
          @blur="blurLi(v.classId, $event)"
          @keyup="keyupLi($event)"
        >{{v.className}}<!-- <div></div> --></li>
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

import api from '@api'
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
        // { className: '全部', classId: 0 },
        // { className: '学习', classId: 1 },
        // { className: '音乐', classId: 2 },
        // { className: '视频', classId: 3 },
        // { className: '游戏', classId: 4 },
        // { className: '其他', classId: 5 },
        // { className: '+', classId: -1 }
      ],
      doubleClick: null,
      double: false, // 双击中~
      id: null
    }
  },
  methods: {
    clickLi (classId, e) {
      if (this.double === true) { // 《双击》的第二次 // 进入《修改》当前分类名状态
        if (classId !== 0 && classId !== -1) {
          if (this.id === classId) {
            e.target.setAttribute('contenteditable', 'true')
            e.target.focus()
          }
        }
      } else { // 单击 单击触发<查询>当前分类下卡片
        this.double = true
        this.id = classId
        if (classId === -1) {
          // 添加分类 (DOM, 添加数据失焦时触发)
          this.tabsData.splice(this.tabsData.length - 1, 0, { name: '', classId: '' })

          let ul = document.getElementById('tabs2')
          let lis = ul.children

          let arr = [...lis]
          lis[arr.length - 1].setAttribute('contenteditable', 'true')
          lis[arr.length - 1].focus()
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

      let newInner = e.target.innerText // 当前内容
      let oldInner = main.findAttrVal(classId, this.tabsData, 'classId', 'className') // 之前内容

      // 判断内容是否有变化 有变化发请求更新数据 无变化无视
      if (main.trim(newInner) === '') { // 《删除》当前空li
        let ul = document.getElementById('tabs2')
        let lis = ul.children
        let arr = [...lis]
        ul.removeChild(lis[arr.length - 2])

        this.del(classId) // 获取 id 发请求<删除>
        return
      }

      if (newInner !== oldInner) {
        // console.log('内容变化时发请求', classId)
        // console.log('当前内容', newInner)
        // console.log('之前内容', oldInner)
        if (oldInner === undefined) { // 新增
          this.add(newInner)
        } else { // 修改
          this.updata(classId, newInner)
        }
      }
    },

    // 回车 = 保存 = 失去焦点
    keyupLi (e) {
      if (e.keyCode === 13) {
        e.target.innerText = main.delReturn(e.target.innerText) // 去除回车
        e.target.blur()
      }
    },

    // --------------------------------------------------------------------------------------------------------
    // 新增分类
    add (className) {
      let req = { className }
      api.classAdd(req).then(res => {
        this._info(res)
      })
    },

    // 删除分类
    del (classId) {
      if (!classId) { return }
      api.classDel(classId).then(res => {
        this._info(res)
      })
    },

    // 修改分类
    updata (classId, className) {
      let req = { classId, className }
      api.classUpdata(req).then(res => {
        this._info(res)
      })
    },

    // 获取分类
    get () {
      api.classGet().then(({data}) => {
        if (data.code === 0) {
          setTimeout(() => {
            this.tabsData = []
          }, 0)

          setTimeout(() => {
            this.tabsData = [{ className: '全部', classId: 0 }, ...data.result, { className: '+', classId: -1 }]
          }, 0)
        }
      })
    },

    // 提示信息
    _info (res) {
      if (res.data.code === 0) {
        main.openSuccessInfo(res.data.msg)
        this.get() // 更新数据
      } else {
        main.openErrorInfo(res.data.msg)
      }
    }
  },
  created () {
    this.get()
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
/* #tabs2>li>div{
  display: none;
  width: 100%;
  height: 2px;
  background: #85ce61;
  position: absolute;
  left: 0;
  bottom: 0;
} */
/* 鼠标悬停 */
#tabs2>li:hover{
  color: #85ce61;
}
/* #tabs2>li:hover>div{
  display: block;
} */
/* 激活状态 */
#tabs2>li.active{
  color: #85ce61;
}
/* #tabs2>li.active>div{
  display: block;
} */
</style>
