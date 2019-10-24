<template>
  <!-- 其它设置 -->
  <ElevatorItem class="otherSet">
    <div class="otherSet-title title">
      <p>其它设置</p>
      <el-divider></el-divider>
    </div>

    <div class="otherSet-body">
      <div>
        <p>搜索引擎</p>

        <el-form ref="searchSettings" :model="searchSettings" label-width="70px" size='small' :inline="true">

          <el-form-item label="搜索历史">
            <el-switch v-model="searchSettings.searchHistory" active-color="#85ce61" inactive-color="#ccc"></el-switch>
          </el-form-item>

          <el-form-item label="搜索热词">
            <el-switch v-model="searchSettings.searchAIDS" active-color="#85ce61" inactive-color="#ccc"></el-switch>
          </el-form-item>

        </el-form>

        <div>
          <p v-for="(v, k) in 12" :key="k">{{v}}</p>
        </div>
      </div>

    </div>
  </ElevatorItem>
</template>

<script>
// import api from '@api'
// import main from '@main'
import { ElevatorItem } from '@myui'

export default {
  components: {
    ElevatorItem
  },
  // props: [''],
  computed: {
    _searchSettings () {
      let searchSettings = JSON.parse(window.localStorage.getItem('searchSettings'))
      if (searchSettings === null) {
        return {searchHistory: true, searchAIDS: true}
      } else {
        return searchSettings
      }
    }
  },
  data () {
    return {
      searchSettings: {
        searchHistory: true,
        searchAIDS: true
      }
    }
  },
  methods: {
    // 初始化
    init () {
      this.searchSettings = this._searchSettings // 初始化搜索设置
    },

    // 保存搜索设置
    storage () {
      let searchSettings = JSON.stringify(this.searchSettings) // 转json
      window.localStorage.setItem('searchSettings', searchSettings) // 存
    }
  },
  beforeCreate () {},
  created () {
    this.init()
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
    'searchSettings.searchHistory' () {
      this.storage()
    },
    'searchSettings.searchAIDS' () {
      this.storage()
    }
  }

}
</script>

<style lang='scss' scoped>
@import '@style/user.scss';
.otherSet-body{
  display: flex;
  justify-content: center;
  padding: 15px 0 0 0;
  &>div{
    width: 80%;
    outline: 1px solid red;
  }
}
</style>
