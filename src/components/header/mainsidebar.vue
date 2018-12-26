<template>
<transition name="fade">
	<div class="main-sidebar-backdrop" @click="closeMainsidebar">
		<div class="main-sidebar gmd-3" @click.stop>
			<button @click="closeMainsidebar"><font-icon id="icon-cuowuguanbiquxiao-yuankuang"></font-icon></button>
			<ul>
				<a @click="toHome"><li>后台首页</li></a>
				<a @click="toIntro"><li>功能介绍</li></a>
				<a @click="toTuto"><li>使用教程</li></a>
				<a @click="toCon"><li>联系客服</li></a>
				<a @click="toUsersetup"><li>用户首页</li></a>
			</ul>
		</div>
	</div>
</transition>
</template>
<script>
export default{
	name:'MainSidebar',
	data() {
		return{
		}
	},
	methods: {
		closeMainsidebar() {
			this.$emit('close');
		},
		toHome() {
			this.$router.push('/dashboard/home');
			this.$emit('close');
		},
		toUsersetup() {
			this.$router.push('/dashboard/usersetup');
			this.$emit('close');
		},
		toIntro() {
			this.$router.push('/dashboard/intro');
			this.$emit('close');
		},
		toTuto() {
			this.$router.push('/dashboard/tutorial');
			this.$emit('close');
		},
		toCon() {
			this.$router.push('/dashboard/contact');
			this.$emit('close');
		}
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>