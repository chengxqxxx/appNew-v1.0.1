<template>
<div class="goodsmanage">
	<v-header>
		<router-link to="home" slot="logo"><h2>商品管理</h2></router-link>
	</v-header>
	<div class="main-content">
		<div class="side-wrapper col-xs-12 col-sm-3">
			<div class="sidemenu-card gmd-1">
				<v-sidemenubar></v-sidemenubar>
			</div>
		</div>
		<div class="main-wrapper col-xs-12 col-sm-9">
			<router-view />
		</div>
	</div>
	<v-footer>
		<ul slot="footer-ul">
			<li><router-link to="home"><font-icon id="icon-homepage"></font-icon><p>商品首页</p></router-link></li>
			<li><router-link to="list"><font-icon id="icon-gonggeshitu"></font-icon><p>商品列表</p></router-link></li>
		</ul>
	</v-footer>
</div>
</template>
<script>
import Header from '../header/header.vue'
import Footer from '../footer/footer.vue'
import SideMenubar from './components/sidemenubar.vue'
export default {
	name: 'Goodsmanage',
	components: {
		'v-header':Header,
		'v-footer': Footer,
		'v-sidemenubar': SideMenubar
	},
	data() {
		return{

		}
	},
	created(){
		this.$Axios.get(this.$ApiUrl + 'productmanage/productinicheck?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid + '&functionid=2')
    .then(response=>{
      if(response.data.code == 402){
        // this.$message.success('欢迎使用！');
      }else if(response.data.code == 200){
        this.$message.warning('尚未初始化，即将进入初始化界面');
        this.$router.push('/dashboard/productinit/'+this.$route.params.shopid+'/2');
      }else{
        this.$message.error(response.data.msg);
        this.$router.push('/dashboard/home');
      }
    })
    .catch(error=>{
      this.$message.error('连接错误！');
      this.$router.push('/dashboard/home');
    });
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
	@import "../../common/stylus/index.styl"
</style>
