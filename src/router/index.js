import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('@/views/Common/main')
const Login = () => import('@/views/Common/login')
const notFound = () => import('@/views/Common/notFound')
const home_index = () => import('@/views/Home/index')

// 客户管理
const clientManage = () => import('@/views/clientManage/clientList')

//产品管理
const classifyList = () => import('@/views/productManage/classifyList')
const goodsManage = () => import('@/views/productManage/goodsManage')

//文章管理


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
          path: '/clientManage',
          name: '客户列表',
          component: clientManage,
        },
      ]
    },
    {
      path: '/',
      name: '产品管理',
      component: Main,
      iconCls: 'fa fa-gamepad',
      children: [
        {
          path: '/classifyList',
          name: '分类管理',
          component: classifyList,
        },
        {
          path: '/goodsManage',
          name: '商品管理',
          component: goodsManage,
        },
      ]
    },
  ]
})

vueRouter.beforeEach((to, from, next) => {
  next()
})

export default vueRouter
