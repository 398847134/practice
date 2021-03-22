<template>
  <div style="padding: 30px;width: 100%;text-align: left">
    <label class="labels">供应渠道</label>
    <div class="content" v-text="nightData.channel"></div><span>&nbsp;</span>
    <br/>
  </div>
</template>

<script>
import {HOTELINFO} from "../../../api_1";

export default {
  name: "nightlyrate",
  data () {
    return {
      nightData: []
    }
  },
  props: {
    'keyId': String,
  },
  mounted() {
    this.$fetch(HOTELINFO.QUERY_NIGHTLYRATE_BY_ROOMTYPE.url,{}).then(res => {
      this.nightData = res.results[0]
    }).catch(() => {
      this.$message({
        type: 'error',
        message: '未找到预定条款'
      })
    })
  }

}
</script>

<style scoped>

</style>
