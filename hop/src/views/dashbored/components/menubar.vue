<template>
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="select"
        background-color="#545c64"
        text-color="#fff"
        ref="menu"
        router
        active-text-color="#ffd04b">
        <el-menu-item index="/mainPage/statistics">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/hotel/hotelInfo">酒店信息</el-menu-item>
            <el-menu-item index="/hotel/cityinfo">城市信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="permission">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户权限</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/permission/user">用户权限</el-menu-item>
          <el-menu-item index="/permission/role">角色设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-menu>
    </el-col>
</template>

<script>
import path from 'path'
export default {
  name: "menubar",
  data () {
    return {
      basePath: '/'
    }
  },
  methods: {
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    },
    handleOpen(key, keyPath) {
      // this.basePath = '/' + key
    },
    handleClose(key, keyPath) {
    },
    select (index,indexPath) {
    }
  }
}
</script>

<style scoped>
.el-menu{
  border-right:0;
}
</style>
<style>
.el-col-3{
  text-align: left;
}
</style>
