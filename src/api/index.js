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
  }
}
