import axios from 'axios'

const baseIPs = {
  ROOT: '/',
  base: '192.168.0.224',
  hotelTest:  'http://www.smono.cn',
  test: 'http://47.115.28.49:8001'
}
export const baseurl = baseIPs.hotelTest

// axios配置
axios.defaults.timeout = 3000000
axios.defaults.baseURL = baseurl
axios.defaults.withCredentials = false

// 请求方法
export function fetch (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param,
      headers: {
        accept: 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// post方法
export function post (url, param) {
  return new Promise((resolve, reject) => {
    axios.post(url, {
      params: param,
      headers: {
        accept: 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
