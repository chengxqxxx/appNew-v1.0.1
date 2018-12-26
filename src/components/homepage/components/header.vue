<template>
<div>
	<transition name="fade">
		<div class="home-m-menu" v-show="homeMMenu">
			<button @click=closeMenu><font-icon id="icon-cuowuguanbiquxiao-yuankuang"></font-icon></button>
			<ul>
				<li><router-link to="/">首页</router-link></li>
				<li><router-link to="/intro">功能介绍</router-link></li>
				<li><router-link to="/tutorial">使用教程</router-link></li>
				<li><router-link to="/contact">联系客服</router-link></li>
			</ul>
		</div>
	</transition>
	<div class="home-header">
		<span class="logo col-sm-3 col-xs-5"><router-link to="/"><h1>生意精灵</h1></router-link></span>
		<span class="menu col-sm-6">
			<ul>
				<li><router-link to="/">首页</router-link></li>
				<li><router-link to="/intro">功能介绍</router-link></li>
				<li><router-link to="/tutorial">使用教程</router-link></li>
				<li><router-link to="/contact">联系客服</router-link></li>
			</ul>
		</span>
		<span class="loginbuttons col-sm-3 col-xs-6">
			<button @click="toUse">开始使用</button>
			<button @click="toLogin">登录</button>
		</span>
		<span class="col-xs-1" style="text-align:right">
			<button class="ham-menubar" @click="openMenu"><font-icon id="icon-caidan"></font-icon></button>
		</span>
	</div>
</div>
</template>
<script>
export default{
	name:'HomeHeader',
	data() {
		return{
			homeMMenu:false
		}
	},
	methods:{
		openMenu() {
			this.homeMMenu = true;
		},
		closeMenu() {
			this.homeMMenu = false;
		},
		toUse() {
			this.$router.push('/register');
		},
		toLogin() {
			this.$router.push('/login');
		}
	}
}
</script>
<style lang="stylus" type="stylesheet/stylus">
.home-header
	display:flex
	height:40px
	padding:40px 4% 70px
	.loginbuttons
		text-align:right
	.menu
		text-align:right
	.logo
		h1
			font-weight:500
			color:#4DD0E1
	ul
		li
			display:inline-block
			padding:10px 5%
			font-size:16px
			a
				color:#2b3333
	.loginbuttons
		button
			padding:10px 20px
			border-radius:5px
			&:first-child
				background-color:#4DD0E1
				color:#fff
				border:none
				margin-right:30px
			&:last-child
				background:none
				color:#4DD0E1
				border:#4DD0E1 1px solid
.ham-menubar
	display:none
.home-m-menu
	position:fixed
	top:0
	left:0
	bottom:0
	right:0
	width:100%
	background-color:#fff
	z-index:11
	&.fade-enter-active, &.fade-leave-active
		transition:all .5s ease
	&.fade-enter, &.fade-leave-active
		opacity: 0
		transform:translateX(100%)
	ul
		margin-top:60px
		text-align:center
		li
			padding:20px
	button
		position:absolute
		right:20px
		top:20px
		padding:0
		background:none
		border:none
		i
			font-size:20px
			color:#9E9E9E

@media (max-width:990px)
	.home-header
		ul
			li
				padding:10px 2%
		.loginbuttons
			button
				padding:5px 10px
				&:first-child
					margin-right:10px

@media (max-width:768px)
	.home-header
		height:30px
		padding-top:20px
		padding-bottom:20px
		.menu
			display:none
		.ham-menubar
			display:inline-block
			border:none
			background:none
			i
				font-size:20px
</style>