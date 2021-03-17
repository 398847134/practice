export const DEFAULT_URL = '/api'
export default {
  QUERY: {
    type: 'GET',
    describe: '分页查询多个酒店信息',
    url: DEFAULT_URL + '/city_info/'
  },
  UPDATE: {
    type: 'POST',
    describe: '修改酒店信息',
    url: DEFAULT_URL + '/city_info/'
  }
}
