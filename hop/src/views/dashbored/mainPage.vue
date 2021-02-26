<template>
  <div class="maincontaint">
    <menubar></menubar>
    <topleadbar/>
    <APPmain></APPmain>
  </div>
</template>

<script>
import {menubar, topleadbar, APPmain} from './components'
export default {
  name: "mainpage",
  components: {menubar, topleadbar, APPmain},
}
</script>

<style scoped>
.maincontaint{
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}
.el-col-3{
  width: 14%;
  height: 100%;
  background-color: rgb(84, 92, 100);
}
</style>
<style>
.el-submenu__title{
 padding-left: 0px !important;
}
</style>
