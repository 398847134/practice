import axios from 'axios'

const baseIPs = {
  ROOT: '/',
  base: '192.168.0.224'
}
const baseurl = this.baseIPs.ROOT

// 请求方法
export function fetch (url, param) {
  return new Promise((resolve, reject) => {
    if (param === undefined) {
      param = { id: window.localStorage.getItem('userid') }
    } else {
      param['id'] = window.localStorage.getItem('userid')
    }
    axios.get(url, {
      params: param
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
