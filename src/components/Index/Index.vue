<template>
  <div id="ctn" :style="'width:' + width * 1 + 'px;height:' + height + 'px;'"><!-- + 'min-width:750px;min-height:520px !important;' -->

    <header>
      <!-- 小导航 -->
      <nav :style="'max-width:'+ulWidth+'px'">
        <ul id="tabs2" ref="tabs2">
          <li v-for="(v, k) in tabsData" :key="k"
            class="box"
            :class="[v.classId === activeLi ? 'active' : '']"
            @click="clickLi(v.classId, $event)"
            @blur="blurLi(v.classId, $event)"
            @keyup="keyupLi($event)"

            v-dragging="(v.classId !== 0 && v.classId !== -1) ? { list: tabsData, item: v, group: 'group1' } : {}"
          >{{v.className}}</li>
        </ul>
      </nav>

      <!-- 搜索 -->
      <Search></Search>
    </header>

    <!-- 内容区域 -->
    <Box class="ctnBox"></Box>
  </div>
</template>

<script>
import Search from './Index-Search'
import Box from './Index-Box'

import api from '@api'
import main from '@main'

export default {
  components: {
    Search,
    Box
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
    },
    ulWidth () {
      return this.width - 40 - 352 - 20
    }
  },
  data () {
    return {
      activeLi: 0, // 激活的li 样式
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
      classExchangeTimer: null, // 交换分类标签位置时节流,防止多次发请求
      classId: null
    }
  },
  methods: {
    clickLi (classId, e) {
      if (this.double === true) { // 《双击》的第二次 // 进入《修改》当前分类名状态
        if (classId !== 0 && classId !== -1) {
          if (this.classId === classId) {
            e.target.setAttribute('contenteditable', 'true')
            e.target.focus()
          }
        }
      } else { // 单击 单击触发<查询>当前分类下卡片
        this.double = true
        this.classId = classId
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
      e.target.innerText = main.trim(e.target.innerText) // 去首尾空格

      let newInner = e.target.innerText // 当前内容
      let oldInner = main.findAttrVal(classId, this.tabsData, 'classId', 'className') // 之前内容

      // 判断内容是否有变化 有变化发请求更新数据 无变化无视
      if (main.trim(newInner) === '') { // 《删除》当前空li
        let ul = document.getElementById('tabs2')
        let lis = ul.children
        let arr = [...lis]
        ul.removeChild(lis[arr.length - 2])

        this.del(classId) // 获取 classId 发请求<删除>
        return
      }

      if (newInner !== oldInner) {
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

    // class的位置移动------------------------------------------------------------------------------------------

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
    getClass () {
      api.classGet().then(({data}) => {
        if (data.code === 0) {
          // 按sort的属性值 排序
          let arr = main.bubbleSort(data.result, 'sort')

          this.$store.dispatch('AClass', arr)
          // 貌似CPU 多线程处理导致的BUG ↓ 使用异步函数包裹处理
          setTimeout(() => {
            this.tabsData = []
          }, 0)

          setTimeout(() => {
            this.tabsData = [{ className: '全部', classId: 0 }, ...arr, { className: '+', classId: -1 }]
            // console.log(this.tabsData)
          }, 0)
        }
      })
    },

    // 交换分类
    exchange (req) {
      api.classExchange(req).then(res => {
        if (res.data.code === 0) {
          this.getClass()
        }
      })
    },

    // 提示信息
    _info (res) {
      if (res.data.code === 0) {
        main.openSuccessInfo(res.data.msg)
        this.getClass() // 更新数据
      } else {
        main.openErrorInfo(res.data.msg)
      }
    }
  },
  created () {
    this.getClass()
  },
  mounted () {
    // 碰撞检测
    this.$dragging.$on('dragged', (data) => {
      clearTimeout(this.classExchangeTimer)

      this.classExchangeTimer = setTimeout(() => {
        // console.log('dragged碰撞检测', data.draged.classId, data.draged.sort, data.to.classId, data.to.sort)
        let req = {
          sort1: data.draged.sort,
          sort2: data.to.sort,
          classId1: data.draged.classId,
          classId2: data.to.classId
        }
        this.exchange(req)
      }, 500)
    })

    // 拖拽结束 dragend
    this.$dragging.$on('dragend', function (data) {
      // console.log('dragend拖拽结束时返回组(用于多组拖拽时判断哪一组)', data)
    })
  },
  watch: {
    classId () {
      this.$store.commit('SActiveClassId', this.classId)
    }
  }
}

</script>

<style scoped>
#ctn{
  margin: 0 auto;
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
  padding: 0 7px;
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 40px;

  /* 文字不可被选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* 鼠标悬停 */
#tabs2>li:hover{
  color: #85ce61;
}
/* 激活状态 */
#tabs2>li.active{
  color: #85ce61;
}

/* ----------------------------------------------------------------------------------------------- */

/* 父元素 */

/* 子元素 */
.box {
  padding: 5px 15px;
  display: inline-block;
  text-align: center;
  /* transition: transform 0.3s; */
}
/* 被碰撞位置样式变化 */
.box.dragging {
  /* transform: scale(1.1); */
  outline: 1px solid red;
  background-color: #85ce6130;
}
.ctnBox{
  margin-top: 20px;
}
</style>
