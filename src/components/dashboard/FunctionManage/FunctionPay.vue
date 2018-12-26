<template>
<div class="main-content addfunction-main-content">
  <div class="main-wrapper col-xs-12 col-sm-12">
    <div class="main-card gmd-7">
      <div class="card-content">
        <p class="maintitle">功能名称:{{functioninfo.name}}</p>
        <p class="subtitle">功能价格:{{functioninfo.price}}元/月</p>
        <div class="payment-select">
          <input type="radio" id="wppay" v-model='paytype' name="paymethode" value="wppay">
          <label for="wppay"> 微信支付</label>
          <input type="radio" id="alipay" v-model='paytype' name="paymethode" value="alipay">
          <label for="alipay"> 支付宝支付</label>
        </div>
        <div class="pay-length-select">
          <input type="radio" v-model='duration' name="durationmonth" value="1"><label>1个月</label>
          <input type="radio" v-model='duration' name="durationmonth" value="3"><label>3个月</label>
          <input type="radio" v-model='duration' name="durationmonth" value="6"><label>6个月</label>
        </div>
        <button @click='pay'>pay</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "FunctionPay",
  data() {
    return {
      shopid: '',
      duration:1,
      functioninfo: {},
      paytype: 'weipay',
    }
  },
  mounted: function() {
    this.toReturn();
  },
  methods: {
    pay(){
      alert(this.paytype+this.duration);
    },
    toReturn() {
      this.$parent.$children[0].returnBack = true;
    },

  },
  created() {
    if (this.$route.params.shopid != undefined && this.$route.params.functionid != undefined) {
      this.$Axios.get(this.$ApiUrl + 'shop/checkshopright?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
        .then(response => {
          if (response.data.code == 200) {
            this.$Axios.get(this.$ApiUrl + 'function/funcsingle?functionid=' + this.$route.params.functionid)
              .then(response => {
                if (response.data.code == 200) {
                  alert(response.data.msg);
                  this.functioninfo = response.data.functioninfo;
                } else {
                  alert(response.data.msg);
                }
              }).catch(error => {
                alert('连接错误！！');
              });
          } else {
            alert(response.data.msg);
            this.$router.push('/dashboard/home');
          }
        }).catch(error => {
          alert('连接错误！！');
        });
    } else {
      alert('没有选择功能或商铺！！');
    }
  }
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../../common/stylus/index.styl"
</style>