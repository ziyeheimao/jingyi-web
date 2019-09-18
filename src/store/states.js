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
  Token: window.sessionStorage.getItem('token'), // token
  Refresh: true, // 刷新
  User: JSON.parse(window.sessionStorage.getItem('user')), // 用户信息 // json字符串转对象
  // User: { // 用户信息
  //   cache: '', // token时效
  //   cityCode: '', // 城市
  //   cityName: '',
  //   email: '', // 邮箱
  //   occupationCode: '', // 工作
  //   occupationName: '',
  //   password: '', // md5密码
  //   phone: '', // 手机
  //   provinceCode: '', // 省份
  //   provinceName: '',
  //   regionCode: '', // 区县
  //   regionName: '',
  //   sex: '', // 性别
  //   userId: '', // 用户id
  //   userName: '', // 用户名
  //   userPicUrl: '' // 头像链接
  // }
  ActiveClassId: 0 // 当前激活的卡片分类

}

export default state
