<template>
  <div style="padding: 40px">
    <v-toolbar color="#EEEEEE" style="height:190px;padding:10px 10px;width: 90%">
      <v-container fluid grid-list-xl style="padding:15px;!important">
        <v-layout>
          <v-flex xs9 md4>
            <v-select label="城市" clearable :items="cityList" v-model="searchInfo.city"></v-select>
          </v-flex>
          <v-flex xs9 md4>
            <v-text-field
              label="请选择搜索内容"
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
          <el-tooltip class="item" effect="dark" content="查询" placement="top" style="float: right">
            <v-btn dark style="color:#ffffff" color="green" @click="gethotelinfo"><v-icon>search</v-icon></v-btn>
          </el-tooltip>
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
  </div>
</template>

<script>
import {HOTELINFO} from "../../api_1";
import axios from "axios";
import Hotel_table from "../../components/Hotel_table";

export default {
  name: "hotelInfo",
  components: {Hotel_table},
  data () {
    return {
      searchInfo: {
        city: ''
      },
      cityList: ['上海','云南'],
      tableHeader: [
        {prop: 'id', label: '酒店ID', minWidth: '140px'},
        {prop: 'hotelId', label: '酒店云ID', minWidth: '140px'},
        {prop: 'hotelNameCn', label: '酒店名称', minWidth: '280px'},
        {prop: 'phone', label: '酒店电话', minWidth: '280px'},
        {prop: 'addressCn', label: '酒店地址', minWidth: '280px'},
        {prop: 'operating',
          label: '操作',
          minWidth: '140px',
          fixed: 'right',
          oper: [
            // eslint-disable-next-line standard/object-curly-even-spacing
            { name: '房态', clickFun: this.handleClick, type: 'primary'},
            { name: '上下线', clickFun: this.handleClick, type: 'primary'},
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
    rowDblclick () {

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
      this.$fetch(HOTELINFO.QUERY.url,{page:current, page_size:pageSize }).then(res => {
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
</style>
