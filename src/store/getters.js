// @数据获取（实时监听变化）
const getters = { // 实时监听state值的变化(最新状态)
  InnerSize: (state) => { // 内容区域尺寸
    return state.InnerSize
  },
  Mode: (state) => {
    return state.Mode // 页面模块显示
  },
  Token: (state) => {
    return state.Token
  }

  // // 页头
  // TabsActivate: (state) => {
  //   return state.TabsActivate // 选项卡激活下标
  // },

  // // 页面下标（登录=0 注册=1 密码找回=2）
  // WebIndex: (state) => {
  //   return state.WebIndex // 获取下标判断当前显示哪个页面
  // },
  // PageSizeChange: (state) => {
  //   return state.PageSizeChange // 页面大小变化
  // }
}

export default getters
