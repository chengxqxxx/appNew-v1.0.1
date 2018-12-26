<template>
<div>
  <transition name="fade">
    <div class="uploadmodal-backdrop" v-show="copyshow">
      <div class="uploadmodal gmd-6" @click.stop>
        <h2>检测到重复商品！！总计{{copydatas.length}}个商品重复</h2>
        <div v-if='copydatas.length>0' style="width: 550px;height: 200px;line-height: 25px;overflow: auto;">
          <li v-for='(data , index) in copydatas' :key='index'>
            {{data.name}} 条形码:<span v-for="(variant , index) in data.variants" :key='index'>{{variant.barcode}} -</span>存在重复
          </li>
        </div>
        <button @click='closecopyshow' class="confirm-btn">取消更新</button>
        <button @click='newdatascreate' class="confirm-btn">跳过重复创建</button>
        <button @click='copynewdatascreate' class="confirm-btn">重复新增创建</button>
        <p>跳过重复创建：重复商品不会创建为新商品，可以通过批量编辑进行更新商品</p>
        <p>重复新增创建：重复商品将作为新商品进行创建</p>

      </div>
    </div>
  </transition>
  <div class="list-card">
    <div class="card-content">
      <div class="card-content-row">
        <span>下载默认模版：</span>
        <span><button class="download-btn" @click='exampledownload'>商品批量上传模版</button></span>
      </div>
      <div class="card-content-row" style="display:inline-flex;flex-wrap:wrap">
        <span class="col-xs-12">上传文件：</span>
        <span class="col-xs-12">
				<el-upload
					class="goodsupload-area"
					drag
					:action="$ApiUrl+'productmanage/createdproduct'"
					:data="token"
					name="file"
					:before-upload='beforefileupload'
					:on-error	= 'handleUploadError'
					:on-progress	= 'handleprogress'
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
        <button class="confirm-btn" :disabled='uploadloading' @click='create'>{{uploadloading?'上传中...':'开始上传'}}</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'GoodsmanageAdd',
  data() {
    return {
      uploadtext: '',
      processtext: '',
      copydatas: [],
      newdatas: [],
      token: {},
      datas: {},
      uploadloading: false,
      copyshow: false,
    }
  },
  mounted: function() {
    this.toReturn();
  },
  created() {
    this.token = {
      token: localStorage.getItem('token')
    };
  },
  methods: {
    newdatascreate() {
      this.copyshow = false;
			if (this.newdatas.length > 0) {
				this.processtext = '同步开始！';
				this.uploadloading = true;
				this.updateexcelproductsprocess(0, this.newdatas);
			} else {
				this.$message.warning('没有新产品上传');
			}

    },
    copynewdatascreate() {
      this.copyshow = false;
      this.processtext = '同步开始！';
      this.uploadloading = true;
      this.newdatas = this.newdatas.concat(this.copydatas);
      // console.log(this.newdatas);
      this.updateexcelproductsprocess(0, this.newdatas);
    },
    closecopyshow() {
      this.copyshow = false;
    },
    exampledownload() {
      window.open(this.$ApiUrl + 'productmanage/uploadproductexample', '_blank');
    },
    beforefileupload(file) {
      let bool = file.name.split('.')[1] === 'xlsx';
      if (!bool) {
        this.$message.error('文件格式不对!');
      }
      return bool;
    },
    toReturn: function() {
      this.$parent.$children[0].returnBack = true;
    },
    handleprogress() {
      this.uploadtext = '正在智能匹配文件中....';
      this.uploadloading = true;
    },
    handleUploadError() {
      this.$message.error('更新出错了，请与管理员联系或检查文件！');
      this.uploadtext = '出错了！请检查文件是否正确或者与管理员联系';
      this.uploadloading = false;

    },
    handleFormatSuccess(response) {
      this.uploadloading = false;
      this.uploadtext = '文件读取成功，共读取' + response.count + '个数据,可以开始同步';
      this.copydatas = response.copydatas;
      this.newdatas = response.newdatas;
      if (response.copydatas.length > 0) {
        this.copyshow = true;
      }
      // this.datas = response.datas;
    },
    create() {

      if (this.copydatas.length > 0) {
        this.copyshow = true;
      } else {
        if (this.newdatas.length > 0) {
          this.processtext = '同步开始！';
          this.uploadloading = true;
          this.updateexcelproductsprocess(0, this.newdatas);
        } else {
          this.$message.warning('请先上传文件');
        }
      }

    },
    updateexcelproductsprocess(index, products) {
      this.$Axios.post(this.$ApiUrl + 'productmanage/createproductprocessing', {
        token: localStorage.getItem('token'),
        type: 'create',
        shopid: this.$route.params.shopid,
        product: products[index],
      }).then(response => {
        if (response.data.code == 200) {
          this.processtext = '(进度' + (index + 1) + '/' + products.length + ')，同步中。。。。请勿关闭窗口';
          if ((index + 1) != products.length) {
            index++;
            this.updateexcelproductsprocess(index, products);
          } else {
            this.datas = [];
            this.processtext = '商品创建完毕！恭喜您！';
            this.uploadloading = false;
          }
        } else {
          this.processtext = '数据出错，数据同步停止！商品名:' + products[index]['name'] + '【错误原因】:' + response.data.msg;
          this.uploadloading = false;

        }

      }).catch(error => {
        this.uploadtext = '商品[' + products[index]['name'] + ']数据出错，数据同步停止！错误原因:系统错误';
        this.$message.error('系统出错了');
        this.uploadloading = false;

      })
    },
  }
}
</script>
