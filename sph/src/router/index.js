import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// 重写构造函数VueRouter原型对象上的push方法，解决参数相同时重复点击跳转导致的控制台警告
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
// 重写vueRouter原型上的replace方法，解决参数相同时重复点击跳转导致的控制台警告
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      meta: { show: true }
    },
    {
      name: 'search',
      path: "/search/:keyword?",
      //占位后面加？，代表params参数可传可不传
      component: Search,
      meta: { show: true },
      // props: ($route) => {
      //   return { keyword: $route.params.keyword, k: $route.query.k }
      // }
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false }
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false }
    },
    {
      path: "/",
      redirect: '/home'
    }
  ]
})