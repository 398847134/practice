<template>
  <div>
    <el-table :data="tableData" highlight-current-row
              :row-style="rowStyle"
              class="hElTable"
              @row-dblclick="rowDblclick"
              @select="tableSelect"
              @select-all="tableSelectAll"
              @selection-change="selectionChange"
              :row-key="getRowKeys"
              :header-cell-style="headStyle"
              :cell-style="cellStyle"
              :select="select"
              :cell-class-name="cellClassName"
              :border="border"
              :fit="fit"
              ref="htable"
              stript="true"
              v-loading="loading"
              element-loading-text="努力加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.3)"
              :max-height="maxHeight"
              @cell-mouse-enter="hoverenter"
              @cell-mouse-leave="hoverleave">
      <el-table-column type="index" align="center" fixed></el-table-column>
      <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
           oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 -->
      <el-table-column v-for="(th, key) in tableHeader"
                       :key="key"
                       :prop="th.prop"
                       :label="th.label"
                       :fixed="th.fixed"
                       :min-width="th.minWidth" align="center">
        <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，不过我这里操作一栏的名字定死了（oper表示是操作这一列，否则就不是） -->
        <template slot-scope="scope">
          <div v-if="th.oper">
            <el-button v-for="(o, key) in th.oper" :key="key" @click="o.clickFun(scope.row)" type="text" size="small">{{o.name}}</el-button>
          </div>
          <div v-else>
            <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
            <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="ifPagination" align="center">
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20,50,100,200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotel_table",
  data () {
    return {
      radio: '',
      templateSelection: '',
      newPageSize: this.pageSize,
      newCurrentPage: this.currentPage,
      newTotal: this.total,
      showOverflow: true
    }
  },
  props: {
    hoverenter:{
      type:Function,
      default: (row, column, cell, event) => {
        let v = cell.firstElementChild.firstElementChild
        if(!v){
          cell.parentElement.style.transform = 'translate(-5px,-5px)'
          cell.parentElement.style.boxShadow = 'slategrey 3px 3px 3px'
          cell.parentElement.style.transition = '300ms all'
        }else {
          if(cell == cell.parentElement.firstElementChild|| cell == cell.parentElement.lastElementChild){

          }else{
            cell.parentElement.style.transform = 'translate(-5px,-5px)'
            cell.parentElement.style.boxShadow = 'slategrey 3px 3px 3px'
            cell.parentElement.style.transition = '300ms all'
          }
        }
      }
    },
    hoverleave:{
      type:Function,
      default: (row, column, cell, event) => {
        cell.parentElement.style.transform = 'translate(0,0)'
        cell.parentElement.style.boxShadow = 'slategrey 0px 0px 0px'
        cell.parentElement.style.transition = '300ms all'
      }
    },
    // table固定高度出现滚动条 默认999
    maxHeight: {
      type: String,
      default: '9999px'
    },
    // table值
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 是否显示条目数
    showIndex: {
      type: Boolean,
      default: true
    },
    // 是否显示选择框
    showSelect: {
      type: Boolean,
      default: true
    },
    // 单选框
    showRadio: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    ifPagination: {
      type: Boolean,
      default: true
    },
    // ref用于快速选择
    hTable: {
      type: String,
      default: 'hTable'
    },
    // 点击全选框处罚事件
    tableSelectAll: {
      type: Function,
      default: (selection) => { }
    },
    // 点击选择框事件
    tableSelect: {
      type: Function,
      default: (selection, row) => { }
    },
    // 点击方法
    rowClick: {
      type: Function,
      default: (row, event, column) => { }
    },
    // 双击方法
    rowDblclick: {
      type: Function,
      default: (row, event, column) => { console.log('defaultRowDblclick: ' + row + '---' + event + '---' + column) }
    },
    // 行样式
    rowStyle: {
      type: Function
      // default: (row) => { console.log('rowStyle' + row) }
    },
    // 列样式
    cellStyle: {
      type: Function,
      default: function () { return 'padding: 4px' }
    },
    // 选择后的方法
    select: {
      type: Function
      // default: (selection, row) => { console.log('defaultSelect: ' + selection + '---' + row) }
    },
    // 动态获取行唯一键（需要自己定义某列为标准）
    getRowKeys: {
      type: Function,
      default: (selection) => {}
    },
    // 选择发生变化时方法
    selectionChange: {
      type: Function,
      default: (selection) => {}
    },
    // 监听当前展示行数
    handleSizeChange: {
      type: Function
      // default: (selection) => { console.log('handleSizeChange: ' + selection) }
    },
    // 监听当前页码
    handleCurrentChange: {
      type: Function
      // default: (selection) => { console.log('handleCurrentChange: ' + selection) }
    },
    // 表头
    tableHeader: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 用于定义一些特殊行，列样式添加class
    cellClassName: {
      type: Function
      // default: function () {}
    },
    // 加载
    loading: {
      type: Boolean,
      default: false
    },
    // 适配
    fit: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 展示条目数
    pageSize: {
      type: Number,
      default: 1
    },
    // 总数
    total: {
      type: Number,
      default: 1
    },
    // 表头样式
    headStyle: {
      type: Function,
      default: function () {
        return 'color:black;background:white;padding:5px'
      }
    },
    reserve: true
  },
}
</script>

<style scoped>

</style>
