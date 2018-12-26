<template>
<div class="main-content home-main-content">
  <div class="side-wrapper col-xs-12 col-sm-3">
    <div v-if="shops.length < 1">
      <div class="shop-card gmd-1">
        <div class="shop-card-title">
          <h6>店铺信息：</h6>
        </div>
        <div class="shop-card-content">
          <div class="shop-card-icon">
            <font-icon id="icon-shop_fill"></font-icon>
          </div>
          <div class="shop-card-info">
            <h4>暂未接入</h4>
            <h4><router-link to="/dashboard/add">点击添加店铺</router-link></h4>
          </div>
        </div>
      </div>
    </div>
    <div v-else v-for="shop in shops" :key="shop.id" style="cursor:pointer;" @click="select(shop)">
      <div class="shop-card gmd-1">
        <div class="shop-card-title">
          <h6>店铺信息：</h6>
        </div>
        <div class="shop-card-content">
          <div class="shop-card-icon">
            <font-icon id="icon-shop_fill"></font-icon>
          </div>
          <div class="shop-card-info">
            <h4 :title="shop.name">{{ shop.name }}</h4>
            <h4 :title="shop.url">{{ shop.url }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="main-wrapper col-xs-12 col-sm-9">
    <div class="main-card gmd-7">
      <div class="card-title">当前店铺数据</div>
      <div class="card-statics">
        <div class="card-statics-item">
          <h6>商城名称</h6>
          <h3>{{shopinfo.name}}</h3></div>
        <div class="card-statics-item">
          <h6>商城链接</h6>
          <h3>{{shopinfo.url}}</h3></div>
      </div>
    </div>
    <div class="main-card gmd-7">
      <div class="card-title">
        工作台
        <router-link :to="'/dashboard/addfunction/'+selectshop.id">添加功能</router-link>
      </div>
      <div>
        <div v-if="addedloading" class="card-loading">
          正在加载中
        </div>
        <div v-else class="card-content">
          <div class="card-content-blank" v-if="addedFunction.length < 1">
            <router-link :to="{ name: 'AddFunction', params: {shopid:selectshop.id} }">暂未添加功能，点此添加</router-link>
          </div>
          <div v-else class="card-content-itemgroup">
            <div class="card-content-item col-sm-2 col-xs-4" v-for="item in addedFunction" :key="item.id" @click="tofunction(item)" :title="item.name">
              <div class="card-content-item-icon">
                <font-icon :id="item.icon" :class="item.color"></font-icon>
              </div>
              <p>{{ item.name }}</p>
              <div v-if="item.daoqi" class="card-content-item-message">已到期</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'DashboardHome',
  data() {
    return {
      shops: [],
      selectshop: {},
      addedloading: true,
      shopinfo: {
        name:'未连接',
        url:'未连接'
      },
      addedFunction: [],
    }
  },
  mounted: function() {
    this.toReturn();
  },
  methods: {
    toReturn() {
      this.$parent.$children[0].returnBack = false;
    },
    tofunction(item) {
      if (!item.daoqi) {
        if (item.initialization) {
          this.$router.push({
            name: item.linkto,
            params: {
              shopid: this.selectshop.id
            }
          });
        } else {
          this.$msgbox.confirm('功能模块尚未初始化，点击确认进行初始化！(推荐使用电脑操作)', '功能初始化', {
            confirmButtonText: '开始',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.$router.push('/dashboard/orderinit/' + this.selectshop.id + '/' + item.id);
            console.log(item);
            this.$router.push({ name:item.initlink , params:{shopid:this.selectshop.id,functionid:item.id}});

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消初始化'
            });
          });
        }
      } else {
        this.$message.warning('功能已到期，请续费');
      }
    },
    select(item) {
      if (this.selectshop.id == item.id) {
        this.$message.info('已经选中，请勿频繁点击哦！');
      } else {
        this.$message.info('切换中...');
        this.selectshop = item;
        this.getshopinfo(item);
      }
    },
    getshopinfo(shop) {
      this.addedloading = true;
      this.shopinfo = {
        name:this.selectshop.name,
        url:this.selectshop.url,
      };
      this.$Axios.get(this.$ApiUrl + 'function/shopfunclist?token=' + localStorage.getItem('token') + '&shopid=' + shop.id)
        .then(response => {
          if (response.data.code == 200) {
            this.addedFunction = response.data.functionlists;
            this.addedloading = false;
          } else {
            this.$message.warning(response.data.msg);
          }
        }).catch(error => {
          this.$message.error('连接错误！');
        });

    },
    restshopinfo() {
      this.shopinfo = {
        name:'未连接',
        url:'未连接',
      };
      this.addedloading = false;
    }
  },
  created() {
    this.$Axios.get(this.$ApiUrl + 'shop/shoplist?token=' + localStorage.getItem('token'))
      .then(response => {
        if (response.data.code == 200) {
          this.shops = response.data.shops;
          this.selectshop = this.shops[0];
          this.getshopinfo(this.shops[0]);

        } else if (response.data.code == 401) {
          this.shops = [];
          this.restshopinfo();
          this.$message.warning(response.data.msg);
        } else if (response.data.code == 402) {
          this.$message.warning(response.data.msg);
        }
      }).catch(error => {
        this.$message.error('系统错误！！');
      });
  }
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/index.styl"
</style>
