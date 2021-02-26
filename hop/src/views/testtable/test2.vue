<template>
<div>
  fram2
  <el-tooltip class="item" effect="dark" content="跳转test1" placement="top">
    <v-btn color="error"  dark @click="jump"><v-icon>delete</v-icon></v-btn>
  </el-tooltip>
</div>
</template>

<script>
export default {
  name: "test2",
  methods: {
    jump () {
      this.$router.push('test1')
    }
  }
}
</script>

<style scoped>

</style>
