// @数据获取

const getters = {
  InnerSize: (state) => { // 内容区域尺寸
    return state.InnerSize
  },
  Mode: (state) => {
    return state.Mode // 页面模块显示
  },
  Token: (state) => {
    return state.Token
  },
  Refresh: (state) => {
    return state.Refresh
  },
  User: (state) => { // 用户信息
    return state.User
  },
  Class: (state) => {
    return state.Class // 当前用户的所有卡片分类
  },
  ActiveClassId: (state) => { // 当前激活的卡片分类
    return state.ActiveClassId
  }
}

export default getters
