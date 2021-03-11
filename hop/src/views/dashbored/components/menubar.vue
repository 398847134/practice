<template>
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航二</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="test1">选项1</el-menu-item>
            <el-menu-item index="test2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="permission">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户权限</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user">用户权限</el-menu-item>
          <el-menu-item index="role">角色设置</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>
        <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航四</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="4-3">选项3</el-menu-item>
      </el-submenu>
      </el-menu>
    </el-col>
</template>

<script>
export default {
  name: "menubar",
  data () {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
