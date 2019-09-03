// @数据异步修改
// actions常用于异步更改状态。也就是说它一般用来先发送请求，然后再commit

export default {
  AMode: (context, data) => {
    context.commit('SMode', data) // 页面模块显示
  },
  AToken: (context, data) => {
    context.commit('SToken', data)
  },
  ARefresh: (context, data) => {
    context.commit('SRefresh', data)
  },
  AUser: (context, data) => {
    context.commit('SUser', data)
  }
}
