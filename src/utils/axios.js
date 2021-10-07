import axios from 'axios'
import qs from 'qs'
import {
  getToken,
  setToken,
  removeToken
} from './auth'
import {
  ElLoading,
  ElMessage
} from 'element-plus'
let loading, message
const httpService = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 3000
})
/** **** request拦截器==>对请求参数做处理 ******/
httpService.interceptors.request.use(
  config => {
    // 保证每次都是最新的实例，这样，不管你页面一次调多少个接口，都只有一个loading（单例）
    loading = ElLoading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })

    // eslint-disable-next-line no-debugger
    config.method === 'post' ?
      config.data = qs.stringify({
        ...config.data
      }) :
      config.params = {
        ...config.params,
        _t: new Date().getTime()
      }

    // 请求头携带token
    axios.defaults.headers['Content-Type'] = 'application/json';  
    //config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
   // config.headers['Authorization'] = getToken() | ''
    return config
  },
  error => {
    // 请求错误处理
    Promise.reject(error)
  }
)
/** **** respone拦截器==>对响应做处理 ******/
httpService.interceptors.response.use(
  response => { // 成功请求到数据
    // 统一处理状态
    loading.close()
    // 这里根据后端提供的数据进行对应的处理
    const res = response.data
    const code = res.code
    const errorMessage = res.msg == null ? '服务器出错，请重新尝试' : res.msg
    // eslint-disable-next-line no-unused-vars
    let errorTxt = ''

    switch (code) {
      case 10001:
        errorTxt = errorMessage
        break
      case 10002:
        errorTxt = errorMessage
        break
      case 20001:
        errorTxt = errorMessage
        break
      default:
        return response.data
    }
    ElMessage({
      message: errorTxt,
      type: 'warning'
    })
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      status: res.statuscode,
      message: res.message
    })
  },
  error => {
    if (error && error.response) {
      const text = JSON.parse(JSON.stringify(error)).response.status
      message = ElMessage.warning({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
      switch (text) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `未知错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error)
  }
)
export default httpService