<template>
<div class="main-content home-main-content">
  <div class="main-wrapper col-sm-12">
    <div class="main-card">
      <p class="connection-word">{{text1}}</p>
      <div class="connection-buttons" span="24" v-if='tongbu'>
        <button class="return-btn"><router-link to='/dashboard/home'>返回首页</router-link></button>
        <button class="start-btn" @click='start'>开始初始化</button>
      </div>
      <div class="connection-word" span="24" v-if='!tongbu'>{{text2}}</div>
      <div class="connection-word" span="24" v-if='tongzhi'>{{text3}}</div>
      <div class="connection-word" span="24" v-if='zhanghu'>{{text4}}</div>
      <div class="connection-word" v-if='wancheng'>订单同步完毕，即将进入功能后台</div>
      <div class="connection-buttons" v-if='wancheng'>
        <button class="return-btn"><router-link to='/dashboard/home'>返回首页</router-link></button>
        <button class="start-btn"><router-link :to="'/ordermanage/'+$route.params.shopid+'/home'">进入功能界面</router-link></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'OrderInit',
  data() {
    return {
      count: 0,
      end: 0,
      text1: '店铺连线中....',
      tongbu: false,
      text2: '',
      text3: '',
      text4: '',
      wancheng: false,
      tongzhi: false,
      zhanghu: false,
      tongzhiitems: [{
          topic: "orders/create",
          value: "订单创建"
        },
        {
          topic: "orders/update",
          value: "订单更新"
        },
        {
          topic: "orders/cancelled",
          value: "订单取消"
        },
        {
          topic: "orders/request_refund",
          value: "退单请求"
        },
        {
          topic: "orders/refunded",
          value: "退单完成"
        },
        {
          topic: "orders/refuse_refund",
          value: "拒绝退单请求"
        },
        {
          topic: "orders/paid",
          value: "订单已付款"
        },
        {
          topic: "orders/delivered",
          value: "订单已发货"
        },
        {
          topic: "orders/partially_delivered",
          value: "订单已部分发货"
        },
        {
          topic: "orders/achieved",
          value: "订单完成"
        },
        {
          topic: "shipments/create",
          value: "配送创建"
        },
        {
          topic: "shipments/update",
          value: "配送更新"
        },
        {
          topic: "shipments/delete",
          value: "配送删除"
        },
      ]
    }
  },
  methods: {
    start() {
      this.tongbu = false;
      this.text2 = '即将开始同步！预计需要' + this.end * 10 + '秒完成！';
      this.tongbuprocess(1, this.end);
    },
    tongbuprocess(begin, end) {
      this.$Axios.post(this.$ApiUrl + 'ordermanage/orderinit', {
        token: localStorage.getItem('token'),
        shopid: this.$route.params.shopid,
        begin: begin,
      }).then(response => {
        if (response.data.code == 200) {
          this.text2 = '同步进度 【' + Math.ceil(begin / end * 100) + '%】  ，还在加载中...预计剩余' + (end * 10 - begin * 10) + '秒，请勿关闭当前页面';
          if (begin != end) {
            begin = begin + 1;
            this.tongbuprocess(begin, end);
          } else {
            this.text2 = '第（1/3）步，订单同步完成，即将进行通知管理设置！';
            this.tongzhistart();
          }
        } else {
          console.log('shiwu');
          this.text2 = '同步进度 【' + Math.ceil(begin / end * 100) + '%】  ，出现了失误，正在重试！,预计剩余' + (end * 10 - begin * 10) + '秒，请勿关闭当前页面';
          this.tongbuprocess(begin, end);

        }
      }).catch(error => {
        this.text2 = '同步进度 【' + Math.ceil(begin / end * 100) + '%】  ，出现了失误，正在重试！,预计剩余' + (end * 10 - begin * 10) + '秒，请勿关闭当前页面';
        this.tongbuprocess(begin, end);
      });
    },
    tongzhistart() {
      this.tongzhi = true;
      this.text3 = '对接接口正在安装中。。。请勿关闭当前页面'
      this.tongzhiprocess(0, this.tongzhiitems);
    },
    tongzhiprocess(index, items) {
      this.$Axios.get(this.$ApiUrl + 'ordermanage/webhookini/' + items[index].topic + '/' + this.$route.params.shopid)
        .then(response => {
          if (response.data.code == 200) {
            this.text3 = '（' + (index + 1) + '/' + items.length + '）已安装【' + items[index].value + '】接口。。。请勿关闭当前页面'
            if ((index + 1) != items.length) {
              index++;
              this.tongzhiprocess(index, items);
            } else {
              this.text3 = '第（2/3）步，对接接口已经安装完毕！即将进行帐户设置！';
              this.initfinish();
            }
          } else {
            this.text3 = '（' + (index + 1) + '/' + items.length + '）安装【' + items[index].value + '】接口失败，正在重试。。。请勿关闭当前页面'
            this.tongzhiprocess(index, items);
          }
        })
        .catch(error => {
          this.text3 = '（' + index + '/' + items.length + '）安装【' + items[index].value + '】接口失败，正在重试。。。请勿关闭当前页面'
          this.tongzhiprocess(index, items);
        });
    },
    initfinish() {
      this.zhanghu = true;
      this.text4 = '第（3/3）步，正在进行帐户设置。。。。。。。';
      this.$Axios.post(this.$ApiUrl + 'ordermanage/orderinit3', {
        token: localStorage.getItem('token'),
        shopid: this.$route.params.shopid,
        functionid: this.$route.params.functionid,
      }).then(response => {
        if (response.data.code == 200) {
          this.$message.success(response.data.msg);
          this.text4 = '第（3/3）步，帐户设置完成！！！';
          this.wancheng = true;
        } else {
          this.$message.warning(response.data.msg);
        }
      }).catch(error => {
        this.$message.error('系统错误！');
      });
    },


  },
  created() {
    this.$Axios.get(this.$ApiUrl + 'ordermanage/orderinitcheck?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid + '&functionid=' + this.$route.params.functionid)
      .then(response => {
        if (response.data.code == 200) {
          this.text1 = '店铺连线成功！一共有' + response.data.count + '个订单需要进行同步。。';
          this.tongbu = true;
          this.count = response.data.count;
          this.end = response.data.end;
        } else if (response.data.code == 402) {
          this.text1 = '已经初始化，无须重复初始化！';
          this.$message.warning(response.data.msg);
        } else {
          this.$message.warning(response.data.msg);
        }
      }).catch(error => {
        this.$message.error('连接错误！');
      });
  }
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../../common/stylus/index.styl"
</style>
