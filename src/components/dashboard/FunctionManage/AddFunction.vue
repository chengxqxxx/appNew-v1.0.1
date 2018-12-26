<template>
<div class="main-content addfunction-main-content">
  <div class="main-wrapper col-xs-12 col-sm-12">
    <div class="main-card gmd-7">
      <h5 class="card-title">生意精灵功能一览：</h5>
      <div class="card-content">
        <div v-for='functionlist in functionlists' :key='functionlist.id' class="functionlist-item">
          <p>{{ functionlist.id + ". " +functionlist.name }}</p>
          <p class="subtitle">{{ functionlist.desc }}</p>
          <button :disabled='functionlist.have' @click='add(functionlist)' class="addfunction-btn">{{ functionlist.have ?'已添加':'添加功能'}}</button>
        </div>
      </div>
      <div class="getmore"><p>更多功能即将开放...</p></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AddFunction",
  data() {
    return {
      shopid:'',
      functionlists:[],
    }
  },
  mounted: function() {
    this.toReturn();
  },
  methods: {
    add(item){
      this.$Axios.post(this.$ApiUrl+'function/addfunc',{
        token:localStorage.getItem('token'),
        shopid:this.$route.params.shopid,
        functionid:item.id
      }).then(response=>{
        if(response.data.code == 200){
          item.have=true;
          this.$message.success(response.data.msg);
        }else{
          this.$message.warning(response.data.msg);
        }
      }).catch(error=>{
        this.$message.error('连接错误！！');
      });
    },
    toreturnBack() {
      this.$router.go(-1);
    },
    toReturn() {
      this.$parent.$children[0].returnBack = true;
    },


  },
  created() {
    this.$Axios.get(this.$ApiUrl+'function/funclist?token='+localStorage.getItem('token')+'&shopid='+this.$route.params.shopid)
    .then(response=>{
      if(response.data.code == 200){
        this.functionlists = response.data.functionlists;
      }else if(response.data.code == 401){
        this.$message.warning(response.data.msg);
        this.$router.push('/dashboard/home');
      }else{
        this.$message.warning(response.data.msg);
      }
    }).catch(error=>{
      this.$message.error('连接错误！！');
    });
  }
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../../common/stylus/index.styl"
</style>
