<template>
  <div class="main">
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: "APPmain",
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.main{
  height: 91.7%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 200px;
  top: 80px;
}
</style>
