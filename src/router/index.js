import Vue from "vue";
import Router from "vue-router";

const Main = () => import("@/views/Common/main");
const Login = () => import("@/views/Common/login");
const modifePassword = () => import("@/views/Common/modifePassword");
const notFound = () => import("@/views/Common/notFound");
const home_index = () => import("@/views/Home/index");

// 客户管理
const clientManage = () => import("@/views/clientManage/clientList");

//产品管理
const classifyList = () => import("@/views/productManage/classifyList");
const lowerClassifyList = () => import("@/views/productManage/lowerClassifyList");
const goodsManage = () => import("@/views/productManage/goodsManage");
const addGoods = () => import("@/views/productManage/addGoods");

//文章管理
const articleClassifyList = () => import("@/views/articleManage/articleClassifyList");
const articleLowerClassifyList = () => import("@/views/articleManage/articleLowerClassifyList");
const articleList = () => import("@/views/articleManage/articleList");
const addArticle = () => import("@/views/articleManage/addAritcle");

//广告管理
const advList = () => import("@/views/advManage/advList");
const addAdv = () => import("@/views/advManage/addAdv");

//系统设置
const set = () => import("@/views/systemManage/set");

//企业合作伙伴
const businessPartnersList = () => import("@/views/businessPartners/BusinessPartnersList");
const addBusinessPartner = () => import("@/views/businessPartners/addBusinessPartner");
const editBusinessPartner = () => import("@/views/businessPartners/editBusinessPartner");

Vue.use(Router);

const vueRouter = new Router({
  mode: "history",
  routes: [{
    path: "/Y2019moc.rgaykcul/login",
    name: "Login",
    component: Login,
    hidden: true
  },

    {
      path: "/Y2019moc.rgaykcul",
      name: "客户管理",
      component: Main,
      iconCls: "fa fa-gamepad",
      children: [{
        path: "/Y2019moc.rgaykcul",
        name: "客户列表",
        component: clientManage
      }, {
        path: "/Y2019moc.rgaykcul/clientManage",
        name: "客户列表",
        component: clientManage,
        hidden: true
      }, {
        path: "/Y2019moc.rgaykcul/modifePassword",
        name: "修改密码",
        component: modifePassword,
        hidden: true
      }]
    },
    {
      path: "/Y2019moc.rgaykcul",
      name: "产品管理",
      component: Main,
      iconCls: "fa fa-gamepad",
      children: [{
        path: "/Y2019moc.rgaykcul/classifyList",
        name: "分类管理",
        component: classifyList
      },
        {
          path: "/Y2019moc.rgaykcul/lowerClassifyList",
          name: "下级分类",
          component: lowerClassifyList,
          hidden: true
        },
        {
          path: "/Y2019moc.rgaykcul/goodsManage",
          name: "商品管理",
          component: goodsManage
        },
        {
          path: "/Y2019moc.rgaykcul/addGoods",
          name: "新增商品",
          component: addGoods,
          hidden: true
        }
      ]
    },
    {
      path: "/Y2019moc.rgaykcul",
      name: "文章管理",
      component: Main,
      iconCls: "fa fa-gamepad",
      children: [{
        path: "/Y2019moc.rgaykcul/articleClassifyList",
        name: "文章分类",
        component: articleClassifyList
      },
        {
          path: "/Y2019moc.rgaykcul/articleLowerClassifyList",
          name: "文章下级分类",
          component: articleLowerClassifyList,
          hidden: true
        },
        {
          path: "/Y2019moc.rgaykcul/articleList",
          name: "文章列表",
          component: articleList
        },
        {
          path: "/Y2019moc.rgaykcul/addArticle",
          name: "文章内容管理",
          component: addArticle,
          hidden: true
        }
      ]
    },
    {
      path: "/Y2019moc.rgaykcul",
      name: "广告管理",
      component: Main,
      iconCls: "fa fa-gamepad",
      children: [{
        path: "/Y2019moc.rgaykcul/advList",
        name: "广告列表",
        component: advList
      },
        {
          path: "/Y2019moc.rgaykcul/addAdv",
          name: "新增广告",
          component: addAdv,
          hidden: true
        }
      ]
    },
    {
      path: "/Y2019moc.rgaykcul",
      name: "系统设置",
      component: Main,
      iconCls: "fa fa-gamepad",
      children: [{
        path: "/Y2019moc.rgaykcul/set",
        name: "网站设置",
        component: set
      }, {
        path: "/Y2019moc.rgaykcul/businessParterList",
        name: "商业合作伙伴",
        component: businessPartnersList
      }, {
        path: "/Y2019moc.rgaykcul/businessAddParter",
        name: "新增合作商",
        component: addBusinessPartner,
        hidden: true
      }, {
        path: "/Y2019moc.rgaykcul/businessEditPartner",
        name: "编辑合作商",
        component: editBusinessPartner,
        hidden: true
      }
      ]
    },
    {
      path: "/Y2019moc.rgaykcul",
      name: "",
      component: Main,
      iconCls: "fa fa-gamepad",
      hidden: true,
      children: [{
        path: "/Y2019moc.rgaykcul/notFound",
        name: "notFound",
        component: notFound
      }]
    }
  ]
});

vueRouter.beforeEach((to, from, next) => {
  next();
});

export default vueRouter;
