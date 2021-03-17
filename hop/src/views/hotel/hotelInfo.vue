<template>
  <div style="padding: 40px">
    <v-toolbar color="#EEEEEE" style="height:90px;padding:10px 10px;width: 90%">
      <el-row :gutter="20"  class="el-row" type="flex">
        <el-col :span="12"><v-text-field
          label="请选择搜索内容"
          v-model="searchName"
          hide-details
          append-icon="search"
          style="padding: 10px"
          @click:append="search(20,1)"
          @keyup.enter.native="search(20,1)"
        ></v-text-field></el-col>
        <el-col :span="12">
          <v-text-field
          label="请选择搜索内容"
          v-model="searchName"
          hide-details
          append-icon="search"
          style="padding: 10px"
          @click:append="search(20,1)"
          @keyup.enter.native="search(20,1)"
        ></v-text-field>
        </el-col>
      </el-row>
      <el-row :gutter="20"  class="el-row" type="flex">
        <el-tooltip class="item" effect="dark" content="查询" placement="top">
          <v-btn dark style="color:#ffffff" color="green" @click="gethotelinfo"><v-icon>search</v-icon></v-btn>
        </el-tooltip>
      </el-row>
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
      tableHeader: [
        {prop: 'id', label: '酒店ID', minWidth: '140px'},
        {prop: 'hotelId', label: '酒店云ID', minWidth: '140px'},
        {prop: 'hotelNameCn', label: '酒店名称', minWidth: '280px'},
        {prop: 'addressCn', label: '酒店地址', minWidth: '280px'},
        {prop: 'operating',
          label: '操作',
          minWidth: '140px',
          fixed: 'right',
          oper: [
            // eslint-disable-next-line standard/object-curly-even-spacing
            { name: '显示详情', clickFun: this.handleClick, type: 'primary', icon: 'el-icon-menu'}
          ]
        }
      ],
      currentPage: 1,
      pageSize: 20,
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
    this.gethotelinfo()
  }
}
</script>

<style>
.el-pagination__editor.el-input{
  width: 100px;
}
</style>
