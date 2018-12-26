<template>
<div>
  <div class="list-card">
    <div class="card-content">
      <button>创建一个新的上传模板</button><span>下载一个空模板</span>
    </div>
  </div>

  <div v-if="productsrule.length > 0" class="list-card">
    <div class="card-content">
      <button>创建一个新的上传模板</button><span>下载一个空模板</span>
    </div>
  </div>
	<div v-else class="list-card">
		<div class="card-content">
      <span>暂未建立任何模板</span>
    </div>
	</div>
</div>
</template>
<script>
export default {
  name: 'GoodsmanagePersonal',
  data() {
    return {
			productsrule:[],

    }
  }
}
</script>
