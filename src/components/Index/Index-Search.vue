<template>
  <div id="search" ref="search">
    <el-input placeholder="人傻才要多xiao习(๑•̀ㅂ•́)و✧" clearable v-model="keyword" size='small' id="keyword"
      @keyup.native="keyup($event)" @focus="focus(1)" @blur="focus(0)">

      <el-select v-model="type" slot="prepend" placeholder="请选择">
        <el-option v-for="(v, k) in searchEngines" :key="k" :label="v.name" :value="v.id"></el-option>
      </el-select>

      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>

    <ul class="hotWords" id="hotWords" :style="'width:'+hotWordsWidth+'px;'+show"
      @mouseenter='mouseenter' @mouseleave='mouseleave'>
      <!-- mouseenter：当鼠标移入某元素时触发 --><!-- mouseleave：当鼠标移出某元素时触发 -->
      <li v-for="(v, k) in res.hotWords" :key="k" @click="clickLi(v)" :class="k === activateIndex ? 'activate' : ''">
        <span :style="'max-width:'+(hotWordsWidth-35)+'px'">{{v}}</span>
        <i class="el-icon-close" v-show="mode" @click.stop="del(v)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
// import api from '@api'
import main from '@main'

import $ from 'jquery'
// const jsonp = require('jsonp')
// import jsonp from 'jsonp'

export default {
  components: {
    // x
  },
  // props: [''],
  computed: {
  },
  data () {
    return {
      keyword: '', // 关键字
      type: 0, // 搜索引擎
      activateIndex: -1,

      searchEngines: [ // 搜索引擎字典
        {name: '百度', id: 0, url: 'https://www.baidu.com/s?wd='},
        {name: '谷歌', id: 2, url: 'https://www.google.com.hk/search?q='},
        {name: '360', id: 1, url: 'https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q='}
        // {name: '菜鸟', id: 3, url: 'http://www.runoob.com/?s='},
        // {name: 'w3', id: 4, url: 'http://www.google.com.hk/search?sitesearch=w3school.com.cn&as_q='}
      ],

      changeTimer: null, // change 节流 定时器
      searchTimer: null, // search 节流 定时器
      hotWordsWidth: '', // 搜索热词list宽度
      res: {
        hotWords: []
      },
      mode: false, // 关键词模式 true搜索历史(显示关闭的x) false热词(不显示关闭的x)
      show: '',
      hover: false // 鼠标是否悬停在ul (热词&历史)上
    }
  },
  methods: {
    // 搜搜辅助
    keywordChange () {
      clearTimeout(this.changeTimer)
      this.changeTimer = setTimeout(() => {
        // 关键词                           热词
        if (this.keyword === '') {
          this.historyMode() // 判断使用搜索历史还是 搜索热词
        } else {
          this.hotWords() // 搜索辅助
        }
      }, 100)
    },

    // 按键弹起
    keyup (e) {
      if (e.keyCode === 13) {
        if (this.activateIndex === -1) {
          this.search()
        } else {
          this.keyword = this.res.hotWords[this.activateIndex]
          this.search()
        }
      } else if (e.keyCode === 38) {
        switch (this.activateIndex) {
          case -1:
            this.activateIndex = this.res.hotWords.length - 1
            break
          default:
            this.activateIndex--
            break
        }
      } else if (e.keyCode === 40) {
        this.activateIndex === this.res.hotWords.length - 1 ? this.activateIndex = -1 : this.activateIndex++
      }
    },

    // 搜索
    search () {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        let url = main.findAttrVal(this.type, this.searchEngines, 'id', 'url')
        window.open(url + this.keyword, '_blank')

        // 缓存搜索历史
        let history = window.localStorage.getItem('searchHistory')
        var searchHistory = null

        if (history === null) {
          let arr = [this.keyword]
          searchHistory = JSON.stringify(arr) // 转json
        } else {
          let historyArr = JSON.parse(history)
          historyArr.unshift(this.keyword)
          historyArr = main.distinct(...historyArr) // 数组去重
          // 如果数组长度大于15 尾巴切掉 只留15个记录
          historyArr = main.len(historyArr, 15) // 限制历史记录个数
          searchHistory = JSON.stringify(historyArr) // 转数组
        }
        window.localStorage.setItem('searchHistory', searchHistory)
      }, 100)
    },

    // 百度热词
    hotWords () {
      if (this.keyword === '') {
        this.show = ''
        return
      } else {
        this.show = 'display:block;'
      }
      let url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + this.keyword + '&json=1&p=3&sid=20144_1467_19033_20515_18240_17949_20388_20456_18133_17001_15202_11615&req=2&csor=2&pwd=s&cb=jQuery110207612423721154653_1467355506619&_=1467355506623'

      // jsonp(url, {params: 'jQuery110207612423721154653_1467355506619'}, (err, data) => {
      //   if (err) {
      //     console.log('jsonp抛错', err)
      //   } else {
      //     console.log(data)
      //   }
      // })

      // url:请求地址的url, eg:http://freegeoip.net/json/?callback=handleResponse
      // opts: 有如下四个可选参数
      //   * params 与后端约定请求的字段名称，默认是callback
      //   * timeout 指定请求响应时间，过多长时间之后显示请求超时
      //   * prefix 指定回调函数params的回调句柄前缀，默认为__jp，一般都是默认的，基本用不到
      //   * name  指定回调函数的句柄，默认为’_jp${number++}’,一般都是默认的，基本用不到
      // fn  请求事件的回调函数，负责接受data响应数据和请求失败的err信息。

      $.ajax({
        type: 'get',
        url: url,
        async: true,
        dataType: 'jsonp',
        jsonpCallback: 'jQuery110207612423721154653_1467355506619',
        success: (data) => {
          this.mode = false
          this.res.hotWords = data.s
        }
      })
    },

    // 搜索模块宽度计算
    modelWidth () {
      this.hotWordsWidth = this.$refs.search.clientWidth
    },

    // 点击热词
    clickLi (value) {
      this.keyword = value
      this.search()
    },

    // search input 获取焦点 失去焦点时
    focus (code) {
      if (code === 1) { // 获取焦点
        this.show = 'display:block;'
        if (this.keyword === '' || this.res.hotWords.length === 0) {
          this.historyMode() // 判断使用搜索历史还是 搜索热词
        }
      } else if (code === 0) { // 失去焦点
        setTimeout(() => {
          if (this.hover === false) {
            this.show = ''
          }
        }, 300)
      }
    },

    // 判断使用搜索历史还是 搜索热词
    historyMode () {
      this.mode = true
      let history = window.localStorage.getItem('searchHistory')

      if (history === null || history.length === 0) {
        this.hotWords()
      } else {
        let historyArr = JSON.parse(history)
        this.res.hotWords = historyArr
      }
    },

    // 删除某条搜索记录
    del (value) {
      let history = window.localStorage.getItem('searchHistory') // 取
      let historyArr = JSON.parse(history) // 转数组
      let index = historyArr.indexOf(value) // 查
      historyArr.splice(index, 1) // 删

      let searchHistory = JSON.stringify(historyArr) // 转json
      window.localStorage.setItem('searchHistory', searchHistory) // 存

      // 刷新
      this.historyMode()
    },

    // 鼠标移入
    mouseenter () {
      this.hover = true
    },
    // 鼠标移出
    mouseleave () {
      this.activateIndex = -1 // 激活的选项复位
      this.hover = false
      this.focus(0)
      document.getElementById('keyword').blur()
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.modelWidth()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
    keyword () {
      this.keywordChange()
    }
  }
}
</script>

<style scoped>
#search .el-select {
  width: 80px;
}
/* 搜索辅助 */
#search{
  position: relative;
}
#search>.hotWords{
  position: absolute;
  top: 37px;
  left: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #fff;
  overflow: hidden;
  padding: 3px 0 5px;
  box-shadow: 2px 2px 5px #00000030;
  display: none;
}
#search>.hotWords>li{
  padding: 7px 10px;
  color: #666;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#search>.hotWords>li~li{
  border-top: 1px solid #eee;
}
#search>.hotWords>li:hover{
  background: #ecf8ff;
  color: #409eff;
}
/* activate */
#search>.hotWords>li.activate{
  background: #ecf8ff;
  color: #409eff;
}
#search>.hotWords>li>span{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* close */
#search>.hotWords>li>i:hover{
  color: red;
}
</style>
