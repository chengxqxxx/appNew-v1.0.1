<template>
	<div class="forget">
		<div class="wrap col-xs-12 col-sm-4">
			<h1>生意精灵</h1>
			<h4>有效管理平台订单，批量上传商品，让你轻松做生意</h4>
			<div class="input-field">
				<div class="input-item">
					<input :disabled="loading" v-model="email" v-validate="'required|email'"  name="email" type="text" data-vv-delay="800" :class="{'input': true, 'is-danger': errors.has('email')}" placeholder="请输入注册邮箱" />
					<p class="input-error" v-show="errors.has('email')">{{ errors.first('email') }}</p>
				</div>
				<div>
					<button @click="forget" :disabled='loading'>{{ buttontext }}</button>
					<p class="tologin">
						第一次使用？前往&nbsp;
						<router-link to="/login" class="strong">登录</router-link>
					</p>
				</div>
				<div class="footer">Made for <span class="strong">YouHaoSuDa</span></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'Forget',
		data() {
			return{
				email: '',
				loading:false,
				buttontext:'找回密码'
			}
		},
		methods: {
			forget() {
				this.loading=true;
				this.buttontext='处理中...';
      			this.$Axios.post(this.$ApiUrl+'user/forgetpass',{
        			email:this.email,
          		})
          		.then(response=>{
              		if(response.data.code == 200){
              			this.$message.success(response.data.msg);
            		}else{
            			this.$message.error(response.data.msg);
              		}
                	this.loading=false;
              		this.buttontext='找回密码';
                })
              	.catch(error=>{
                	this.$message.error('连接错误！！！！');
                })
  			}
		},
		created() {
    		if(localStorage.getItem('token')){
      			this.$message.success('已登陆！欢迎回来！')
      			this.$router.push('/dashboard');
    		}
		}
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
