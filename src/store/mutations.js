// @数据同步修改
// 关于token的存放位置
// 1.只用vuex存储：刷新页面vuex重新初始化，token消失导致需要重新登录
// 2.window.sessionStorage: 初始化的时候用sessionStorage来赋值，刷新页面重新初始化，但因为sessionStorage里面存有token有值，
// 那么state.token就有值了,vue-router就不会拦截，则无需重新登录。（这个demo用的是这种）

const mutations = {
  SInnerSize: (state, data) => { // 内容区域尺寸
    state.InnerSize = data
  },
  SMode: (state, data) => {
    state.Mode = data // 页面模块显示
  },
  SToken: (state, data) => {
    state.Token = data
  }
  // // 静逸
  // SHeight: (state, data) => { // 设置登录、注册、密码找回、用户中心等模块ctn高度
  //   state.Hieght = data
  // },

  // // 页面下标（登录=0 注册=1 密码找回=2）
  // SWebIndex: (state, data) => {
  //   state.WebIndex = data // 获取下标判断当前显示哪个页面
  // },
  // SPageSizeChange: (state, data) => {
  //   state.PageSizeChange = data // 页面大小变化
  // }

}

export default mutations
