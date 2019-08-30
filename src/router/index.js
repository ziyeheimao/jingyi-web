import Vue from 'vue'
import store from '@store/index.js'

import Router from 'vue-router'

// 路由懒加载
// 入口(登陆、注册、改密码)
const Inlet = resolve => {
  require.ensure(['@components/Inlet/Inlet.vue'], () => {
    resolve(require('@components/Inlet/Inlet.vue'))
  })
}

// 首页
const Index = resolve => {
  require.ensure(['@components/Index/Index.vue'], () => {
    resolve(require('@components/Index/Index.vue'))
  })
}

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/inlet',
      name: 'Inlet',
      component: Inlet
    }
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  let token = store.state.Token
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/inlet',
        query: { redirect: to.fullPath } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
