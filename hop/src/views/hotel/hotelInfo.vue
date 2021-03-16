<template>
  <div style="padding: 40px">
    <v-toolbar color="#EEEEEE" style="height:190px;padding:10px 10px;width: 90%">
      <v-layout style="width: 50px">
        <v-text-field
          label="请选择搜索内容"
          v-model="searchName"
          hide-details
          append-icon="search"
          style="width:15px;padding: 10px"
          @click:append="search(20,1)"
          @keyup.enter.native="search(20,1)"
        ></v-text-field>
        <v-text-field
          label="请选择搜索内容"
          v-model="searchName"
          hide-details
          append-icon="search"
          style="width:15px;padding: 10px"
          @click:append="search(20,1)"
          @keyup.enter.native="search(20,1)"
        ></v-text-field>
      </v-layout>
        <el-tooltip class="item" effect="dark" content="数据请求测试" placement="top">
          <v-btn  color="green" dark @click="test"><v-icon>add</v-icon></v-btn>
        </el-tooltip>
    </v-toolbar>
    <v-card hover style="padding:40px;width: 90%">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @cell-mouse-enter="hoverenter"
          @cell-mouse-leave="hoverleave"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" align="center" ref="div">
        <el-pagination
          style="margin-top:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, slot, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import {HOTELINFO} from "../../api_1";

export default {
  name: "hotelInfo",
  data () {
    return {
      pageSize: 20,
      total: 3,
      searchName: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handleCurrentChange () {

    },
    handleSizeChange () {

    },
    search (size, page) {

    },
    handleSelectionChange (row) {

    },
    test () {
      this.$fetch(HOTELINFO.QUERY.url,{page: 1}).then(res => {
        console.log(res)
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '请求失败'
        })
      })
    },
    gethotelcity (page,size) {

    },
    handleClick (row) {
      console.log(row)
    },
    hoverenter (row, column, cell, event) {
      let v = cell.firstElementChild.firstElementChild
      if(!v){
        cell.parentElement.style.transform = 'translate(-5px,-5px)'
        cell.parentElement.style.boxShadow = 'slategrey 3px 3px 3px'
        cell.parentElement.style.transition = '300ms all'
      }else {
        if(cell === cell.parentElement.firstElementChild|| cell === cell.parentElement.lastElementChild){

        }else{
          cell.parentElement.style.transform = 'translate(-5px,-5px)'
          cell.parentElement.style.boxShadow = 'slategrey 3px 3px 3px'
          cell.parentElement.style.transition = '300ms all'
        }
      }
    },
    hoverleave (row, column, cell, event) {
      cell.parentElement.style.transform = 'translate(0,0)'
      cell.parentElement.style.boxShadow = 'slategrey 0px 0px 0px'
      cell.parentElement.style.transition = '300ms all'
    },
  }
}
</script>

<style scoped>

</style>
