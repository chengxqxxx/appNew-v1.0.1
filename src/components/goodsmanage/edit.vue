<template>
<div class="list-card">
  <div class="card-content">
    <div class="card-content-row">
      <span>下载默认模版：</span>
      <span><button class="download-btn" @click="$router.push('list')">请先前往商品列表下载需要批量更新的商品Excel</button></span>
    </div>
    <div class="card-content-row" style="display:inline-flex;flex-wrap:wrap">
      <span class="col-xs-12">上传文件：</span>
      <span class="col-xs-12">
        <el-upload
          class="goodsupload-area"
          drag
          :action="$ApiUrl+'productmanage/updatedproduct'"
          name="file"
          :before-upload='beforefileupload'
          :on-error	= 'handleUploadError'
          :on-success='handleFormatSuccess' ref="uploadbar">
          <div class="upload-text">
            <font-icon id="icon-shangchuandaochu"></font-icon>
            <div>将文件拖拽到此处，或点击上传</div>
          </div>
        </el-upload>
      </span>
    </div>
    <div class="card-content-row" style="text-align:center">
			<p>{{uploadtext}}</p>
			<p>{{processtext}}</p>
			<button class="confirm-btn" :disabled='uploadloading' @click='create'>{{uploadloading?'上传中...':'开始更新'}}</button>
		</div>
  </div>
</div>
</template>
<script>
export default {
  name:'GoodsmanageEdit',
  data() {
    return {
      uploadtext:'',
      processtext:'',
      datas:{},
      uploadloading:false,
    }
  },
  mounted: function() {
    this.toReturn();
  },
  methods:{
    beforefileupload(file){
      let bool  = file.name.split('.')[1] === 'xlsx';
      if(!bool){
        this.$message.error('文件格式不对!');
      }
      return bool;
    },
    toReturn: function() {
      this.$parent.$children[0].returnBack = true;
    },
    handleUploadError(){
      this.$message.error('更新出错了，请与管理员联系或检查文件！');
    },
    handleFormatSuccess(response) {
      this.uploadtext = '文件读取成功，共读取'+response.count+'个数据,可以开始同步';
			this.datas = response.datas;
    },
		create(){
			if(this.datas.length > 0){
				this.processtext='同步开始！';
				this.uploadloading=true;
				this.updateexcelproductsprocess(0,this.datas);
			}else{
				this.$message.warning('请先上传文件');
			}

		},
    updateexcelproductsprocess(index,products){
      this.$Axios.post(this.$ApiUrl + 'productmanage/createproductprocessing', {
        token: localStorage.getItem('token'),
        type: 'update',
        shopid: this.$route.params.shopid,
        product: products[index],
      }).then(response => {
        if (response.data.code == 200) {
          this.processtext='(进度'+(index+1)+'/'+products.length+')，同步中。。。。请勿关闭窗口';
          if ((index+1) != products.length) {
            index++;
            this.updateexcelproductsprocess(index, products);
          } else {
						this.datas=[];
            this.processtext = '商品更新完毕！恭喜您！';
            this.uploadloading=false;
          }
        } else {
          this.processtext='第'+(index+2)+'行数据出错，数据同步停止！商品名:'+products[index]['name'];
          this.uploadloading=false;

        }

      }).catch(error => {
        this.uploadtext='商品['+products[index]['name']+']数据出错，数据同步停止！错误原因:系统错误';
        this.$message.error('系统出错了');
        this.uploadloading=false;

      })
    },
  }
}
</script>
