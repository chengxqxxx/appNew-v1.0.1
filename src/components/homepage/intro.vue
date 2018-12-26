<template>
<div>
	<home-header></home-header>
	<div class="main-content" style="background-color:#fff;top:90px">
		<div class="main-wrapper col-xs-12 col-sm-10">
			<h3 class="page-title">生意精灵——让你的商城管理变得轻松简单</h3>
			<h5 class="page-desc">在商城的日常运营中，商家需要在客户下单后快速精准的处理订单，快速采购分拣发货，或寻求合适的供货商进行代发，除此，商家还需要不定期上架大量新品，有时需要一次性修改大量商品；便捷的订单批量管理和商品批量管理就显得尤为重要。</h5>
			<h4 class="subtitle">产品优势</h4>
			<div class="advantages">
				<div class="col-sm-3 col-xs-12"><img src="http://asset.ibanquan.com/image/5b79fb1b20663d67c6000924/s.jpeg?v=1534720795" /></div>
				<div class="col-sm-3 col-xs-12"><img src="http://asset.ibanquan.com/image/5b79fb2f26a80169cd0007d3/s.jpeg?v=1534720815" /></div>
				<div class="col-sm-3 col-xs-12"><img src="http://asset.ibanquan.com/image/5b79fb3020663d67c600092d/s.jpeg?v=1534720817" /></div>
			</div>
			<h4 class="subtitle">两大功能</h4>
			<div class="functions">
				<div class="col-sm-4 col-xs-12" style="padding:0 20px">
					<div class="icon"><font-icon style="background-color:#64B5F6" id="icon-qianshoushenpitongguo-xianxing"></font-icon></div>
					<h2>订单管理</h2>
					<h4>批量管理商城订单，一键导出Excel订单表、采购表和PDF分货单批量管理商品</h4>
					<ul>
						<li><font-icon id="icon-Raidobox-xuanzhong"></font-icon>批量导出订单：既可导出Excel订单表，也可以生成PDF分货单，满足多种业务需要</li>
						<li><font-icon id="icon-Raidobox-xuanzhong"></font-icon>批量上传单号：发货后无须挨个手动填写单号，大大缩减工作时间，减少失误</li>
						<li><font-icon id="icon-Raidobox-xuanzhong"></font-icon>一键生成采购单：自行勾选相应订单，生成所需采购单</li>
					</ul>
				</div>
				<div class="col-sm-4 col-xs-12" style="padding:0 20px">
					<div class="icon"><font-icon style="background-color:#FF80AB" id="icon-shangpin-xianxing"></font-icon></div>
					<h2>商品管理</h2>
					<h4>批量上传新商品，批量导出和修改商品</h4>
					<ul>
						<li><font-icon id="icon-Raidobox-xuanzhong"></font-icon>批量导出商品：导出所选商品Excel表，便于修改及发送给代理商等使用</li>
						<li><font-icon id="icon-Raidobox-xuanzhong"></font-icon>批量上传新商品：一次性上传多个新商品，节约时间，让您抓准时机，火速上新</li>
						<li><font-icon id="icon-Raidobox-xuanzhong"></font-icon>使用Excel批量修改商品：耗时短，防失误</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import HomeHeader from './components/header'
	export default{
		name:'Intro',
		components: { HomeHeader }
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "/../../common/stylus/index.styl"
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
	.page-desc
		padding:10px 20px
		line-height:24px
	.advantages, .functions
		display:inline-flex
		justify-content:center
		padding:20px
		div
			margin:0 20px 20px
			img
				height:100%
				width:100%
				margin-bottom:20px
				border-radius:20px
				border-1px(#e0e0e0)
			h2
				text-align:center
				margin:20px 0
			.icon
				margin:20px 0
				text-align:center
				i
					font-size:40px
					padding:10px
					border-radius:5px
					color:#fff
			h4
				margin-bottom:20px
				text-align:center
				line-height:26px
				color:#757575
			ul
				margin-bottom:40px
				li
					margin:10px 0
					line-height:24px
					i
						margin-right:10px
@media(max-width:768px)
	.main-content
		flex-wrap:wrap
		.page-title
			padding:30px 20px 10px 20px
		.advantages, .functions
			flex-wrap:wrap
</style>