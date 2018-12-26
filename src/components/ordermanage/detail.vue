<template>
<div>
  <div class="list-card">
    <div class="list-card-functionarea" style="height:40px">
      <span class="functionarea-return" ><button @click='returnBack'>返回</button></span>
      <span class="functionarea-functions">
        <!-- <span class="functionarea-reload"><button ><font-icon id="icon-shuaxin"></font-icon></button></span> -->
        <span class="functionarea-word"><button @click='outtopdf'>生成PDF</button></span>
      </span>
    </div>
    <div class="list-card-table-content" ref="detailContent">
      <div class="table-scrollbar">
        <div class="table-row detail-row" >
          <div class="table-row-item col-sm-6 col-xs-12">
            <div>
              <span>订单编号：</span>
              <router-link :to="'/ordermanage/'+$route.params.shopid+'/detail/'+orderItem.order_no" class="orderno-a">{{ orderItem.order_no }}</router-link>
            </div>
          </div>
          <div class="table-row-item col-sm-6 col-xs-12">
            <div>
              <span>下单时间：</span>
              <span>{{ orderItem.created_at }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-12">
            <div>
              <p>
                <span>收件信息：</span>{{ orderItem.name }}
                <span style="color:#9E9E9E">/ {{ orderItem.mobile }}</span>
              </p>
              <p class="address-info">{{ orderItem.complete_address }}</p>
            </div>
          </div>
          <div class="table-row-item col-sm-6 col-xs-12">
            <div>
              <span>订单状态：</span>
              <span>{{ orderItem.order_status }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-6 col-xs-12">
            <div>
              <span>总金额：</span>
              <span>¥ {{ orderItem.total_amount }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-6 col-xs-12" style="text-align:left;line-height:20px">
            <div>
              <span>会员帐户：</span>
              <span>{{ orderItem.customer.name }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-6 col-xs-12" style="text-align:left;line-height:20px">
            <div>
              <span>会员等级：</span>
              <span>{{ orderItem.customer.customer_level_name }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-12" style="text-align:left;line-height:20px">
            <div>
              <span>客户备注：</span>
              <span>{{ orderItem.customer_remarks }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-12" style="text-align:left;line-height:20px">
            <div>
              <span>商家笔记：</span>
              <p v-for='(notes , index) in orderItem.notes'>{{index+1}}:{{ notes.note }}</p>
            </div>
          </div>

          <div class="table-row-goods-list col-sm-12">
            <div class="table-row-goods-list-content" v-for="(shipmentType,index) in orderItem.shipments">
              <div class="order-list-shipment-type">
                <div class="shipment-type col-sm-6 col-xs-12">配送ID:【{{shipmentType.id}}】- 物流方式： {{ shipmentType.shipment_supplier.name }}</div>
                <div class="shipment-no col-sm-4 col-xs-10">
                  <span>单号：</span>
                  <span v-if="shipmentType.shipNo" class="shipno">{{ shipmentType.ship_no }}</span>
                  <span v-if="shipmentType.shipnoArea" class="shipno-edit">
                    <input placeholder="请输入单号" v-model="shipmentType.ship_no2" />
                    <button @click="confirmNo(shipmentType)" class="shipno-confirm-btn">确认</button>
                    <button @click="cancelNo(shipmentType)" class="shipno-cancel-btn">取消</button>
                  </span>
                  <span @click="shipnoEdit(shipmentType)" v-if="shipmentType.btn" class="shipno-edit-icon">
                    <font-icon id="icon-editor" class="shipno-edit-btn"></font-icon>
                  </span>
                </div>
                <div  class="shipment-confirm col-sm-2">
                  <button @click='toConfirmSend(shipmentType)' :disabled="shipmentType.isDisabled">{{ shipmentType.confirmSend }}</button>
                </div>
              </div>
              <div class="order-list-item-detail">
                <div class="detail-item col-xs-12 col-sm-6" v-for="(goodsItem , index) in shipmentType.items" :key='index'>
                  <div class="detail-item-info col-sm-3">
                    <div class="thumbnail-image">
                      <img v-bind:src="(goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src " />
                      <div class="imgcover"></div>
                    </div>
                  </div>
                  <div class="detail-item-info col-sm-6" style="margin:0 10px">
                    <p class="primary-title">{{ goodsItem.name }}</p>
                    <p class="secondary-desc">{{ goodsItem.options_desc }}</p>
                    <p class="secondary-desc">商品编号：{{ goodsItem.barcode }}</p>
                  </div>
                  <div class="detail-item-info col-sm-3">
                    <p class="primary-title">¥ {{ goodsItem.price }}</p>
                    <p class="price">x {{ goodsItem.quantity }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'OrderManageList',
  data() {
    return {
      orderItem: {}
    }
  },
  created() {
    this.$Axios.post(this.$ApiUrl + 'ordermanage/orderdetail', {
      token: localStorage.getItem('token'),
      orderno: this.$route.params.orderno
    }).then(response => {
      this.orderItem = response.data.order;

    }).catch(error => {
      this.$message.error('连接错误');
    });
  },
  mounted: function() {
    this.toReturn();
    if(document.documentElement.clientWidth > 768){
      this.$refs.detailContent.style.height = document.documentElement.clientHeight - 150 + 'px';
    } else {
      this.$refs.detailContent.style.height = document.documentElement.clientHeight - 145 + 'px';
    }
    window.onresize =() => {
      if(document.documentElement.clientWidth > 768){
        this.$refs.detailContent.style.height = document.documentElement.clientHeight - 150 + 'px';
      } else {
        this.$refs.detailContent.style.height = document.documentElement.clientHeight - 145 + 'px';
      }
    }
  },
  methods: {
    outtopdf() {
      window.open(this.$ApiUrl + 'ordermanage/packinglistpdf?token=' + localStorage.getItem('token') + '&orderids=[' + this.orderItem.orderid + ']', '_blank');
    },
    returnBack() {
      this.$router.go(-1);
    },
    shipnoEdit(index) {
      index.shipnoArea = true;
      index.btn = false;
      index.shipNo = false;
      index.ship_no2 = index.ship_no;
    },
    confirmNo(index) {
      let loadingmsg = this.$loading({ fullscreen: true ,text:'同步中...'});

      if (this.ship_no2 != '') {
        this.$Axios.post(this.$ApiUrl + 'ordermanage/shipmentput', {
          token: localStorage.getItem('token'),
          type: 'ship_no',
          shopid: this.$route.params.shopid,
          id: index.id,
          ship_no: index.ship_no2
        }).then(response => {
          loadingmsg.close();
          if (response.data.code == 200) {
            index.ship_no = index.ship_no2;
            index.shipnoArea = false;
            index.btn = true;
            index.shipNo = true;
            this.$message.success(response.data.msg);
          } else {
            this.$message.error(response.data.msg)
          }

        }).catch(error => {
          loadingmsg.close();

          this.$message.error('系统出错了');
        })


      } else {
        loadingmsg.close();

        index.shipnoArea = false;
        index.btn = true;
        index.shipNo = true;
        index.ship_no2 = '';
      }
    },
    cancelNo(index) {
      index.shipnoArea = false;
      index.btn = true;
      index.shipNo = true;
      index.ship_no2 = '';
    },
    toConfirmSend(index) {
      let loadingmsg = this.$loading({ fullscreen: true ,text:'同步中...'});

      this.$Axios.post(this.$ApiUrl + 'ordermanage/shipmentput', {
        token: localStorage.getItem('token'),
        type: 'send',
        shopid: this.$route.params.shopid,
        id: index.id,
      }).then(response => {
        loadingmsg.close();
        if (response.data.code == 200) {
          index.confirmSend = '已发货';
          index.isDisabled = true;
          if (this.checkShipped()) {
            this.orderItem.order_status = '已发货';
          } else {
            this.orderItem.order_status = '部分发货';
          }
          this.$message.success(response.data.msg);
        } else {
          this.$message.error(response.data.msg)
        }
      }).catch(error => {
        loadingmsg.close();

        this.$message.error('系统出错了');
      });
    },
    checkShipped() {
      let shipped = true;
      for (let i = 0; i < this.orderItem.shipments.length; i++) {
        if (this.orderItem.shipments[i].confirmSend == '确认发货') shipped = false;
      }
      return shipped;
    },
    toReturn: function() {
      this.$parent.$children[0].returnBack = true;
    },
  },


}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
