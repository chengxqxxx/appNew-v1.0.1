<template>
	<div class="login">
		<div class="wrap col-xs-12 col-sm-4">
			<h1>生意精灵</h1>
			<h4>有效管理平台订单，批量上传商品，让你轻松做生意</h4>
			<div class="input-field">
				<div class="input-item">
					<input v-model="email" v-validate="'required|email'" name="email" type="text" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('email')}" placeholder="请输入邮箱" />
					<p class="input-error" v-show="errors.has('email')">{{ errors.first('email') }}</p>
				</div>
				<div class="input-item">
					<input v-model="password" v-validate="'required|min:6'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('password')}" name="password" type="password" placeholder="请输入密码" />
					<p class="input-error" v-show="errors.has('password')">{{ errors.first('password') }}</p>
				</div>
				<router-link to="/forget" class="toforget">忘记密码</router-link>
				<div>
					<button @click="login">登&nbsp;&nbsp;&nbsp;录</button>
					<p class="toregister">
						第一次使用？前往&nbsp;
						<router-link to="/register" class="strong">注册</router-link>
					</p>
				</div>
				<div class="footer">Made for <span class="strong">YouHaoSuDa</span></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'Login',
		data() {
			return{
				email: '',
				password:''
			}
		},
		methods: {
			login() {
      			this.$validator.validateAll().then((result) => {
        			if (result) {
          			// eslint-disable-next-line
          				this.$Axios.post(this.$ApiUrl + 'user/login', {
              				email: this.email,
              				password: this.password
            			})
            			.then(response => {
              				if (response.data.code == 401) {
                				this.$message.error(response.data.msg);
              				} else if (response.data.code == 402) {
                				this.$message.error(response.data.msg);
              				} else if (response.data.code == 200) {
                				localStorage.setItem('token', response.data.token);
												localStorage.setItem('email', response.data.email);
                				this.$message.success(response.data.msg);
                				setTimeout(()=>{
                  				this.$router.push('/dashboard/home');
                				},1000);
              				}
            			})
            			.catch(error => {
              				this.$message.warning('系统连接错误！！');
            			});
        			} else {
          				this.$message.warning('请输入邮箱和密码');
        			}
      			});
  			}
		},
		created() {
    		if(localStorage.getItem('token')){
      			this.$message.success('已登陆！欢迎回来！')
      			this.$router.push('/dashboard/home');
    		}
		}
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
