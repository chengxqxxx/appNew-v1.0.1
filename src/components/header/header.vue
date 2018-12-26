<template>
	<div class="header gmd-3">
		<div class="sidebar-button col-xs-3 col-sm-2">
			<span @click="toReturnback" v-if="returnBack"><font-icon id="icon-zhixiangzuo"></font-icon></span>
			<span @click="openMainsidebar"><font-icon id="icon-manage"></font-icon></span>
		</div>
		<div class="logo col-xs-6 col-sm-2"><slot name="logo"></slot></div>
		<div class="menubar col-sm-6">
			<ul>
				<li v-for="menu in menulist"><router-link :to='menu.path'>{{ menu.name }}</router-link></li>
			</ul>
		</div>
		<div class="userbar col-xs-3 col-sm-2" style="cursor:pointer;" @click="openUserpopup">
			<font-icon id="icon-mine"></font-icon>
			<span>{{ user.email }}</span>
		</div>
		<main-sidebar v-show="mainSidebar" @close="closeMainsidebar"></main-sidebar>
		<user-popup v-show="userPopup" @close="closeUserpopup"></user-popup>
	</div>
</template>
<script>
import MainSidebar from './mainsidebar.vue'
import UserPopup from './userpopup.vue'
export default{
	name:'Header',
	components: { MainSidebar, UserPopup },
	data() {
		return{
			menulist: [
				{name:"后台首页" , path:'/dashboard/home'},
				{name:"功能介绍" , path:'/dashboard/intro'},
				{name:"使用教程" , path:'/dashboard/tutorial'},
				{name:"联系客服" , path:'/dashboard/contact'},
			],
			mainSidebar: false,
			userPopup: false,
			user: {email:localStorage.getItem('email')},
			returnBack: false
		}
	},
	methods: {
		openMainsidebar() {
			this.mainSidebar = true;
		},
		closeMainsidebar() {
			this.mainSidebar = false;
		},
		openUserpopup() {
			this.userPopup = true;
		},
		closeUserpopup() {
			this.userPopup = false;
		},
		toReturnback() {
			this.$router.go(-1);
		}
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
