import Vue from 'vue'
import DOMToImage from '@static/js/dom-to-image.js' // DOM渲染图片
// eslint-disable-next-line no-unused-vars
import FileSaver from '@static/js/FileSaver.js' // 文件转码
const vue = new Vue()

const serverUrl = 'http://127.0.0.1:666' // 服务器地址
const defaultPic = 'http://127.0.0.1:666/userPic/defaultPic.png' // 默认头像

// 正则规则
const reg = {
  // eslint-disable-next-line
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  phone: /^1([3-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
}

const trim = function (str) {
  str = str.replace(/^\s+/, '')
  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1)
      break
    }
  }
  return str
}

// 克隆对象
const clone = function (obj) {
  var newObj = {}
  for (let key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}

// 数组去重
const distinct = function (...rest) {
  return Array.from(new Set([...rest]))
}

// 消息提示
const openInfo = function (msg) {
  vue.$message({
    showClose: true,
    message: msg
  })
}
// 成功提示
const openSuccessInfo = function (msg) {
  vue.$message({
    showClose: true,
    message: msg,
    type: 'success'
  })
}
// 警告信息
const openWarningInfo = function (msg) {
  vue.$message({
    showClose: true,
    message: msg,
    type: 'warning'
  })
}
// 错误信息
const openErrorInfo = function (msg) {
  vue.$message({
    showClose: true,
    message: msg,
    type: 'error'
  })
}
// 右侧弹窗不会自动关闭
// 成功
const notifySuccess = function (msg, title = '成功') {
  vue.$notify({
    title: title,
    message: msg,
    duration: 0,
    type: 'success'
  })
}
const notifyWarning = function (msg, title = '警告') {
  vue.$notify({
    title: title,
    message: msg,
    duration: 0,
    type: 'warning'
  })
}
const notifyInfo = function (msg, title = '消息') {
  vue.$notify({
    title: title,
    message: msg,
    duration: 0,
    type: 'info'
  })
}
const notifyError = function (msg, title = '错误') {
  vue.$notify({
    title: title,
    message: msg,
    duration: 0,
    type: 'error'
  })
}

// 下载文件:文件下载接口返回二进制数据时,添加A标签模拟触发A标签点击事件下载
const download = (data, type = 'xls', name = 'excel') => {
  if (!data) {
    notifyWarning('所选查询范围暂无数据', '警告')
    return
  }
  let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' })) // new一个blob存储返回值
  let link = document.createElement('a') // 创建a标签
  link.style.display = 'none' // 隐藏a
  link.href = url // 把blob中提出的链接赋值给a标签的href属性
  link.setAttribute('download', `${name}.${type}`) // 给a标签设置download属性 文件名 + 后缀

  document.body.appendChild(link) // 把a标签挂载到DOM树
  link.click() // 模拟触发a标签的点击效果

  URL.revokeObjectURL(link.href) // 释放URL 对象
  document.body.removeChild(link) // 移除a标签
}

// 页面（动态生成）表格转excel下载
const downloadExcel = function (list, tHeader, filterVal, name = 'excel') {
  vue.$confirm('确定下载列表文件?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    vue.excelData = list // 你要导出的数据list
    export2Excel(tHeader, filterVal, name)
  }).catch(() => {})
}
// 数据写入excel
const export2Excel = function (tHeader, filterVal, name) {
  require.ensure([], () => {
    const export2Excel = require('@/excel/export2Excel') // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
    // const tHeader = ['用户名', '校长姓名', '邮箱', '学校', '手机', '角色名称', '使用状态'] // 导出的表头名信息
    // const filterVal = ['userName', 'name', 'email', 'schoolName', 'phone', 'roleName', 'flag'] // 导出的表头字段名，需要导出表格字段名
    const list = vue.excelData
    const data = formatJson(filterVal, list)

    export2Excel.export_json_to_excel(tHeader, data, name)// 导出的表格名称，根据需要自己命名
  })
}
// 格式转换，直接复制即可
const formatJson = function (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

// 部分表格(name外字段是循环出来) 下载时 filterVal tHeader 字段遍历
// TaableTitle = [{name: 'xx', prop: 'xxx'},...]  =>  tHeader = ['xx',...]  filterVal = ['xxx',...]
const downloadFieldChange = function (TaableTitle) {
  let obj = {
    tHeader: [],
    filterVal: []
  }
  for (let i of TaableTitle) {
    obj.filterVal.push(i.name)
    obj.tHeader.push(i.prop)
  }
  return obj
}

// map转对象数组 {2:'ajjs', 6:'oij} => [{value: 2, label: 'ajjs'}, {value: 6, label: 'oij'}]
const mapToArr = function (data) {
  var arr = []
  for (let k in data) {
    let obj = {
      value: k * 1,
      label: data[k]
    }
    arr.push(obj)
  }
  return arr
}

// 通过数组对象中的某个对象属性值,获取该对象其他属性值 [{name: 'x', val: 1}, {name: 'z', val: 2}]  -> 通过1获得x
const findAttrVal = function (data, arr, attrName, targetAttrName) {
  for (let i of arr) {
    if (i[attrName] === data) {
      return i[targetAttrName]
    }
  }
}

// 单一图表数据 图表x轴名称 及表格对应属性么 和表格[] => 图表所需数组
const chartDataCalc = function (label, value, data) {
  var arr = []
  for (let i of data) {
    let obj = {}
    obj.label = i[label]
    obj.value = i[value]
    arr.push(obj)
  }
  return arr
}

// 图表下载
const png = function (node, name = '图表') {
  DOMToImage.toBlob(document.getElementById(node)).then(function (blob) {
    window.saveAs(blob, `${name}.png`)
  })
}
// 图表下载
const jpg = function (node, name = '图表') {
  DOMToImage.toJpeg(document.getElementById(node), { quality: 0.95 }).then(function (dataUrl) {
    var link = document.createElement('a')
    link.download = `${name}.jpeg`
    link.href = dataUrl
    link.click()
  })
}

// 多折线图表头遍历
const mslineHead = function (headName, ctnData) {
  let category = []
  for (let i of ctnData) {
    let obj = {
      label: i[headName]
    }
    category.push(obj)
  }
  let obj = { category }
  return obj
}
// 多折线图内容遍历
const mslineCtn = function (attr, label, ctnData) {
  let arr = []
  for (let i of ctnData) {
    var obj = {
      value: i[attr]
    }
    arr.push(obj)
  }
  let obj2 = {
    seriesname: label,
    data: arr
  }
  return obj2
}

// 导出方法 =================================================================================
export default {
  serverUrl,
  defaultPic,
  reg,
  trim,
  clone,
  distinct,
  openInfo,
  openSuccessInfo,
  openWarningInfo,
  openErrorInfo,
  notifySuccess,
  notifyWarning,
  notifyInfo,
  notifyError,
  download,
  downloadExcel,
  downloadFieldChange,
  mapToArr,
  findAttrVal,
  chartDataCalc,
  png,
  jpg,
  mslineHead,
  mslineCtn
}
