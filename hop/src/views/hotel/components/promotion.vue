<template>
  <div style="padding: 30px;width: 100%;">
<!--    <label class="labels">供应渠道</label>-->
<!--    <div class="content" v-text="refundData.channel"></div><span>&nbsp;</span>-->
<!--    <br/>-->
  暂无信息
  </div>
</template>

<script>
import {HOTELINFO} from "../../../api_1";

export default {
  name: "promotion",
  data () {
    return {
      promotionData: []
    }
  },
  props: {
    'bookingRuleId': String,
    'hotelId': Number,
    'channel': String
  },
  mounted () {
    this.$fetch(HOTELINFO.QUERY_REFUNDRULE_BY_ROOMTYPE.url,{bookingRuleId: this.bookingRuleId, hotel: this.hotelId, channel: this.channel}).then(res => {
      this.promotionData = res.results[0]

    }).catch(() => {
      this.$message({
        type: 'error',
        message: '未找到礼包信息'
      })
    })
  }
}
</script>

<style scoped>

</style>
