import httpService from './axios'
import axios from 'axios'
/**
 * @description: GET请求方法
 * @param {
 *  url 请求路径
 *  params 请求参数
 * }
 * @return: Promise
 */

export const _httpGet = ({
  url,
  params = {}
}) => {
  return httpService({
    url,
    method: 'GET',
    params
  })
}
/**
 * @description: POST请求方法
 * @param {
 * url 请求路径
 * data 请求参数
 * }
 * @return: Promis
 */
export const _httpPost = ({
  url,
  data
}) => {
  return httpService({
    url,
    method: 'POST',
    data
  })
}
/**
 * @description: RESTful请求方法
 * @param {
 * url 请求路径
 * method 请求方式
 * }
 * @return: Promise
 */
export const _httpRest = ({
  url,
  method
}) => {
  return httpService({
    url,
    method
  })
}

const base = import.meta.env.VITE_BASE_API
export function download(url,parms) {
  // 要发送到后台的数据
  return axios({ 
    method: 'get',
    url: `${base}`+url, // 请求地址
    data: parms, // 参数
    responseType: 'blob' ,//  表明返回服务器返回的数据类型  这里注意要加上responseType
    headers:{
      'Content-Type':'multipart/form-data'
    }
  }).then((res) => { // 处理返回的文件流
      // 注意 返回的res 无需做任何处理，有时在用框架封装的请求之后会出现返回response.text() 等情况导致文件流下载失败。
      const blob = new Blob([res.data])
      const fileName = 'down.xls'
      const alink = document.createElement('a')
      alink.download = fileName
      alink.style.display = 'none'
      alink.href = URL.createObjectURL(blob)   // 这里是将文件流转化为一个文件地址
      document.body.appendChild(alink)
      alink.click()
      URL.revokeObjectURL(alink.href) // 释放URL 对象
      document.body.removeChild(alink)
  })
}