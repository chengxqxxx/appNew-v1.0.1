<template>
<div>
	<div class="main-card">
		<div class="card-title">
			订单概览
			<router-link to="list">查看详情</router-link>
		</div>
		<h3>{{ staticError }}</h3>
		<div class="card-statics">
			<div class="card-statics-item" v-for="orderstatus in orderStatus" :key="orderstatus.code">
				<h6>{{ orderstatus.name }}</h6>
				<h3>{{ orderstatus.value }}</h3>
			</div>
		</div>
	</div>
	<div class="main-card">
		<div class="card-title">管理工具</div>
		<div class="card-content">
			<div class="card-content-itemgroup">
				<div class="card-content-item col-sm-2 col-xs-4" v-for="(item,index) in itsFunction" :key="index">
					<router-link :to="item.url">
						<div class="card-content-item-icon" :class="item.color"><font-icon :id="item.icon"></font-icon></div>
						<p>{{ item.name }}</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'OrdermanageHome',
	data() {
		return{
			staticError: '',
			shopError: '',
			orderStatus: [{
          name: '未付款',
          code: 'readytopay',
          value: '--',
          icon: 'icon-yinhangqia-xianxing'
        },
        {
          name: '待发货',
          code: 'pending',
          value: '--',
          icon: 'icon-baoguofahuo-xianxing'
        },
        {
          name: '已发货',
          code: 'shiped',
          value: '--',
          icon: 'icon-deliver'
        },
        {
          name: '已完成',
          code: 'achived',
          value: '--',
          icon: 'icon-hezuoguanxi-xianxing'
        },
        {
          name: '退单申请',
          code: 'refungding',
          value: '--',
          icon: 'icon-offline'
        }
      ],
      itsFunction: [
        {
          name: '订单列表',
          icon: 'icon-other',
          color: 'list-btn',
          url: 'list'
        },
        {
          name: '生成采购单',
          icon: 'icon-caigou-xianxing',
          color: 'buy-btn',
          url: 'buy'
        },
        {
          name: '批量发货',
          icon: 'icon-jijianfasong-xianxing',
          color: 'sendinggroup-btn',
          url: 'send'
        },
      ]
		}
	},
	mounted: function() {
    	this.toReturn();
  	},
	methods: {
		toReturn: function() {
        this.$parent.$children[0].returnBack = false;
    	}
	},
	created(){
		this.$Axios.get(this.$ApiUrl + 'ordermanage/orderlistamount?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
      .then(response => {
        this.orderStatus = [{
            name: '未付款',
            code: 'readytopay',
            value: response.data.amount.readytopay,
            icon: 'icon-yinhangqia-xianxing'
          },
          {
            name: '待发货',
            code: 'pending',
            value: response.data.amount.pending,
            icon: 'icon-baoguofahuo-xianxing'
          },
          {
            name: '已发货',
            code: 'shiped',
            value: response.data.amount.shiped,
            icon: 'icon-deliver'
          },
          {
            name: '已完成',
            code: 'achived',
            value: response.data.amount.achived,
            icon: 'icon-hezuoguanxi-xianxing'
          },
          {
            name: '退单申请',
            code: 'refungding',
            value: response.data.amount.refungding,
            icon: 'icon-offline'
          }
        ];
      })
      .catch(error => {
        this.$message.error('连接错误');
      });
  	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
