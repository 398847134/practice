<template>
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
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
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航三</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="3-3">选项3</el-menu-item>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项1</el-menu-item>
        </el-submenu>
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
        <el-submenu index="4-4">
          <template slot="title">选项4</template>
          <el-menu-item index="4-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      </el-menu>
    </el-col>
</template>

<script>
export default {
  name: "menubar",
  data () {
    return {
      isopen: true
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
