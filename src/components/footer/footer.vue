<template>
<div class="footer">
	<div class="w-footer">Made for <strong>YouHaoSuDa</strong></div>
	<div class="m-footer gmd-6">
		<slot name="footer-ul"></slot>
		<slot name="footer-button"></slot>
	</div>
</div>
</template>
<script>
	export default{
		name:'Footer',
		data() {
			return{

			}
		}
	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
