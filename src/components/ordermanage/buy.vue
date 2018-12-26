<template>
<div>
  <transition name="fade">
    <div class="searchbar-backdrop" v-show="listcardSearchbar" @click="closeSearchbar">
      <div class="gmd-6" @click.stop>
        <input v-model='searchvalue' placeholder="输入收件人姓名或订单号查询" />
        <button  @click='search'><font-icon id="icon-search"></font-icon></button>
      </div>
    </div>
  </transition>
  <div class="list-card">
    <div class="list-card-menubar order-list" ref="orderstatusList">
      <ul class="menubar-content order-content" ref="orderWrapper">
        <li class="menubar-item order-item" v-for="(item,index) in orderstatusList" :key='index' :class="{active:index == num}" ref="orderitem" @click="tab(index)">
          {{ item.name }}<span>({{ item.amount }})</span>
        </li>
      </ul>
    </div>
    <div class="list-card-functionarea">
      <span class="col-sm-4">
        <input type="checkbox" v-model="selectAll" style="vertical-align:middle;margin-top:-2px;margin-bottom:1px;margin-right:5px" />全选
        <button class="word-btn" @click="toggleAlldetails" ref="toggledetail">展开</button>
      </span>
      <span class="col-sm-8" style="text-align:right">
        <button class="font-btn" @click='refreshsite'><font-icon id="icon-shuaxin"></font-icon></button>
        <input class="w-search" v-model='searchvalue' placeholder="输入收件人姓名或订单号查询" />
        <button class="font-btn w-search" @click='search'><font-icon id="icon-search"></font-icon></button>
        <button class="font-btn m-search" @click="openSearchbar"><font-icon id="icon-search"></font-icon></button>
        <button class="word-btn" style="top:-4px" @click="buyexcel">EXCEL采购表</button>
      </span>
    </div>
    <div class="list-card-table-header">
      <div class="table-header-item col-sm-1">操作</div>
      <div class="table-header-item col-sm-2">订单编号</div>
      <div class="table-header-item col-sm-2">下单时间</div>
      <div class="table-header-item col-sm-2">收货人</div>
      <div class="table-header-item col-sm-2">订单状态</div>
      <div class="table-header-item col-sm-1">总金额</div>
      <div class="table-header-item col-sm-2">客户备注</div>
    </div>
    <div class="list-card-table-content" ref="tableContent" id="tablelist">
      <div class="table-scrollbar">
        <div class="table-row" v-for="(orderItem,index) in orders" :key="index">
          <div class="table-row-item col-sm-1 col-xs-2">
            <span><input type="checkbox" :value="orderItem.orderid" v-model="selected" /></span>
            <span v-on:click="orderItem.orderDetail = !orderItem.orderDetail">
              <font-icon id="icon-enter" v-if="!orderItem.orderDetail"></font-icon>
              <font-icon id="icon-unfold" v-else></font-icon>
            </span>
          </div>
          <div class="table-row-item col-sm-2 col-xs-10">
            <span class="item-title">订单编号：</span>
            <router-link :to="'/ordermanage/'+$route.params.shopid+'/detail/'+orderItem.order_no" class="orderno-a">{{ orderItem.order_no }}</router-link>
          </div>
          <div class="table-row-item col-sm-2 col-xs-12">
            <div>
              <span class="item-title">下单时间：</span>
              <span>{{ orderItem.created_at }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-2 col-xs-12">
            <div>
              <p>
                <span class="item-title">收件信息：</span>{{ orderItem.name }}
                <span style="color:#9E9E9E">/ {{ orderItem.mobile }}</span>
              </p>
              <p class="address-info">{{ orderItem.complete_address }}</p>
            </div>
          </div>
          <div class="table-row-item col-sm-2 col-xs-12">
            <div>
              <span class="item-title">订单状态：</span>
              <span class="hasCanceled" :class="{'hasReceived':(orderItem.order_status == '已签收'), 'hasDelivered':(orderItem.order_status == '已发货'), 'isPrepared':(orderItem.order_status == '待发货')}">{{ orderItem.order_status }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-1 col-xs-12">
            <div>
              <span class="item-title">总金额：</span>
              <span>¥ {{ orderItem.total_amount }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-2 col-xs-12" style="text-align:left;line-height:20px">
            <div>
              <span class="item-title">客户备注：</span>
              <span>{{ orderItem.customer_remarks }}</span>
            </div>
          </div>
          <div class="table-row-goods-list col-sm-12" v-if="orderItem.orderDetail">
            <div class="table-row-goods-list-content" v-for="(shipmentType,index) in orderItem.shipments">
              <div class="order-list-shipment-type">
                配送ID:【{{shipmentType.id}}】- 物流方式： {{ shipmentType.shipment_supplier.name }}
              </div>
              <div class="order-list-shipment-type">
                购买客户:【{{orderItem.customer.name}}】- 客户等级 {{ orderItem.customer.customer_level_name }}
              </div>
              <div class="order-list-shipment-type">
                地址:{{orderItem.complete_address}}
              </div>
              <div class="order-list-item-detail">
                <div class="detail-item col-xs-12 col-sm-6" v-for="(goodsItem , index) in shipmentType.items" :key='index'>
                  <div class="detail-item-info col-sm-3">
                    <div class="thumbnail-image">
                      <img v-bind:src="(goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src " @click="openurl((goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src ) " style='cursor:pointer'  />
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
        <div span="24" class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[10, 20, 50, 100]" :pager-count="5" :page-size="size" layout="sizes, prev, pager, next,total,jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'OrderManageBuy',
  data() {
    return {
      orderstatusList: [{
          name: '全部订单',
          amount: '',
          code: 'all'
        },
        {
          name: '未付款',
          amount: '',
          code: 'readytopay'
        },
        {
          name: '待发货',
          amount: '',
          code: 'pending'
        },
        {
          name: '已发货',
          amount: '',
          code: 'shiped'
        },
        {
          name: '已完成',
          amount: '',
          code: 'achived'
        },
        {
          name: '已关闭',
          amount: '',
          code: 'closed'
        },
        {
          name: '退单申请',
          amount: '',
          code: 'refungding'
        },
      ],
      num: 0,
      page: 1,
      size: 10,
      total:0,
      searchvalue:'',

      orderDetail: false,
      selected: [],
      orders: [],
      listcardSearchbar: false
    }
  },
  computed: {
    selectAll: {
      get: function() {
        return this.orders ? this.selected.length == this.orders.length : false;
      },
      set: function(value, index) {
        var selected = [];
        if (value) {
          this.orders.forEach(function(user) {
            selected.push(user.orderid);
          });
        }
        this.selected = selected;
      }
    }
  },
  created() {
    this.refreshsite();
    this.$nextTick(() => {
      this.InitTabScroll();
    });
  },
  mounted: function() {
    this.toReturn();
    if (document.documentElement.clientWidth > 768) {
      this.$refs.tableContent.style.height = document.documentElement.clientHeight - 240 + 'px';
    } else {
      this.$refs.tableContent.style.height = document.documentElement.clientHeight - 190 + 'px';
    }
    window.onresize = () => {
      if (document.documentElement.clientWidth > 768) {
        this.$refs.tableContent.style.height = document.documentElement.clientHeight - 240 + 'px';
      } else {
        this.$refs.tableContent.style.height = document.documentElement.clientHeight - 190 + 'px';
      }
    }
  },
  methods: {
    openurl(url){
      window.open(url, '_blank')
    },
    refreshsite(){
      this.$Axios.get(this.$ApiUrl + 'ordermanage/orderlistamount?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
        .then(response => {
          this.orderstatusList = [{
              name: '全部订单',
              amount: response.data.amount.all,
              code: 'all'
            },
            {
              name: '未付款',
              amount: response.data.amount.readytopay,
              code: 'readytopay'
            },
            {
              name: '待发货',
              amount: response.data.amount.pending,
              code: 'pending'
            },
            {
              name: '已发货',
              amount: response.data.amount.shiped,
              code: 'shiped'
            },
            {
              name: '已完成',
              amount: response.data.amount.achived,
              code: 'achived'
            },
            {
              name: '已关闭',
              amount: response.data.amount.closed,
              code: 'closed'
            },
            {
              name: '退单申请',
              amount: response.data.amount.refungding,
              code: 'refungding'
            },
          ];
          this.getlist();
        })
        .catch(error => {
          this.$Message.error('连接错误');
        });
    },
    buyexcel() {
      if (this.selected.length > 0) {
        window.open(this.$ApiUrl + 'ordermanage/caigoudan?token=' + localStorage.getItem('token') + '&orderids=[' + this.selected + ']', '_blank');
      } else {
        this.$message.error('没有选择任何包裹！');
      }
    },
    getlist() {
      this.$refs.toggledetail.innerText = '展开';

      let loadingmsg = this.$loading({
        target: "#tablelist",
        text: '加载中...'
      });
        this.$Axios.post(this.$ApiUrl + 'ordermanage/orderlistget', {
          token: localStorage.getItem('token'),
          type: this.orderstatusList[this.num].code,
          size: this.size,
          page: this.page,
          shopid: this.$route.params.shopid,
          searchvalue:this.searchvalue
        }).then(response => {
          loadingmsg.close();
          this.listcardSearchbar = false;

          this.orders = response.data.orders;
          this.total = response.data.total;
        }).catch(error=>{
          loadingmsg.close();
          this.listcardSearchbar = false;

          this.$message.error('连接错误');
        });
      },
    InitTabScroll() {
      let width = 0
      for (let i = 0; i < this.orderstatusList.length; i++) {
        width += this.$refs.orderitem[0].getBoundingClientRect().width;
      }
      this.$refs.orderWrapper.style.width = width + 'px'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.orderstatusList, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          });
        } else {
          this.scroll.refresh()
        }
      });
    },
    tab(index) {
      this.num = index;
      this.size = 10;
      this.page = 1;
      this.searchvalue='';
      this.getlist();

    },
    toReturn: function() {
      this.$parent.$children[0].returnBack = true;
    },


    openSearchbar() {
      this.listcardSearchbar = true;
    },
    closeSearchbar() {
      this.listcardSearchbar = false;
    },
    handleSizeChange(val){
      this.size = val;
      this.page = 1;
      this.getlist();
    },
    handleCurrentChange(val){
      this.page = val;
      this.getlist();
    },
    outtopdf() {
      if (this.selected.length > 0) {
        window.open(this.$ApiUrl + 'ordermanage/packinglistpdf?token=' + localStorage.getItem('token') + '&orderids=[' + this.selected + ']', '_blank');
      } else {
        this.$message.error('没有选择任何包裹！');
      }
    },
    search(){
      this.listcardSearchbar = false;
      this.page=1;
      this.size=10;
      this.getlist();
    },
    toggleAlldetails() {
      if(this.$refs.toggledetail.innerText == '展开'){
        for(let i=0; i<this.orders.length; i++){
          this.orders[i].orderDetail = true;
        }
        const tempText = '折叠';
        this.$refs.toggledetail.innerText = tempText;
      }
        else if(this.$refs.toggledetail.innerText == '折叠'){
        for(let i=0; i<this.orders.length; i++){
          this.orders[i].orderDetail = false;
        }
        const tempText = '展开';
        this.$refs.toggledetail.innerText = tempText;
      }
    }
  },


}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
