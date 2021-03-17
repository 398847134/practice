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
          <v-btn dark style="color:#ffffff" color="green" @click="getCityInfo(1,20)"><v-icon>search</v-icon></v-btn>
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
import Hotel_table from "../../components/Hotel_table";
import {CITYINFO} from "../../api_1";
export default {
  name: "cityinfo",
  components: {Hotel_table},
  data () {
    return{
      searchName: '',
      currentPage: 1,
      tableData: [],
      tableHeader: [
        {prop: 'id', label: '城市ID', minWidth: '140px'},
        {prop: 'countryId', label: '城市云ID', minWidth: '140px'},
        {prop: 'countryCn', label: '国家', minWidth: '140px'},
        {prop: 'cityCn', label: '城市', minWidth: '140px'},
        {prop: 'stateCn', label: '省份', minWidth: '140px'},
      ],
      total: 1,
      pageSize: 20,
    }
  },
  mounted() {
    this.getCityInfo(1,20)
  },
  methods : {
    getCityInfo (current, pageSize) {
      this.$fetch(CITYINFO.QUERY.url,{page:current, page_size:pageSize }).then(res => {
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
      this.getCityInfo(1,size)
    },
    handleCurrentChange (current) {
      this.currentPage = current
      this.getCityInfo(current,this.pageSize)
    },
  }
}
</script>

<style scoped>

</style>
