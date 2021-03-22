<template xmlns:el-col="http://www.w3.org/1999/html">
  <div style="padding: 40px">
    <v-toolbar color="#EEEEEE" style="height:110px;padding:10px 10px;width: 90%">
      <v-container fluid grid-list-xl style="padding:15px;!important">
        <v-layout>
          <v-flex xs9 md4>
            <v-text-field
              label="请输入搜索酒店名称"
              v-model="searchName"
              hide-details
              append-icon="search"
              style="padding: 10px"
              @click:append="search(20,1)"
              @keyup.enter.native="search(20,1)"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout style="float: right;margin-bottom: 10px;margin-top: -15px">

        </v-layout>
      </v-container>
    </v-toolbar>
    <v-card hover style="padding:40px;width: 90%">
      <Hotel_table
        :tableData="tableData"
        :rowDblclick="rowDblclick"
        ref="htable"
        :tableHeader="tableHeader"
        :total="total"
        :pageSize="pageSize"
        :currentPage="currentPage"
        :getRowKeys="getRowKeys"
        :tableSelectAll="tableSelectAll"
        :selectionChange="handleSelectionChange"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      >
      </Hotel_table>
    </v-card>
    <el-dialog title="酒店详情" :visible.sync="dialogTableVisible" style="width: 100%;" @closed="clearDialog">
      <el-row :gutter="24">
        <el-col :span="14" style="text-align: left;font-size: 20px">
          <label class="labels">酒店名称：  </label>
          <span v-text="details.hotelName"></span>
          <br/>
          <label class="labels">酒店联系方式：  </label>
          <span v-text="details.phone"></span>
          <br/>
          <label class="labels">酒店地址：  </label>
          <span v-text="details.hotelAddr"></span>
          <br/>
          <label class="labels">酒店星级：  </label>
          <span v-text="details.star"></span>
          <br/>
          <label class="labels">酒店简介：  </label>
          <span v-text="details.introduceCn"></span>
        </el-col>
        <el-col :span="10">
          <el-image
          style="width: 100%; height: 100%"
          :src="hotelImg">
        </el-image>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 20px">
        <el-col :span="12">
          <el-select v-model="details.roomType" placeholder="房型" @change="roomTypechange">
            <el-option v-for="(item, index) in this.roomType" :key="index" :label="item.roomTypeCn" :value="item.roomTypeCn"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="checkroom">查看房态</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 20px;font-size: 30px;line-height: 50px">
        <el-col :span="12">
          <label class="labels">床型：  </label>
          <span v-text="details.bed"></span>
        </el-col>
        <el-col :span="12">
          <label class="labels">是否含早餐：  </label>
          <span v-text="details.breakfast"></span>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 30px">
        <el-col :span="12">
          <el-button type="primary" @click="orderInfo('预订条款信息')">预订条款信息</el-button>
          <el-button type="primary" @click="orderInfo('取消条款信息')">取消条款信息</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="orderInfo('礼包信息')">礼包信息</el-button>
          <el-button type="primary" @click="orderInfo('夜间数据')">夜间数据</el-button>
          <el-button type="primary" v-if="this.details.is_effective === 0" @click="line">上线</el-button>
          <el-button type="primary" v-if="this.details.is_effective === 1" @click="line">下线</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :title="diaTitle" :visible.sync="dialogTableVisibleOder" style="width: 100%;" @closed="this.diaTitle = ''">
      <order v-if="this.diaTitle ==='预订条款信息'" :channel="details.channel" :hotelId="details.id" :bookingRuleId="bookingRuleId"></order>
      <refund v-if="this.diaTitle === '取消条款信息'" :channel="details.channel" :hotelId="details.id" :bookingRuleId="bookingRuleId"></refund>
      <promotion v-if="this.diaTitle === '礼包信息'" :channel="details.channel" :hotelId="details.id" :bookingRuleId="bookingRuleId"></promotion>
      <nightlyrate v-if="this.diaTitle === '夜间数据'" :keyId="details.keyId"></nightlyrate>
    </el-dialog>
  </div>
</template>

<script>
import {HOTELINFO} from "../../api_1";
import Hotel_table from "../../components/Hotel_table";
import Order from "./components/order";
import Refund from "./components/refund";
import Promotion from "./components/promotion";
import Nightlyrate from "./components/nightlyrate";

export default {
  name: "hotelInfo",
  components: {Nightlyrate, Promotion, Refund, Order, Hotel_table},
  data () {
    return {
      bookingRuleId: '',
      diaTitle: '',
      dialogTableVisibleOder: false,
      details: {
        id: '',           // 酒店ID
        channel: '',      // 渠道
        hotelName: '',    // 酒店中文名
        hotelAddr: '',    // 酒店地址
        phone: '',        // 酒店联系方式
        star: '',         // 酒店星级
        introduceCn: '',  // 酒店中文介绍
        roomType: '',     // 房间类型
        bed: '',          // 床型
        breakfast: '',    // 是否含早餐
        keyId: ''         // 夜间费率
      },
      roomType: [],
      dialogTableVisible: false,
      hotelImg: '',
      imgFit: 'fill',
      searchInfo: {
        city: ''
      },
      cityList: ['上海','云南'],
      tableHeader: [
        {prop: 'id', label: '酒店ID', minWidth: '100px'},
        {prop: 'hotelId', label: '酒店云ID', minWidth: '120px'},
        {prop: 'hotelNameCn', label: '酒店名称', minWidth: '280px'},
        {prop: 'phone', label: '酒店电话', minWidth: '220px'},
        {prop: 'addressCn', label: '酒店地址', minWidth: '280px'},
        {prop: 'operating',
          label: '操作',
          minWidth: '100px',
          fixed: 'right',
          oper: [
            // eslint-disable-next-line standard/object-curly-even-spacing
            { name: '酒店详情', clickFun: this.getInfoById, type: 'primary'},
          ]
        }
      ],
      currentPage: 1,
      pageSize: 20,
      ids: [],
      total: 3,
      searchName: '',
      tableData: []
    }
  },
  methods: {
    line () {
      console.log(this.details.is_effective)
      // this.$post(HOTELINFO.QUERY_ROOM_BY_ID.url,{hotel: row.id}).then(res => {
      //   console.log(res)
      // }).catch(() => {
      //   this.$message({
      //     type: 'error',
      //     message: '更新失败'
      //   })
      // })
    },
    orderInfo (type) {
      if (this.details.roomType === '') {
        this.$message.warning('请选择一个房型')
      } else {
        this.diaTitle = type
        this.dialogTableVisibleOder = true
      }
    },
    clearDialog () {
      this.details = {
        id: '',
        hotelName: '',
        hotelAddr: '',
        phone: '',
        star: '',
        introduceCn: '',
        is_effective: '',
        roomType: '',
        bed: '',
        breakfast: '',
        channel: '',
        keyId: '',
      }
    },
    roomTypechange (value) {
      for (let i in this.roomType) {
        if (value === this.roomType[i].basisroomCn){
          this.details.bed = this.roomType[i].bedName
          this.$fetch(HOTELINFO.QUERY_RATEINFO.url,{keyName: this.roomType[i].basisroomCn}).then(res => {
            if (res.results[0].breakfast === 0){
              this.details.breakfast = '无早餐'
            }else if (res.results[0].breakfast === 1) {
              this.details.breakfast = '一份早餐'
            }else if (res.results[0].breakfast === 2) {
              this.details.breakfast = '两份早餐'
            }else if (res.results[0].breakfast === 99) {
              this.details.breakfast = '按床位早餐'
            }else if (res.results[0].breakfast === -1) {
              this.details.breakfast = '带早（不定份数）'
            }
            this.details.keyId = res.results[0].keyId
            this.bookingRuleId = res.results[0].bookingRuleId
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '未找到房间信息'
            })
          })
        }
      }
    },
    checkroom () {

    },
    getInfoById (row) {
      this.rowDblclick(row)
    },
    rowDblclick (row) {
      this.hotelImg = ''
      this.dialogTableVisible = true
      this.details.hotelName = row.hotelNameCn
      this.details.hotelAddr = row.addressCn
      this.details.phone = row.phone
      this.details.star = row.star
      this.details.id = row.hotelId
      this.details.channel = row.channel
      this.details.is_effective = row.is_effective
      this.details.introduceCn = row.introduceCn
      this.$fetch(HOTELINFO.QUERY_HOTELIMAGE_BY_ID.url,{hotel: row.id}).then(res => {
        this.hotelImg = res.results[0].imageUrl
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '未找到酒店图片'
        })
      })
      this.getroomtypebyid(row)
    },
    getroomtypebyid (row) {
      this.$fetch(HOTELINFO.QUERY_ROOM_BY_ID.url,{hotel: row.id}).then(res => {
        this.roomType = res.results
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '未找到酒店房型'
        })
      })
    },
    getRowKeys (row) {
      return row.id
    },
    tableSelectAll (selection) {

    },
    handleSelectionChange (row) {
      this.ids = row
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.gethotelinfo(1,size)
    },
    handleCurrentChange (current) {
      this.currentPage = current
      this.gethotelinfo(current,this.pageSize)
    },
    search (size, page) {

    },
    gethotelinfo (current, pageSize) {
      this.$fetch(HOTELINFO.QUERY.url,{page:current, page_size:pageSize, }).then(res => {
        this.tableData = res.results
        this.total = res.count
        this.currentPage = current
        this.pageSize = pageSize
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '请求失败'
        })
      })
    },
    handleClick (row) {
      console.log(row)
    },
  },
  mounted() {
    this.gethotelinfo(1,20)
  }
}
</script>

<style>
.el-pagination__editor.el-input{
  width: 100px;
}
.el-dialog{
  border-radius: 30px;
}
</style>
