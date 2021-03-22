<template>
  <div style="padding: 30px;width: 100%;text-align: left">
    <label class="labels">供应渠道</label>
    <div class="content" v-text="bookingData.channel"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">预订最多数量</label>
    <div class="content" v-text="bookingData.maxAmount"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">最多入住天数</label>
    <div class="content" v-text="bookingData.maxDays"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">最大提前预订时间</label>
    <div class="content" v-text="bookingData.maxAdvHours"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">每日开始销售时间</label>
    <div class="content" v-text="bookingData.startTime"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">每日结束销售时间</label>
    <div class="content" v-text="bookingData.endTime"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">有效星期</label>
    <div class="content" v-text="bookingData.weekSet"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">预订说明</label>
    <div class="content" v-text="bookingData.bookingNotices"></div><span>&nbsp;</span>
    <br/>
  </div>
</template>

<script>
import {HOTELINFO} from "../../../api_1";

export default {
  name: "order",
  data () {
    return {
      bookingData: []
    }
  },
  props: {
    'bookingRuleId': String,
    'hotelId': Number,
    'channel': String
  },
  mounted() {
    this.$fetch(HOTELINFO.QUERY_BOOKINGRULE_BY_ROOMTYPE.url,{bookingRuleId: this.bookingRuleId, hotel: this.hotelId, channel: this.channel}).then(res => {
      this.bookingData = res.results[0]
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
.labels {
  font-size: 18px;
  font-weight: 900;
  color: #1f2d3d;
}
.content {
  font-size: 15px;
}
</style>
