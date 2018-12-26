<template>
<div>
	<div class="main-card">
		<div class="card-title">
			商品概览
			<router-link to="list">查看详情</router-link>
		</div>
		<h3>{{ staticError }}</h3>
		<div class="card-statics">
			<div class="card-statics-item" v-for="goodsstatus in goodsStatus" :key="goodsstatus.code">
				<h6>{{ goodsstatus.name }}</h6>
				<h3>{{ goodsstatus.value }}</h3>
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
	name: 'GoodsmanageHome',
	data() {
		return{
			staticError: '',
			shopError: '',
			goodsStatus: [
        {
          name: '全部商品',
          code: 'readytopay',
          value: '--',
          icon: 'icon-yinhangqia-xianxing'
        },
        {
          name: '已上架',
          code: 'pending',
          value: '--',
          icon: 'icon-baoguofahuo-xianxing'
        },
        {
          name: '未上架',
          code: 'shiped',
          value: '--',
          icon: 'icon-deliver'
        },
      ],
      itsFunction: [
        {
          name: '商品列表',
          icon: 'icon-other',
          color: 'list-btn',
          url: 'list'
        },
        {
          name: '批量添加',
          icon: 'icon-service',
          color: 'add-btn',
          url: 'add'
        },
        {
          name: '批量修改',
          icon: 'icon-brush',
          color: 'edit-btn',
          url: 'edit'
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
		this.$Axios.get(this.$ApiUrl + 'productmanage/productlistamount?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
      .then(response => {
				this.goodsStatus = [
	        {
	          name: '全部商品',
	          code: 'readytopay',
	          value: response.data.amount.all,
	          icon: 'icon-yinhangqia-xianxing'
	        },
	        {
	          name: '已上架',
	          code: 'pending',
	          value: response.data.amount.alreadysale,
	          icon: 'icon-baoguofahuo-xianxing'
	        },
	        {
	          name: '未上架',
	          code: 'shiped',
	          value: response.data.amount.notsale,
	          icon: 'icon-deliver'
	        },
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
