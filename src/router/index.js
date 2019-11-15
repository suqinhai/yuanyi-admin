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
const lowerClassifyList = () => import('@/views/productManage/lowerClassifyList')
const goodsManage = () => import('@/views/productManage/goodsManage')
const addGoods = () => import('@/views/productManage/addGoods')


//文章管理
const articleClassifyList = () => import('@/views/articleManage/articleClassifyList')
const articleLowerClassifyList = () => import('@/views/articleManage/articleLowerClassifyList')
const articleList = () => import('@/views/articleManage/articleList')

//广告管理
const advList = () => import('@/views/advManage/advList')
const addAdv = () => import('@/views/advManage/addAdv')

//系统设置
const set = () => import('@/views/systemManage/set')

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
      children: [{
        path: '/clientManage',
        name: '客户列表',
        component: clientManage,
      }, ]
    },
    {
      path: '/',
      name: '产品管理',
      component: Main,
      iconCls: 'fa fa-gamepad',
      children: [{
          path: '/classifyList',
          name: '分类管理',
          component: classifyList,
        },
        {
          path: '/lowerClassifyList',
          name: '下级分类',
          component: lowerClassifyList,
          hidden: true
        },
        {
          path: '/goodsManage',
          name: '商品管理',
          component: goodsManage,
        },
        {
          path: '/addGoods',
          name: '新增商品',
          component: addGoods,
          hidden: true
        },
      ]
    },
    {
      path: '/',
      name: '文章管理',
      component: Main,
      iconCls: 'fa fa-gamepad',
      children: [{
          path: '/articleClassifyList',
          name: '文章分类',
          component: articleClassifyList,
        },
        {
          path: '/articleLowerClassifyList',
          name: '文章下级分类',
          component: articleLowerClassifyList,
          hidden: true
        },
        {
          path: '/articleList',
          name: '文章列表',
          component: articleList,
        },
      ]
    },
    {
      path: '/',
      name: '广告管理',
      component: Main,
      iconCls: 'fa fa-gamepad',
      children: [{
          path: '/advList',
          name: '广告列表',
          component: advList,
        },
        {
          path: '/addAdv',
          name: '新增广告',
          component: addAdv,
          hidden: true
        },
      ]
    },
    {
      path: '/',
      name: '系统设置',
      component: Main,
      iconCls: 'fa fa-gamepad',
      children: [{
        path: '/set',
        name: '网站设置',
        component: set,
      }, ]
    },
  ]
})

vueRouter.beforeEach((to, from, next) => {
  next()
})

export default vueRouter
