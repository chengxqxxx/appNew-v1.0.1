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
					{name:'订单管理首页',url:'/ordermanage/'+this.$route.params.shopid+'/home'},
					{name:'订单列表',url:'/ordermanage/'+this.$route.params.shopid+'/list'},
					{name:'生成采购单',url:'/ordermanage/'+this.$route.params.shopid+'/buy'},
					{name:'批量发货',url:'/ordermanage/'+this.$route.params.shopid+'/send'},
				]
			}
		}
	}
</script>
