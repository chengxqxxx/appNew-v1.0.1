<template>
<div>
	<home-header></home-header>
	<swiper :options="swiperOption">
		<swiper-slide ref="swiperSlide" v-for="(img,index) in imgs" :key="index">
			<router-link to="/register"><img style="width:100%" ref="slideimg" :src="img.url" /></router-link>
		</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>
	<div class="madefor">
		<h4>专为<span>友好速搭</span>打造的订单/商品管理插件</h4>
		<h5>使用友好速搭电商搭建平台的用户，只需要简单几步即可安装生意精灵插件并同步信息，管理您在友好速搭平台上产生的订单及所有商品</h5>
	</div>
	<div class="features">
		<h2 class="col-sm-12">工作不再忙，轻松做电商</h2>
		<div style="display:flex;flex-wrap:wrap;padding:0 20px;justify-content:center">
			<div class="col-sm-3 col-xs-12">
				<div class="feature-part">
					<font-icon tt="icon-shoujiyunyingshang" id="icon-shoujiyunyingshang"></font-icon>
					<h4>随时随地办公</h4>
					<p>电脑平板手机端自适应，不论去哪儿，不管何时都可以快速办公</p>
				</div>
			</div>
			<div class="col-sm-3 col-xs-12">
				<div class="feature-part">
					<font-icon id="icon-shebaorenzheng"></font-icon>
					<h4>体量轻，操作易</h4>
					<p>不需要复杂的学习过程，直接上手即会使用，操作简单</p>
				</div>
			</div>
			<div class="col-sm-3 col-xs-12">
				<div class="feature-part">
					<font-icon id="icon-shangchuanziliao"></font-icon>
					<h4>批量管理</h4>
					<p>缩短工作时间，提升工作效率，减少失误率</p>
				</div>
			</div>
		</div>
	</div>
	<div class="hfooter">
		<div class="col-sm-4">
			<p>生意精灵<br/> Made for 友好速搭</p>
		</div>
		<div class="col-sm-4">
			<ul>
				<li><router-link to="/intro">功能介绍</router-link></li>
				<li><router-link to="/tutorial">使用教程</router-link></li>
				<li><router-link to="/contact">联系客服</router-link></li>
			</ul>
		</div>
		<div class="col-sm-4">
			<p>微信客服</p>
			<img class="qrcode" src="http://asset.ibanquan.com/image/5b851af120663d61cc000385/s.jpeg?v=1535450006" />
		</div>
	</div>
</div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide } from 'vue-awesome-swiper'
import HomeHeader from './components/header'
export default{
	name:'homepage',
	components: {swiper,swiperSlide, HomeHeader},
	data() {
		return{
			swiperOption: {
				height:504,
				pagination: {
					el: '.swiper-pagination',
					clickable:true
				},
				autoplay: {
					disableOnInteraction:false,
					delay:4000
				},
				loop:true,
				paginationClickable: true,
				slidesPerView:1,
				mousewheel:false
			},
			imgs: [
				{ url:'http://asset.ibanquan.com/image/5b846ccf4194e56d7c000185/s.jpeg?v=1535405264' },
				{ url:'http://asset.ibanquan.com/image/5b846cd2180e16625000010b/s.jpeg?v=1535405266' },
				{ url:'http://asset.ibanquan.com/image/5b846ccd20663d61cc00012a/s.jpeg?v=1535405262' },
			],
		}
	},
}
</script>
<style lang="stylus" type="stylesheet/stylus">
.madefor
	margin-top:40px
	padding:60px 40px
	height:90px
	background-color:#4DD0E1
	h4, h5
		color:#fff
		text-align:center
		line-height:24px
	h4
		span
			margin:0 10px
			font-size:28px
	h5
		margin-top:20px
.features
	margin-top:20px
	padding:60px 40px
	h2
		position:relative
		margin-bottom:40px
		color:#2b3333
		text-align:center
		&:after
			position:absolute
			top:40px
			left:50%
			margin-left:-50px
			content:''
			width:100px
			height:5px
			background:#4DD0E1
	.feature-part
		margin:0 18px
		padding-top:40px
		height:240px
		text-align:center
		i
			font-size:60px
			color:#80DEEA
		h4
			margin-top:40px
		p
			margin:30px 20px
			line-height:25px
.learnmore
	height:150px
	background-color:#B2EBF2
	h1
		color:#fff
		padding:60px
.hfooter
	display:flex
	height:210px
	background-color:#37474F
	color:#fff
	text-align:center
	p
		padding-top:30px
		line-height:20px
	ul
		padding-top:34px
		li
			padding-bottom:20px
			a
				color:#fff
	img
		width:100px
		height:100px
		margin-top:20px
.swiper-pagination-bullet
	outline:none
.swiper-pagination-bullet-active
	background-color:#4DD0E1!important


@media (max-width:768px)
	.madefor
		margin-top:20px
		padding:20px
		height:100px
		h4
			font-size:14px
			span
				margin:0 5px
				font-size:16px
		h5
			font-size:12px
			line-height:20px
	.features
		padding:20px
		h2
			margin-bottom:20px
			font-size:16px
		.feature-part
			height:180px
			margin:0 25px
			h4
				margin-top:30px
			p
				margin-top:20px
</style>