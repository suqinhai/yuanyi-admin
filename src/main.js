	// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './service/http/axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import { domain, apiQiniuyunUpload,qinniuyunImgDomain } from './service/http/domain'
import 'element-ui/lib/theme-chalk/index.css'
import './filter'

Vue.prototype.$axios = api
Vue.prototype.domain = domain
Vue.prototype.apiQiniuyunUpload = apiQiniuyunUpload
Vue.prototype.qinniuyunImgDomain = qinniuyunImgDomain


Vue.config.productionTip = false
Vue.prototype.goback = function (){
  history.back(-1)
}
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
