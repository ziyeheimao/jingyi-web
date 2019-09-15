import axios from '../axios'

export default {
  // 用户登录
  login (data) {
    return axios.post('/user/login', data)
  },

  // 检测 昵称 手机 邮箱 是否注册
  checkUserNamePhoneEmail (data, code = 0) {
    if (code === 0) {
      return axios.get(`/user/checkUserNamePhoneEmail?field=${data.field}`) // 注册时不带userId
    } else if (code === 1) {
      return axios.get(`/user/checkUserNamePhoneEmail?field=${data.field}&userId=${data.userId}`) // 修改时带userId排除自身
    }
  },

  // 注册
  register (data) {
    return axios.post(`/user/register`, data)
  },

  // 获取验证码
  verificationCode (field) {
    return axios.get(`/user/verificationCode?field=${field}`)
  },

  // 修改密码
  forgetPassword (data) {
    return axios.put(`/user/forgetPassword`, data)
  },

  // -------------------------------------------------class-----------------------------------------------------

  // 添加分类
  classAdd (data) {
    return axios.post(`/ctn/class/add`, data)
  },

  // 删除分类
  classDel (classId) {
    return axios.delete(`/ctn/class/del?classId=${classId}`)
  },

  // 修改分类
  classUpdata (data) {
    return axios.put(`/ctn/class/updata`, data)
  },

  // 获取分类
  classGet () {
    return axios.get(`/ctn/class/get`)
  },

  // 拖拽换位
  classExchange (data) {
    return axios.put(`/ctn/class/exchange`, data)
  }
  // -------------------------------------------------class-----------------------------------------------------

}
