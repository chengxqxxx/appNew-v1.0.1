<template>
	<div class="register">
		<div class="wrap col-xs-12 col-sm-4">
			<h1>生意精灵</h1>
			<h4>有效管理平台订单，批量上传商品，让你轻松做生意</h4>
			<div class="input-field">
				<div class="input-item">
					<input v-model="email" v-validate="'required|email'"  name="email" type="text" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('email')}" placeholder="请输入邮箱" />
					<p class="input-error" v-show="errors.has('email')">{{ errors.first('email') }}</p>
				</div>
				<div class="input-item">
					<input v-model="password" placeholder="请输入密码" v-validate="'required|min:6'" name="password" type="password" data-vv-delay="500" ref="password" :class="{'input': true, 'is-danger': errors.has('password')}" />
					<p class="input-error" v-show="errors.has('password')">{{ errors.first('password') }}</p>
				</div>
				<div class="input-item">
					<input v-model="passwordconfirm" placeholder="请再次输入密码" v-validate="'required|confirmed:password'" data-vv-delay="500" name="confirm_field" :class="{'input': true, 'is-danger': errors.has('confirm_field')}" type="password" />
					<p class="input-error" v-show="errors.has('confirm_field')">{{ errors.first('confirm_field') }}</p>
				</div>
				<div>
					<button @click="register">注&nbsp;&nbsp;&nbsp;册</button>
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
		name:'Register',
		data() {
			return{
				email: '',
				password:'',
				passwordconfirm: ''
			}
		},
		methods: {
			register() {
      			this.$validator.validateAll().then((result) => {
        			if (result) {
          			// eslint-disable-next-line
          				this.$Axios.post(this.$ApiUrl + 'user/register', {
              				email: this.email,
              				password: this.password
            			})
            			.then(response => {
              			if (response.data.code == 200) {
                				// localStorage.setItem('token', response.data.token);
                				this.$message.success(response.data.msg);
                				setTimeout(()=>{
                  				this.$router.push('/login');
                				},1000);
              				}else{
												this.$message.error(response.data.msg);
											}
            			})
            			.catch(error => {
              				this.$message.error('系统错误！请稍后再试！');
            			});
        			} else {
          				this.$message.warning('请输入正确的信息');
        			}
      			});
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
