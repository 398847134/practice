export const DEFAULT_URL = '/api'
export default {
  QUERY: {
    type: 'GET',
    describe: '分页查询多个酒店信息',
    url: DEFAULT_URL + '/hotel_info/'
  },
  UPDATE: {
    type: 'POST',
    describe: '修改酒店信息',
    url: DEFAULT_URL + '/hotel_info/'
  },
  QUERY_ROOM_BY_ID: {
    type: 'GET',
    describe: '根据酒店ID查询房型',
    url: DEFAULT_URL + '/room_type_info/'
  },
  QUERY_HOTELIMAGE_BY_ID: {
    type: 'GET',
    describe: '根据酒店ID查询酒店的图片',
    url: DEFAULT_URL + '/room_image_info/'
  },
  QUERY_RATEINFO: {
    type: 'GET',
    describe: '根据酒店ID查询房态',
    url: DEFAULT_URL + '/rate_type_info/'
  }
}
