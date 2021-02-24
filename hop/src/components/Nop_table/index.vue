<template>
  <div>
  <el-table :data="tableData" highlight-current-row
            :row-style="rowStyle"
            class="nopElTable"
            @row-dblclick="rowDblclick"
            @row-click="rowClick"
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
            ref="table"
            stript="true"
            v-loading="loading"
            element-loading-text="努力加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.3)"
            :max-height="maxHeight"
            @cell-mouse-enter="hoverenter"
            @cell-mouse-leave="hoverleave"

  >
    <el-table-column v-if="this.showSelect" type="selection" width="50px" :reserve-selection="true" :selectable="selectbale" fixed></el-table-column>
    <el-table-column v-if="this.showRadio" type="selection" width="50px">
      <template scope="scope">
        <el-radio :label="scope.row.id" v-model="radio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
      </template>
    </el-table-column>
    <el-table-column v-if="this.showIndex" type="index" width="80px" align="center" :index="indexMethod"></el-table-column>
    <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
         oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 -->
    <el-table-column sortable v-for="(th, key) in tableHeader"
                     v-if="th.show !== '0'"
                     :show-overflow-tooltip="showOverflow"
                     :key="key"
                     :prop="th.prop"
                     :label="th.label"
                     :fixed="th.fixed"
                     :min-width="th.minWidth" align="center">
        <el-table-column sortable v-if="th.child" v-for="(cth,ckey) in th.child"
                        :show-overflow-tooltip="showOverflow"
                        :key="ckey"
                        :prop="cth.prop"
                        :label="cth.label"
                        :min-width="cth.minWidth" align="center">
        </el-table-column>

      <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的，（oper表示是操作这一列，否则就不是） -->
      <!-- 加入icon选项，默认为el-icon-menu，可通过icon属性修改图标 -->
      <template slot-scope="scope">
        <div v-if="th.oper">
          <el-tooltip v-for="(o, key) in th.oper" :key="key" class="item" effect="dark" placement="top">
            <div slot="content"><span style="white-space: pre-wrap;">{{o.name}}</span></div>
<!--            <el-button v-if="o.name == '添加到知识库' && scope.row.mgr != 'syslogd'" disabled @click="o.clickFun(scope.row)" circle size="mini" :type="o.type" :icon="o.icon == null?'el-icon-menu':o.icon"></el-button>-->
<!--            <el-button v-else @click="o.clickFun(scope.row)" circle size="mini" :type="o.type" :icon="o.icon == null?'el-icon-menu':o.icon"></el-button>-->
            <el-button @click="o.clickFun(scope.row)" circle size="mini" :type="o.type" :icon="o.icon == null?'el-icon-menu':o.icon"></el-button>

          </el-tooltip>
        </div>
        <div v-else-if="th.switch">
          <el-switch
            v-model="scope.row.status"
            :active-value="th.switch.activeValue"
            :inactive-value="th.switch.inactiveValue"
            :active-text="th.switch.activeText"
            :inactive-text="th.switch.inactiveText"
            @change="th.switch.changeStatus(scope.row)"
            :active-color="th.switch.activeColor"
            :inactive-color="th.switch.inactiveColor">
          </el-switch>
          <!--
            :active-value="th.switch.activeValue"
            :inactive-value="th.switch.inactiveValue"
            :active-text="th.switch.activeText"
            :inactive-text="th.switch.inactiveText"-->
        </div>
        <div v-else>
          <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
          <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 显示页码 -->
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

    <!--"[5, 10, 15, 20]"-->
  </div>
  </div>
</template>

<script>
export default {
  name: 'nop_table',
  // 子类向父类传值
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
    nopTable: {
      type: String,
      default: 'nopTable'
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
      type: Function
      // default: (selection) => { console.log('getRowKeys: ' + selection) }
    },
    // 选择发生变化时方法
    selectionChange: {
      type: Function
      // default: (selection) => { console.log('defaultSelectionChange: ' + selection) }
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
        return 'color:#ffffff;background:#414141;padding:5px'
      }
    },
    reserve: true
  },
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
  methods: {
    // 计算页码
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    getTemplateRow (index, row) { // 获取选中数据
      this.templateSelection = row
      this.selectionChange([this.templateSelection])
    },
    // 禁用多选框 字段disableMultiSelect
    selectbale (row) {
      if (row.disableMultiSelect === 1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .nopElTable th{
    padding:8px 0!important;
    text-align: center;
  }

  .nopElTable td{
    padding:6px 0!important;
    text-align: center;
  }

</style>
