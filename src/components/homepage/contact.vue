<template>
<div>
	<home-header></home-header>
<div class="main-content" style="background-color:#fff;top:90px">
	<div class="main-wrapper col-sm-12">
		<h3 class="page-title">联系方式</h3>
		<h4 class="subtitle">微信客服（扫描下方二维码）</h4>
		<div class="advantages" style="width:100%;margin:20px 0">
			<div class="col-sm-9 col-xs-12" style="text-align:center"><img style="width:30%;height:auto" src="http://asset.ibanquan.com/image/5b851af120663d61cc000385/s.jpeg%3Fv=1535450006" /></div>
		</div>
	</div>
</div>
</div>
</template>
<script>
	import HomeHeader from './components/header'
	export default{
		name:'Contact',
		components: { HomeHeader }
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
.main-content
	overflow-y:scroll!important
	justify-content:center
	.page-title, .subtitle
		line-height:30px
		font-weight:600
		text-align:center
	.page-title
		padding:50px 0 20px
	.subtitle
		padding:20px 0 10px
	.advantages
		display:inline-flex
		flex-wrap:wrap
		justify-content:center
		div
			margin:0 20px 20px
			line-height:20px
			img
				height:100%
				width:100%
				margin-bottom:20px
				border-radius:20px
				border-1px(#e0e0e0)
@media(max-width:768px)
	.main-content
		flex-wrap:wrap
		.page-title
			padding:30px 20px 10px 20px
		.advantages, .functions
			flex-wrap:wrap
</style>