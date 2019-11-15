

/**
** 设置API接口域名
**/
let apiUrl = '';
let HOST = process.env.HOST;

// const api_test = 'http://niukou.api.chengmikeji.com'
// const api_prod = 'http://niukou.api.chengmikeji.com'

// const api_test = 'http://niukou.webadmin.chengmikeji.com/api'
// const api_prod = 'http://niukou.webadmin.chengmikeji.com/api'
// 

// const api_test = 'http://www.forrily.com:8089/'
const api_test = '/apis/admin/'
const api_prod = '/apis/admin/'
if ( HOST == 'test' ){
	apiUrl = api_test
}else if ( HOST == 'prod' ){
	apiUrl = api_prod
}else{
	apiUrl = api_test
}

export default apiUrl