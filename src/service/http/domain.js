/**
 ** 设置API接口域名
 **/
let domain = '';  // 测试接口域名
let apiQiniuyunUpload = '' // 七牛云上传域名
let qinniuyunImgDomain = '' // 七牛云图片访问域名

let HOST = process.env.HOST;

// const api_test = 'http://niukou.api.chengmikeji.com'
// const api_prod = 'http://niukou.api.chengmikeji.com'

// const api_test = 'http://niukou.webadmin.chengmikeji.com/api'
// const api_prod = 'http://niukou.webadmin.chengmikeji.com/api'
// 

// const api_test = 'http://www.forrily.com:8089/'



// 测试配置
if (process.env.NODE_ENV == 'development') {
	 domain = '/apis/admin'
	 apiQiniuyunUpload = 'http://upload.qiniup.com'
	 qinniuyunImgDomain = 'http://forrily.com/'
}
// 正式配置
if (process.env.NODE_ENV === 'production') {
	// domain = 'http://www.luckyagr.com:8089/admin'
	domain = '/apis/admin'
	apiQiniuyunUpload = 'http://up-z2.qiniup.com'
	qinniuyunImgDomain = 'http://pic.luckyagr.com'
}

console.log(apiQiniuyunUpload)
export  {
	domain,
	apiQiniuyunUpload,
	qinniuyunImgDomain
}
