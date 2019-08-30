// @数据声明
// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录

// state 访问状态对象 spa中所说的共享值
// vuex 提供了commit的方法修改state的状态
const state = {
  InnerSize: { // 内容区域尺寸
    width: '',
    height: ''
  },
  Mode: 0, // 页面模块显示
  Token: window.sessionStorage.getItem('token') // token

  // 页头
  // TabsActivate: '0', // 选项卡激活下标
  // WebIndex: 0, // 入口页面下标（登录=0 注册=1 密码找回=2）

  // // 所有有页头的主模块监听页面大小变化时改为true
  // PageSizeChange: false
}

export default state
