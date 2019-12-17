import Vue from 'vue'
import { Message } from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import router from '../../router/index.js'
import {domain} from './domain.js'
let axiosIns = axios.create({});

axiosIns.defaults.baseURL = domain
// axiosIns.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 添加请求拦截器
axiosIns.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // let contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
  //  console.log(config.headers['Content-Type'])
  // if(config.headers['Content-Type']) {
  let contentType = 'application/json'
  // }
  config.headers['Content-Type'] = contentType
  // config.headers['Content-Type'] =
  let token = window.localStorage.getItem('token')
  // 把token放到参数里面
  // if (token && config.params) {
  //   config.params.token = token
  // } else {
  //   config.params = { 'token': token }
  // }
  // 把token放到header里面
  if (token) {
    config.headers['f-token'] = token
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  console.log('错误的传参')
  return Promise.reject(error)
})

axiosIns.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data) {
    return Promise.reject(res)
  }
  return res
}, (error) => {
  return Promise.reject(error)
})
const ajaxMethod = ['get', 'post']
const api = {}
ajaxMethod.forEach((method) => {
  api['baseURL'] = axiosIns.defaults.baseURL
  api[method] = function(uri, data, config) {
    return new Promise(function(resolve, reject) {
      axiosIns[method](uri, data, config).then((response) => {
        if (response.data.code == -1006 || response.data.code == -1005 ) {
          window.localStorage.removeItem('token');
          router.replace('/login')
          return false
        }
        if (response.data.code != 0) {
          Message.error(response.data.msg)
          return false
        }
        resolve(response.data)
      }).catch(function(error) {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log(error)
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    })
  }
})

export default api
