export const DEFAULT_URL = '/api'
export default {
  QUERY: {
    type: 'GET',
    describe: '分页查询多个酒店信息',
    url: DEFAULT_URL + '/hotel_info/'
  },
  UPDATE_LINE: {
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
    describe: '根据房型查询房间信息',
    url: DEFAULT_URL + '/rateplan_info/'
  },
  QUERY_BOOKINGRULE_BY_ROOMTYPE: {
    type: 'GET',
    describe: '根据房型查询房间预定条款',
    url: DEFAULT_URL + '/hotel_bookingrule_info/'
  },
  QUERY_REFUNDRULE_BY_ROOMTYPE: {
    type: 'GET',
    describe: '根据房型查询房间取消预订条款',
    url: DEFAULT_URL + '/hotel_refundrule_info/'
  },
  QUERY_PROMOTION_BY_ROOMTYPE: {
    type: 'GET',
    describe: '根据房型查询房间礼包信息',
    url: DEFAULT_URL + '/hotel_promotion_info/'
  },
  QUERY_NIGHTLYRATE_BY_ROOMTYPE: {
    type: 'GET',
    describe: '根据房型查询房间夜间变动',
    url: DEFAULT_URL + '/hotel_nightlyrate_info/'
  },

}
