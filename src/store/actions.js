// @数据异步修改

// actions常用于异步更改状态。也就是说它一般用来先发送请求，然后再commit
export default {
  AMode: (context, data) => {
    context.commit('SMode', data) // 页面模块显示
  },
  AToken: (context, data) => {
    context.commit('SToken', data)
  }
  // UserLogin ({ commit }, data) {
  //   commit('LOGIN', data)
  // },
  // UserLogout ({ commit }) {
  //   commit('LOGOUT')
  // },
  // // uid
  // asyncSetUid: (context, data) => { // 异步存入uid
  //   context.commit('setUid', data)
  // },
  // // vuex试验
  // modifyDelay: (context) => {
  //   setTimeout(() => { // 模拟网络延迟
  //     // 如果异步操作之后需要修改数据
  //     context.commit('modifyCount') // 异步写入，方法是mutations中的方法
  //   }, 2000)
  // },

  // asyncSetCtnData: (context, data) => {
  //   // 如果异步操作之后需要修改数据
  //   context.commit('setCtnData', data) // 异步写入，方法是mutations中的方法
  // },
  // asyncSetPageCount: (context, data) => {
  //   context.commit('setPageCount', data)
  // }
}
