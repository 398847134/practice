<template>
  <div class="main">
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: "APPmain"
}
</script>

<style scoped>
.main{
  height: 93.5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 14%;
  top: 6.5%;
}
</style>
