<template>
<div>
  <transition name="fade">
    <div class="searchbar-backdrop" v-show="listcardSearchbar" @click="closeSearchbar">
      <div class="gmd-6" @click.stop>
        <input v-model='searchvalue' placeholder="输入商品名/关键词用空格分开" />
        <button @click='search'><font-icon id="icon-search"></font-icon></button>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div class="optionbar-backdrop" v-show="downloadcardOptionbar" @click="closedownloadOptionbar">
      <div class="gmd-6" @click.stop>
        <div>
          <span>下载所选择的商品</span><button @click='outtoexcelcatalog' class="confirm-btn">下载Excel</button>

        </div>
        <div>
          <span>下载当前条件下所有商品</span><button @click='outtoallexcelcatalog' class="confirm-btn">下载Excel</button>

        </div>


        <div>
          <button @click='closedownloadOptionbar' class="reset-btn">关闭</button>
        </div>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div class="optionbar-backdrop" v-show="listcardOptionbar" @click="closeOptionbar">
      <div class="gmd-6" @click.stop>
        <div>
          <span>品牌：</span>
          <el-select v-model="markValue" multiple placeholder="可选择多个品牌">
            <el-option class="goods-options" v-for="mark in marks" :key="mark.id" :label="mark.name" :value="mark.name">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>分类：</span>
          <el-select v-model="optionValue" multiple placeholder="可选择多个分类">
            <el-option v-for="option in options" :key="option.id" :label="option.name" :value="option.name">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>上架情况：</span>
          <el-select v-model="onsaleValue" placeholder="可选择多个标签">
            <el-option v-for="onsale in onsales" :key="onsale.value" :label="onsale.label" :value="onsale.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <button @click='resetshaixuan' class="reset-btn">重置</button>
          <button @click='shaixuan' class="confirm-btn">筛选</button>
        </div>
      </div>
    </div>
  </transition>
  <div class="list-card">
    <div class="list-card-menubar">
      <div class="menubar-options">
        <div class="col-sm-4">
          <span>品牌：</span>
          <el-select v-model="markValue" multiple placeholder="可选择多个品牌">
            <el-option v-for="mark in marks" :key="mark.id" :label="mark.name" :value="mark.name">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-4">
          <span>分类：</span>
          <el-select v-model="optionValue" multiple placeholder="可选择多个分类">
            <el-option v-for="option in options" :key="option.id" :label="option.name" :value="option.name">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-4">
          <span>上架情况：</span>
          <el-select v-model="onsaleValue" placeholder="可选择多个标签">
            <el-option v-for="onsale in onsales" :key="onsale.value" :label="onsale.label" :value="onsale.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-12" style="text-align:center;margin:10px 0">
          <button @click='resetshaixuan' class="reset-btn">重置</button>
          <button @click='shaixuan' class="confirm-btn">筛选</button>
        </div>
      </div>
    </div>
    <div class="list-card-functionarea">
      <span class="col-sm-4">
        <input type="checkbox" v-model="selectAll" style="vertical-align:middle;margin-top:-2px;margin-bottom:1px;margin-right:5px" />全选
        <button class="word-btn" @click="toggleAlldetails" ref="toggledetail">展开</button>
      </span>
      <span class="col-sm-8" style="text-align:right">
        <button class="font-btn" @click='getlist'><font-icon id="icon-shuaxin"></font-icon></button>
        <input class="w-search" v-model='searchvalue' placeholder="请输入商品名查询" />
        <button class="font-btn w-search" @click='search'><font-icon id="icon-search"></font-icon></button>
        <button class="font-btn m-search" @click="openSearchbar"><font-icon id="icon-search"></font-icon></button>
        <button class="font-btn m-option" @click="openOptionbar"><font-icon id="icon-shaixuan"></font-icon></button>
        <button class="word-btn w-button" style="top:-4px" @click='outtoexcelcatalog'>导出到EXCEL</button>
        <button class="word-btn w-button" style="top:-4px" @click='outtoallexcelcatalog'>全部导出</button>
        <button class="word-btn w-button" style="top:-4px" @click='restallproduct'>重置所有商品</button>
        <button class="font-btn m-button" @click='opendownloadOptionbar'><font-icon id="icon-send"></font-icon></button>
      </span>
    </div>
    <div class="list-card-table-header">
      <div class="table-header-item col-sm-1">操作</div>
      <div class="table-header-item col-sm-2">图片</div>
      <div class="table-header-item col-sm-4">商品名称</div>
      <div class="table-header-item col-sm-1">价格</div>
      <div class="table-header-item col-sm-1">积分</div>
      <div class="table-header-item col-sm-1">库存</div>
      <div class="table-header-item col-sm-1">销量</div>
      <div class="table-header-item col-sm-1">创建时间</div>
    </div>
    <div class="list-card-table-content" ref="tableContent" id='tablelist'>
      <div class="table-scrollbar">
        <div class="table-row" v-for="(goodsItem,index) in products" :key="index">
          <div class="table-row-item col-sm-1 col-xs-1">
            <span><input type="checkbox" :value="goodsItem.productid" v-model="selected" /></span>
            <span v-on:click="goodsItem.goodsDetail = !goodsItem.goodsDetail">
              <font-icon id="icon-enter" v-if="!goodsItem.goodsDetail"></font-icon>
              <font-icon id="icon-unfold" v-else></font-icon>
            </span>
          </div>
          <div class="table-row-item col-sm-2 col-xs-3 table-img-row">
            <div class="thumbnail-image">
              <img v-bind:src="(goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src " @click="openurl((goodsItem.image == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':goodsItem.image.src) "
                style='cursor:pointer' />
              <div class="imgcover"></div>
            </div>
          </div>
          <div class="table-row-item col-sm-4 col-xs-12">
            <div>
              <span class="item-visibility" v-show="!goodsItem.visibility">已下架</span>
              <span class="item-title">商品名称：</span>
              <span>{{ goodsItem.name }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-1 col-xs-6">
            <div class="row-item-padding">
              <span class="item-title">价格：</span>
              <span>{{ goodsItem.pricebetween }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-1 col-xs-6">
            <div>
              <span class="item-title">积分：</span>
              <span>{{ goodsItem.jifenbetween }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-1 col-xs-6">
            <div class="row-item-padding">
              <span class="item-title">库存：</span>
              <span>{{ goodsItem.totalstock }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-1 col-xs-6">
            <div>
              <span class="item-title">销量：</span>
              <span>{{ goodsItem.sale }}</span>
            </div>
          </div>
          <div class="table-row-item col-sm-1 col-xs-12">
            <div>
              <span class="item-title">创建时间：</span>
              <span>{{ goodsItem.created_at }}</span>
            </div>
          </div>
          <div class="table-row-goods-list col-sm-12" v-if="goodsItem.goodsDetail">
            <div class="table-row-goods-list-content">
              <div class="goods-info">
                <div class="col-sm-6 col-xs-12">
                  <span class="item-title">品牌：</span>
                  <span>{{ goodsItem.vendor.name }}</span>
                </div>
                <div class="col-sm-6 col-xs-12">
                  <span class="item-title">分类：</span>
                  <span>{{ goodsItem.typestag }}</span>
                </div>
                <div class="col-sm-12">
                  <span class="item-title">上架：</span>
                  <span>{{ goodsItem.visibility?'是':'否' }}</span>
                </div>
              </div>
              <div class="order-list-item-detail">
                <div class="detail-item col-xs-12 col-sm-6" v-for="(variantsItem , index) in goodsItem.variants" :key='index'>
                  <div class="detail-item-info col-sm-3">
                    <div class="thumbnail-image">
                      <img v-bind:src="(variantsItem.imagesrc == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':variantsItem.imagesrc" @click="openurl((variantsItem.imagesrc == null)?'http://asset.ibanquan.com/image/53f649ffe2931e0b91000007/s_42x42.png':variantsItem.imagesrc) "
                        style='cursor:pointer' />
                      <div class="imgcover"></div>
                    </div>
                  </div>
                  <div class="detail-item-info col-sm-6" style="margin:0 10px">
                    <p class="primary-title">属性名称：{{ variantsItem.optionsum }}</p>
                    <p class="secondary-desc">价格：{{ variantsItem.price }}</p>
                    <p class="secondary-desc">原价：{{ variantsItem.compare_price }}</p>
                    <p class="secondary-desc">库存：{{ variantsItem.stock }}</p>
                    <p class="secondary-desc">重量：{{ variantsItem.weight }}</p>
                    <p class="secondary-desc">商品编号：{{ variantsItem.barcode }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div span="24" class="pagination">
          <el-pagination class="test" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[10, 20, 50, 100]" :pager-count="5" :page-size="size" layout="sizes, prev, pager, next,total,jumper" :total="total">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'GoodsmanageList',
  data() {
    return {
      searchvalue: '',
      page: 1,
      size: 10,
      total: 0,
      products: [],
      selected: [],
      listcardSearchbar: false,
      listcardOptionbar: false,
      downloadcardOptionbar: false,
      markValue: [],
      marks: [],
      optionValue: [],
      options: [],
      onsaleValue: null,
      onsales: [{
          value: 1,
          label: '已上架'
        },
        {
          value: 0,
          label: '未上架'
        },
      ]
    }
  },
  created() {
    this.gettype();
    this.getvendor();
    this.getlist();

  },
  mounted: function() {
    this.toReturn();
    if (document.documentElement.clientWidth > 768) {
      this.$refs.tableContent.style.height = document.documentElement.clientHeight - 280 + 'px';
    } else {
      this.$refs.tableContent.style.height = document.documentElement.clientHeight - 150 + 'px';
    }
    window.onresize = () => {
      if (document.documentElement.clientWidth > 768) {
        this.$refs.tableContent.style.height = document.documentElement.clientHeight - 280 + 'px';
      } else {
        this.$refs.tableContent.style.height = document.documentElement.clientHeight - 150 + 'px';
      }
    }
  },
  computed: {
    selectAll: {
      get: function() {
        return this.products ? this.selected.length == this.products.length : false;
      },
      set: function(value, index) {
        var selected = [];
        if (value) {
          this.products.forEach(function(user) {
            selected.push(user.productid);
          });
        }
        this.selected = selected;
      }
    }
  },
  methods: {
    restallproduct() {
      this.$msgbox.confirm('即将进行商品重置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loadingmsg = this.$loading({
          text: '加载中...',
          customClass: 'goodsmanage-loading'
        });
        this.$Axios.get(this.$ApiUrl+'productmanage/restproduct?token='+localStorage.getItem('token')+'&shopid='+this.$route.params.shopid)
        .then(response=>{
          if(response.data.code == 200){
            this.$Axios.get(this.$ApiUrl + 'productmanage/productinirest?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid + '&functionid=2')
              .then(response => {
                if (response.data.code == 200 ) {
                  loadingmsg.text = '一共有' + response.data.count + '个产品需要进行同步。。即将开始！';
                  this.tongbuprocess(1,response.data.end,loadingmsg);
                } else {
                  this.$message.warning(response.data.msg);
                }
              }).catch(error => {
                this.$message.error('连接错误！');
              });
          }
        }).catch(error=>{
          this.$message.error('系统错误！');
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已经取消重置'
        });
      });
    },
    tongbuprocess(begin, end, loadingmsgbox) {
      this.$Axios.post(this.$ApiUrl + 'productmanage/productinit', {
        token: localStorage.getItem('token'),
        shopid: this.$route.params.shopid,
        begin: begin,
      }).then(response => {
        if (response.data.code == 200) {
          loadingmsgbox.text = '同步进度 【' + Math.ceil(begin / end * 100) + '%】  ，还在加载中...预计剩余' + (end * 10 - begin * 10) + '秒，请勿关闭当前页面';
          if (begin != end) {
            begin = begin + 1;
            this.tongbuprocess(begin, end, loadingmsgbox);
          } else {
            loadingmsgbox.text = '商品同步完成！';
            loadingmsgbox.close();
            this.$message.success('同步成功！');
            this.getlist();
          }
        } else {
          loadingmsgbox.text = '同步进度 【' + Math.ceil(begin / end * 100) + '%】  ，出现了失误，正在重试！,预计剩余' + (end * 10 - begin * 10) + '秒，请勿关闭当前页面';
          this.tongbuprocess(begin, end, loadingmsgbox);

        }
      }).catch(error => {
        loadingmsgbox.text = '同步进度 【' + Math.ceil(begin / end * 100) + '%】  ，出现了失误，正在重试！,预计剩余' + (end * 10 - begin * 10) + '秒，请勿关闭当前页面';
        this.tongbuprocess(begin, end, loadingmsgbox);
      });
    },
    outtoallexcelcatalog() {
      window.open(this.$ApiUrlV2 + 'products/alltoexcel?token=' +
        localStorage.getItem('token') +
        '&shopid=' + this.$route.params.shopid +
        '&searchvalue=' + this.searchvalue +
        '&searchtypes=' + JSON.stringify(this.optionValue) +
        '&searchvendors=' + JSON.stringify(this.markValue) +
        '&searchonsale=' + JSON.stringify(this.onsaleValue), '_blank');
    },
    outtoexcelcatalog() {
      if (this.selected.length > 0) {
        window.open(this.$ApiUrl + 'productmanage/outtoexcelcatalog?token=' +
          localStorage.getItem('token') +
          '&shopid=' + this.$route.params.shopid +
          '&productids=[' +
          this.selected +
          ']', '_blank');
      } else {
        this.$message.error('没有选择任何产品！');
      }
    },
    shaixuan() {
      this.getlist();
    },
    resetshaixuan() {
      this.onsaleValue = null;
      this.markValue = [];
      this.optionValue = [];
      this.getlist();
    },
    openurl(url) {
      window.open(url, '_blank')
    },
    toReturn: function() {
      this.$parent.$children[0].returnBack = true;
    },
    gettype() {
      this.$Axios.get(this.$ApiUrl + 'productmanage/typeslistget?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
        .then(response => {
          if (response.data.code == 200) {
            this.options = response.data.options;
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(error => {
          this.$message.error('连接错误');
        });
    },
    getvendor() {
      this.$Axios.get(this.$ApiUrl + 'productmanage/vendorslistget?token=' + localStorage.getItem('token') + '&shopid=' + this.$route.params.shopid)
        .then(response => {
          if (response.data.code == 200) {
            this.marks = response.data.marks;
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(error => {
          this.$message.error('连接错误');
        });
    },
    getlist() {
      let loadingmsg = this.$loading({
        target: '#tablelist',
        text: '加载中...',
        customClass: 'goodsmanage-loading'
      });
      this.$Axios.post(this.$ApiUrl + 'productmanage/productlistget', {
        token: localStorage.getItem('token'),
        size: this.size,
        page: this.page,
        shopid: this.$route.params.shopid,
        searchvalue: this.searchvalue,
        searchtypes: this.optionValue,
        searchvendors: this.markValue,
        searchonsale: this.onsaleValue,
      }).then(response => {
        loadingmsg.close();
        // this.listcardSearchbar = false;
        this.products = response.data.products;
        this.total = response.data.total;
      }).catch(error => {
        loadingmsg.close();
        // this.listcardSearchbar = false;
        this.$message.error('连接错误');
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    search() {
      this.page = 1;
      this.size = 10;
      this.getlist();
    },
    openSearchbar() {
      this.listcardSearchbar = true;
    },
    closeSearchbar() {
      this.listcardSearchbar = false;
    },
    openOptionbar() {
      this.listcardOptionbar = true;
    },
    closeOptionbar() {
      this.listcardOptionbar = false;
    },
    closedownloadOptionbar() {
      this.downloadcardOptionbar = false;
    },
    opendownloadOptionbar() {
      this.downloadcardOptionbar = true;
    },
    toggleAlldetails() {
      if (this.$refs.toggledetail.innerText == '展开') {
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].goodsDetail = true;
        }
        const tempText = '折叠';
        this.$refs.toggledetail.innerText = tempText;
      } else if (this.$refs.toggledetail.innerText == '折叠') {
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].goodsDetail = false;
        }
        const tempText = '展开';
        this.$refs.toggledetail.innerText = tempText;
      }
    }
  },

}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
