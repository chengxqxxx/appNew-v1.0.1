<template>
<div>
  <transition name="fade">
    <div class="searchbar-backdrop" v-show="listcardSearchbar" @click="closeSearchbar">
      <div class="gmd-6" @click.stop>
        <input v-model='searchvalue' placeholder="输入收件人姓名或订单号查询" />
        <button @click='search'><font-icon id="icon-search"></font-icon></button>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="uploadmodal-backdrop" v-show="uploadModal" @click="closeUploadbar">
      <div class="uploadmodal gmd-6" @click.stop>
        <h6>请使用上传模版批量上传单号</h6>
        <button class="download-button" @click='exampledownload'>点击此处下载模版</button>
        <el-upload class="upload-area"
          drag
          :action="$ApiUrl+'ordermanage/shipnoupload'"
          name="file"
          :before-upload='beforefileupload'
          :on-error	= 'handleUploadError'
          :on-success='handleFormatSuccess' ref="uploadbar">
          <div class="upload-text">
            <font-icon id="icon-shangchuandaochu"></font-icon>
            <div class="el-upload__text">将文件拖拽到此处或点击上传</div>
          </div>
          <div slot="tip" class="el-upload__tip">请注意：只能上传xlsx文件</div>
        </el-upload>
        <div class="upload-status" v-if="(uploadtext != '')">
          <h6>更新状态（更新期间请勿重复上传）</h6>
          <span >{{uploadtext}}</span>
        </div>
        <div class="modal-function-bar">
          <button @click="confirmModal" class="confirm-btn">{{uploadloading?'最小化':'关闭'}}</button>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="uploadmodal-backdrop" v-show="sendModal" @click="closeSendbar">
      <div class="uploadmodal gmd-6" @click.stop>
        <h6>总计选中{{selected.length}}个包裹，其中以下订单拥有多种配送方式需要选定，请选择需要发货的包裹</h6>
        <div v-for="(multiorder , index) in multiorders" :key='index'>
          <input type="checkbox" :value="multiorder" v-model="multiordersselected" />
          {{multiorder.name}}-{{multiorder.shipment_supplier.name}}-{{multiorder.ship_no}}
        </div>


        <div class="modal-function-bar">
          <button @click='closeSendbar'  class="confirm-btn">取消发货</button>
          <button @click='sendbegin' class="confirm-btn">已选择</button>
        </div>
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
        <button class="word-btn" style="top:-4px" @click="openUploadbar">上传单号</button>
        <button class="word-btn" style="top:-4px" @click="toSendsteps">批量发货</button>
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
    <div class="list-card-table-content" ref="tableContent" id='tablelist'>
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
              <span :class="{'hasDelivered':(orderItem.order_status == '已发货'), 'isPrepared':(orderItem.order_status == '待发货')}">{{ orderItem.order_status }}</span>
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

                <div class="shipment-type col-sm-6 col-xs-12">配送ID:【{{shipmentType.id}}】- 物流方式： {{ shipmentType.shipment_supplier.name }}</div>
                <div class="shipment-no col-sm-4 col-xs-12">
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
                <div class="shipment-confirm col-sm-2 col-xs-12">
                  <button @click='toConfirmSend(shipmentType,orderItem)' :disabled="shipmentType.isDisabled">{{ shipmentType.confirmSend }}</button>
                </div>
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
                      <img v-bind:src="(goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src " @click="openurl((goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src ) " style='cursor:pointer' />
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
  name: 'OrderManageSend',
  data() {
    return {
      templist: {},
      orderstatusList: [{
          name: '待发货',
          amount: '',
          code: 'pending'
        },
        {
          name: '已发货',
          amount: '',
          code: 'shiped'
        },
      ],
      num: 0,
      page: 1,
      size: 10,
      total: 0,
      searchvalue: '',
      orderDetail: false,
      selected: [],
      orders: {},
      listcardSearchbar: false,
      uploadModal: false,
      updatedanhao: [],
      uploadtext: '',
      uploadloading: false,
      sendModal:false,
      multiorders:[],
      shiporders:[],
      multiordersselected:[],
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
    closeSendbar(){
      this.sendModal = false;
      this.selected = [];
      this.multiorders = [];
      this.shiporders = [];
      this.multiordersselected = [];
    },
    toSendsteps(){
      if(this.selected.length>0){
        let loadingmsg = this.$loading({
          fullscreen:true,
          text: '正在智能运算中...'
        });
        let selectedorders = [];
        let selected= this.selected;
        this.orders.forEach(function(item){
          selected.forEach(function(temp){
            if(item.orderid == temp){
              selectedorders.push(item);
            }
          });
        });
        let shiporders = [];
  			let multiorders = [];
  			selectedorders.forEach(function(item){
  				if(item.shipments.length>1){
  					item.shipments.forEach(function(shipment){
  						let multiorder = shipment;
  						multiorder.name=item.name;
  						multiorder.complete_address=item.complete_address;
  						multiorder.mobile=item.mobile;
  						multiorder.order_no=item.order_no;
  						multiorders.push(multiorder);
  					});
  				}else{
  					let shiporder = item.shipments[0];
  					shiporder.name=item.name;
  					shiporder.complete_address=item.complete_address;
  					shiporder.mobile=item.mobile;
  					shiporder.order_no=item.order_no;
  					shiporders.push(shiporder);
          }
  			});
        this.shiporders = shiporders;
        if(multiorders.length >0){
          setTimeout(()=>{
            loadingmsg.close();
            this.sendModal = true;
            this.multiorders = multiorders;
          },1500);
        }else{
          setTimeout(()=>{
            loadingmsg.text = '一共有'+this.shiporders.length+'个包裹即将更新...';
            this.multisendprocess(loadingmsg,0,this.shiporders);
          },1500);
        }
      }else{
        this.$message.warning('未选择任何包裹！！！！');
      }


    },
    sendbegin(){
      this.sendModal = false;
      this.shiporders = this.shiporders.concat(this.multiordersselected);
      let loadingmsg = this.$loading({
        fullscreen:true,
        text: '一共有'+this.shiporders.length+'个包裹即将更新...'
      });
      this.multisendprocess(loadingmsg,0,this.shiporders);

    },
    multisendprocess(loadingmsg,index,orders){
      this.$Axios.post(this.$ApiUrl + 'ordermanage/shipmentput', {
        token: localStorage.getItem('token'),
        type: 'send',
        shopid: this.$route.params.shopid,
        id: orders[index].id,
      }).then(response => {
        if (response.data.code == 200) {
          loadingmsg.text='进度（'+(index+1)+'/'+orders.length+'）：更新成功，智能更新继续中...';
          if((index+1)!=orders.length){
            this.multisendprocess(loadingmsg,index+1,orders);
          }else{
            loadingmsg.text='进度（'+(index+1)+'/'+orders.length+'）：更新完成！3秒后将自动刷新...如果没有刷新，请刷新页面';
            setTimeout(()=>{
              loadingmsg.close();
              this.refreshsite();
            },3000);
          }
        } else {
          this.$message.error(response.data.msg);
          loadingmsg.text= response.data.msg;
          setTimeout(()=>{
            loadingmsg.close();
            this.refreshsite();
          },1500);

        }
      }).catch(error => {
        this.$message.error('系统出错了');
        loadingmsg.text= response.data.msg;
        setTimeout(()=>{
          loadingmsg.close();
          this.refreshsite();
        },1500);
      });
    },
    openurl(url){
      window.open(url, '_blank')
    },
    refreshsite(){
      this.$Axios.get(this.$ApiUrl + 'ordermanage/orderlistamount?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
        .then(response => {
          this.orderstatusList = [{
              name: '待发货',
              amount: response.data.amount.pending,
              code: 'pending'
            },
            {
              name: '已发货',
              amount: response.data.amount.shiped,
              code: 'shiped'
            },
          ];
          this.getlist();
        })
        .catch(error => {
          this.$message.error('连接错误');
        });
    },
    getlist() {
      this.$refs.toggledetail.innerText = '展开';
      this.selected = [];
      let loadingmsg = this.$loading({
        target:'#tablelist',
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
      this.searchvalue = '';
      this.getlist();

    },
    shipnoEdit(index) {
      index.shipnoArea = true;
      index.btn = false;
      index.shipNo = false;
      index.ship_no2 = index.ship_no;
    },
    confirmNo(index) {
      let loadingmsg = this.$loading({
        fullscreen: true,
        text: '同步中...'
      });

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
      this.shipnoRenew = '';
    },
    toConfirmSend(index, orderItem) {
      let loadingmsg = this.$loading({
        fullscreen: true,
        text: '同步中...'
      });
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
          this.$message.success(response.data.msg);
          if (this.checkShipped(orderItem)) {
            orderItem.order_status = '已发货';
          } else {
            orderItem.order_status = '部分发货';
          }
        } else {
          this.$message.error(response.data.msg)
        }
      }).catch(error => {
        loadingmsg.close();
        this.$message.error('系统出错了');
      });
    },
    checkShipped(orderItem) {
      let shipped = true;
      for (let i = 0; i < orderItem.shipments.length; i++) {
        if (orderItem.shipments[i].confirmSend == '确认发货') shipped = false;
      }
      return shipped;
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
    openUploadbar() {
      this.uploadModal = true;
    },
    closeUploadbar() {
      this.uploadModal = false;
      if(!this.uploadloading){
        this.uploadtext='';
      }
    },
    exampledownload() {
      window.open(this.$ApiUrl + 'ordermanage/exampleexcel', '_blank');
    },


    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    search() {
      this.listcardSearchbar = false;
      this.page = 1;
      this.size = 10;
      this.getlist();
    },
    beforefileupload(file){
      let bool  = file.name.split('.')[1] === 'xlsx';
      if(!bool){
        this.$message.error('文件格式不对!');
      }
      return bool;
    },
    handleUploadError(){
      this.$message.error('更新出错了，请与管理员联系或检查文件！');
    },
    handleFormatSuccess(response) {
      this.uploadtext = '文件读取成功，共读取'+response.count+'个数据,即将开始同步';
      this.uploadloading=true;
      this.updateexceldanhaoprocess(0,response.datas);
    },
    updateexceldanhaoprocess(index,shipments){
      this.$Axios.post(this.$ApiUrl + 'ordermanage/shipmentput', {
        token: localStorage.getItem('token'),
        type: 'ship_no',
        shopid: this.$route.params.shopid,
        id: shipments[index].shipment_id,
        ship_no: shipments[index].ship_no
      }).then(response => {
        if (response.data.code == 200) {
          this.uploadtext='(进度'+(index+1)+'/'+shipments.length+')，同步中。。。。请勿关闭窗口';
          if ((index+1) != shipments.length) {
            index++;
            this.updateexceldanhaoprocess(index, shipments);
          } else {
            this.uploadtext = '单号同步完毕！恭喜您！';
            this.uploadloading=false;
          }
        } else {
          this.uploadtext='第'+(index+2)+'行数据出错，数据同步停止！错误原因:'+response.data.msg;
          this.uploadloading=false;

        }

      }).catch(error => {
        this.uploadtext='第'+(index+2)+'行数据出错，数据同步停止！错误原因:系统错误';
        this.$message.error('系统出错了');
        this.uploadloading=false;

      })
    },
    confirmModal(){
      this.uploadModal = false;
      if(!this.uploadloading){
        this.uploadtext='';
      }
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
