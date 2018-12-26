<template>
<div class="main-content add-main-content">
	<div class="side-wrapper col-xs-12 col-sm-4">
		<div>
			<div class="collapse-card gmd-1">
				<div class="card-title">
					连接店铺教程
				</div>
				<ul>
					<li v-for="(item,index) in collapseList">
						<p @click="changePanel(index)">{{ item.title }}</p>
						<div v-show="item.showPanel"><img :src="item.img" /></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="main-wrapper col-xs-12 col-sm-8">
		<div class="add-card gmd-7">
			<div class="card-title">填写App Key和App Secret</div>
			<div class="card-content">
				<div class="input-group">
					<div class="input-item"><label>App Key: </label><input placeholder="请输入App Key" v-model="apikey" :disabled="connect" /></div>
					<div class="input-item"><label>App Secret: </label><input placeholder="请输入App Secret" v-model="apisecret" :disabled="connect" /></div>
				</div>
				<div class="input-group">
					<button v-if="!connected" :disabled="loading" @click="check">{{ buttontext }}</button>
					<button v-else @click="rest">{{ buttontext }}</button>
				</div>
				<div class="shop-connect-info">
					<p>店铺名称：<span>{{ shop.name }}</span></p>
					<p>店铺地址：<span>{{ shop.url }}</span></p>
				</div>
				<div class="input-group">
					<button @click="addshop" :disabled="shouquan">授权连接</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'DashboardAdd',
	data() {
		return{
			collapseList: [
				{title: "第一步：进入友好速搭后台添加私有应用", showPanel: false,img:"http://asset.ibanquan.com/image/5b7d5f2b180e1642d80009ad/s.jpeg?v=1534943019"},
				{title: "第二步：点击编辑按钮，进入修改应用名", showPanel: false,img:"http://asset.ibanquan.com/image/5b7d5f2120663d41a8000948/s.jpeg?v=1534943009"},
				{title: "第三步：查看应用的App Key和App Secret", showPanel: false,img:"http://asset.ibanquan.com/image/5b7d5f1d180e1642dc0009cf/s.jpeg?v=1534943005"},
			],
			shop: {},
			apikey: '',
			apisecret: '',
			connect:false,
			loading:false,
			connected:false,
			shouquan:false,
			buttontext: '连接店铺'
		}
	},
	mounted: function() {
		this.toReturn();
	},
	methods: {
		changePanel: function(index){
			var temp = this.collapseList;
			temp[index].showPanel = !temp[index].showPanel;
			this.collapseList = temp;
		},
		toReturn() {
			this.$parent.$children[0].returnBack = true;
		},
		check(){
      		this.loading=true;
      		this.connect=true;
      		this.buttontext='连接中...';
      		this.$Axios.post(this.$ApiUrl+'shop/checkshopapi',{
        		apikey:this.apikey,
        		apisecret:this.apisecret
      		}).then(response=>{
        		if(response.data.code === 200){
          		this.$message.success(response.data.msg);
          		this.shop = response.data.shop;
          		this.connected=true;
							this.buttontext='重置信息';
        		}else{
          		this.$message.warning(response.data.msg);
          		this.connect=false;
							this.buttontext='连接店铺';
        		}
        		this.loading=false;
      		}).catch(error=>{
        		this.$message.warning('信息错误或系统错误！');
        		this.connect=false;
        		this.loading=false;
        		this.buttontext='连接店铺';
      		});
    	},
    	rest(){
      		this.apikey='';
      		this.apisecret='';
      		this.connected=false;
      		this.connect=false;
					this.buttontext='连接店铺';
      		this.shop={};
    	},
    	addshop(){
      		if(this.connected){
        		this.shouquan=true;
        		this.$Axios.post(this.$ApiUrl+'shop/addshopapi',{
          		token:localStorage.getItem('token'),
          		apikey:this.apikey,
          		apisecret:this.apisecret,
          		shop:this.shop
        		}).then(response=>{
          		if(response.data.code === 200){
            		this.$message.success(response.data.msg);
          		}else{
            		this.$message.error(response.data.msg);
          		}
          		this.shouquan=false;
        		}).catch(error=>{
          		this.$message.error('连接错误');
          		this.shouquan=false;
        		})
      		}else{
        		this.$message.warning('还未连接店铺');
      		}
    	}
	},
	created(){
  	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
