<template>
  <div id="ctn" :style="'width:'+width+'px;height:'+height+'px;'">
    <header>
      <ul id="tabs2" ref="tabs2">
        <li v-for="(v, k) in tabsData" :key="k"
          :class="[v.classId === activeLi ? 'active' : '', outline === k ? 'outline' : '']"
          @click="clickLi(v.classId, $event)"
          @blur="blurLi(v.classId, $event)"
          @keyup="keyupLi($event)"
          @mousedown="mousedownLi($event, k, v.classId)"
          @mouseup="mouseupLi($event, v.classId)"
          @mouseleave='mouseleaveLi($event, v.classId)'
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

// import $ from 'jquery'

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
      activeLi: 0, // 激活的li 样式
      outline: -1, // 鼠标按下时描边样式
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
    // 初始化
    init () {
      // 获取ul下的li相对ul的距离,并转为定位布局 为拖拽做准备
      var aLi = document.querySelectorAll('#tabs2>li') // 获取所有的li

      let ul = document.getElementById('#tabs2')
      let width = this.$refs.tabs2.clientWidth

      var aPs = [] // 存放所有li元素的位置
      for (let i = 0, len = aLi.length; i < len; i++) {
        aPs.push([aLi[i].offsetTop, aLi[i].offsetLeft])

        console.log(aPs)
        setTimeout(function () {
          aLi[i].style.position = 'absolute' // 设置属性快于获取属性，外加cpu的多线程处理机制 导致这里出现bug
          aLi[i].style.top = aPs[i][0] + 'px' // 所以需要定时器包裹
          aLi[i].style.left = aPs[i][1] + 'px'
        }, 0)
      }

      ul.style.width = width + 'px'
    },

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

    // class的位置移动------------------------------------------------------------------------------------------
    // 鼠标按下
    mousedownLi (e, key, classId) {
      // e.target.outline: 1px solid red;
      if ([0, -1].includes(classId)) {
        return
      }
      this.outline = key
      console.log('按下', e.target)
    },
    // 鼠标弹起
    mouseupLi (e) {
      this.outline = -1
      console.log('弹起', e.target)
    },
    // 鼠标移出 (防止弹起事件未触发)
    mouseleaveLi (e) {
      if (this.outline !== -1) {
        this.outline = -1
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
          // 按sort的属性值 排序
          let arr = main.bubbleSort(data.result, 'sort')

          // 貌似CPU 多线程处理导致的BUG ↓ 使用异步函数包裹处理
          setTimeout(() => {
            this.tabsData = []
          }, 0)

          setTimeout(() => {
            this.tabsData = [{ className: '全部', classId: 0 }, ...arr, { className: '+', classId: -1 }]

            // setTimeout(() => {
            //   this.init()
            // }, 0)
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
  mounted () {},
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
  position: relative;
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

/* 鼠标按下时 */
.outline{
  outline: 2px solid #fe8181;
}
</style>
