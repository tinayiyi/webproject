import axios from 'axios'

const serves = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求拦截
//  所有的网络请求都会先走这个方法，我们可以在他里面为请求添加一些自定义的内容
serves.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('X-token')
    if (token) {
      // 在发起请求前，给所有请求的头部添加token
      config.headers.common['X-token'] = token
    }
    return config
  },
  error => {
    // 对请求失败做处理
    return Promise.reject(error)
  }
)

//响应拦截
//  所有的网络请求返回数据之后都会先执行此方法
//      此处可以根据服务器的放回状态码做相应的数据
serves.interceptors.response.use(
  res => {
    // 对响应数据做处理
    if (res.data.code === 1001) {
      // 判断res.data.res_code 是否是401 如果是则跳转到登录，如果不是则正常返回
      this.$message.warning('身份过期请重新登录')
      this.$router.push('/login')
      // 删除token以及user
      window.sessionStorage.removeItem('X-token')
      return false
    }
    return res
  },
  error => {
    // 对响应错误做处理
    // 返回 response 里的错误信息
    // alert('身份验证过期，即将跳转到登陆页面')
    // window.location.href = '/'
    // window.sessionStorage.removeItem('X-token')
    return Promise.reject(error)
  }
)

const customRequest = params => {
  return serves(params)
}

export default customRequest
