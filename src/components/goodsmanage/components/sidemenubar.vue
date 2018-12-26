<template>
	<div>
		<ul>
			<li v-for="sidemenu in sidemenulist"><router-link :to="sidemenu.url">{{ sidemenu.name }}</router-link></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'SideMenubar',
		data() {
			return {
				sidemenulist: [
					{name:'商品管理首页',url:'/goodsmanage/'+this.$route.params.shopid+'/home'},
					{name:'商品列表',url:'/goodsmanage/'+this.$route.params.shopid+'/list'},
					{name:'批量添加',url:'/goodsmanage/'+this.$route.params.shopid+'/add'},
					{name:'批量修改',url:'/goodsmanage/'+this.$route.params.shopid+'/edit'},
					// {name:'自定义上传文件',url:'/goodsmanage/'+this.$route.params.shopid+'/personal'},
				]
			}
		}
	}
</script>
