<template>
  <div id="ctn">
    <header>
      <ul id="tabs">
        <li v-for="(v, k) in tabsData" :key="k">{{v.name}}</li>
      </ul>
    </header>

    <section>
      内容
      <el-button type="success">asd</el-button>
    </section>

    <footer>分页</footer>
  </div>
</template>

<script>
// import api from '@api'
export default {
  data () {
    return {
      tabsData: [
        { name: '全部', classId: 0 },
        { name: '学习', classId: 1 },
        { name: '音乐', classId: 2 },
        { name: '视频', classId: 3 },
        { name: '游戏', classId: 4 },
        { name: '其他', classId: 5 },
        { name: '+', classId: -1 }
      ]
    }
  },
  methods: {
  }
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
  padding: 0 20px;
}
#tabs{
  height: 40px;
  display: inline-block;
}
#tabs>li{
  float: left;
  padding: 12px 10px;
  font-size: 1.4rem;
  cursor: pointer;
}
#tabs>li:hover{
  color: #85ce61;
  /* position: relative; */
}
#tabs>li::before{
  content: "";
  /* position: absolute;
  left: 0;
  bottom: 5px; */
  width: 15px;
  height: 2px;
  background: red;
}
</style>
