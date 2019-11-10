import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('@/views/Common/main')
const Login = () => import('@/views/Common/login')
const notFound = () => import('@/views/Common/notFound')
const home_index = () => import('@/views/Home/index')


Vue.use(Router)

const vueRouter = new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      name: '客户管理',
      component: Main,
      iconCls: 'fa fa-gamepad',
      children: [
        {
          path: '/home_index',
          name: '客户列表',
          component: home_index,
        },
      ]
    },
  ]
})

vueRouter.beforeEach((to, from, next) => {
  next()
})

export default vueRouter
