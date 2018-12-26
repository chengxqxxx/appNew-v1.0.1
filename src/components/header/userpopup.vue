<template>
	<transition name="fade">
		<div class="user-popup-backdrop" @click="closePopup">
			<div class="user-popup gmd-3" @click.stop>
				<ul>
					<a @click="toUsersetup"><li class="ripple-menu">用户首页</li></a>
					<div @click='logout' style="cursor:pointer;"><li class="ripple-menu">退出登录</li></div>
				</ul>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		name: 'UserPopup',
		data() {
			return{
				user: {
					name: 'einflsie'
				},
				userSidebar: true,
			}
		},
		methods: {
			logout(){
				localStorage.removeItem('token');
				localStorage.removeItem('email');
				this.$router.push('/');
			},
			closePopup() {
				this.$emit('close');
			},
			toUsersetup() {
				this.$router.push('/dashboard/usersetup');
				this.$emit('close');
			}
		}
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
