<template>
<div class="dashboard">
	<v-header>
		<router-link to="home" slot="logo"><h2>生意精灵</h2></router-link>
	</v-header>
	<router-view />
	<v-footer>
    <ul slot="footer-ul">
      <li><router-link to="/dashboard/home"><font-icon id="icon-homepage"></font-icon><p>首页</p></router-link></li>
      <li><router-link to="/dashboard/addfunction"><font-icon id="icon-gonggeshitu"></font-icon><p>更多功能</p></router-link></li>
    </ul>
  </v-footer>
</div>
</template>
<script>
import Header from '../header/header.vue'
import Footer from '../footer/footer.vue'
export default {
	name: 'Dashboard',
	components: {
    	'v-footer': Footer,
		'v-header':Header,
	},
	data() {
		return{

		}
	},
	created(){
        if (localStorage.getItem('token')) {
      		this.$Axios.get(this.$ApiUrl+'user/valiuser?token='+localStorage.getItem('token'))
      	.then(response=>{
        	if(response.data.code == 200){
          		// this.$router.push('/dashboard/home');
        	}else{
						this.$message.error(response.data.msg);
						localStorage.removeItem('token');
						localStorage.removeItem('email');
						this.$router.push('/login');
					}
      	}).catch(error=>{
					this.$message.error('系统连接错误');
				});
    	} else{
      		this.$router.push('/login');
    	}
  	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
