<template>
  <div style="padding: 30px;width: 100%;text-align: left">
    <label class="labels">供应渠道</label>
    <div class="content" v-text="refundData.channel"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">取消条款规则</label>
    <div class="content" v-text="refundData.refundRuleType"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">入住前n小时可取消</label>
    <div class="content" v-text="refundData.refundRuleHours"></div><span>&nbsp;</span>
    <br/>
    <label class="labels">取消订单用户罚金</label>
    <div class="content" v-text="refundData.deductType"></div><span>&nbsp;</span>
    <br/>

  </div>
</template>

<script>
import {HOTELINFO} from "../../../api_1";

export default {
  name: "refund",
    data () {
    return {
      refundData: []
    }
  },
  props: {
    'bookingRuleId': String,
    'hotelId': Number,
    'channel': String
  },
  mounted () {
    this.$fetch(HOTELINFO.QUERY_REFUNDRULE_BY_ROOMTYPE.url,{bookingRuleId: this.bookingRuleId, hotel: this.hotelId, channel: this.channel}).then(res => {
      this.refundData = res.results[0]
      if (this.refundData.refundRuleType === '') {
        this.refundData.refundRuleType = '不可取消'
      } else if (this.refundData.refundRuleType === 1){
        this.refundData.refundRuleType = '不可退'
      } else if (this.refundData.refundRuleType === 2){
        this.refundData.refundRuleType = '限时取消'
      }
      if (this.refundData.deductType === 1) {
        this.refundData.deductType = '全额扣款'
      }else if (this.refundData.deductType === 0) {
        this.refundData.deductType = '扣首晚房费'
      }
    }).catch(() => {
      this.$message({
        type: 'error',
        message: '未找到取消条款'
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
