<template>
<div class="main-content home-main-content usersetup">
  <div class="side-wrapper col-xs-12 col-sm-3">
    <div class="shop-card" style="height:150px">
      <div class="shop-card-title" style="color:#fff;line-height:40px">
          <h4>注册邮箱：{{ user.email }}</h4>
          <h4>会员等级：普通会员</h4>
      </div>
    </div>
  </div>
  <div class="main-wrapper col-xs-12 col-sm-9">
    <div class="main-card">
      <div class="card-title">修改密码</div>
      <div class="card-content">
        <div class="input-group">
          <div class="input-item">
            <label>原始密码：</label>
            <input v-model="oldpassword" placeholder="请输入原始密码" v-validate="'required|min:6'" name="oldpassword" type="password" ref="oldpassword" />
          </div>
          <p class="input-error-message" v-show="errors.has('oldpassword')">{{ errors.first('oldpassword') }}</p>
          <div class="input-item">
            <label>修改密码：</label>
            <input v-model="newpassword" placeholder="请输入新密码" v-validate="'required|min:6'" name="newpassword" type="password" ref="newpassword" />
          </div>
          <p class="input-error-message" v-show="errors.has('newpassword')">{{ errors.first('newpassword') }}</p>
          <div class="input-item">
            <label>再次输入：</label>
            <input v-model="newpassword_confirmed" placeholder="请再次输入密码" v-validate="'required|confirmed:newpassword'" name="newpassword_confirmed" type="password" />
          </div>
          <p class="input-error-message" v-show="errors.has('newpassword_confirmed')">{{ errors.first('newpassword_confirmed') }}</p>
          <button @click='edit'>确认</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  name: 'UserSetupHome',
  data() {
    return {
      user: {
        email: localStorage.getItem('email')
      },
      oldpassword: '',
      newpassword: '',
      newpassword_confirmed: '',
    }
  },
  mounted: function() {
    this.toReturn();
  },
  methods: {
    toReturn() {
      this.$parent.$children[0].returnBack = true;
    },
    edit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.$Axios.post(this.$ApiUrl + 'user/edit', {
            token: localStorage.getItem('token'),
            oldpassword: this.oldpassword,
            newpassword: this.newpassword,
          }).then(response => {
            if (response.data.code == 200) {
              localStorage.setItem('token', response.data.token);
              this.$message.success(response.data.msg);
              this.oldpassword = '';
              this.newpassword = '';
              this.newpassword_confirmed = '';

            } else {
              this.$message.warning(response.data.msg);
            }
          }).catch(error => {
            this.$message.error('连接错误！');
          })
        } else {
          this.$message.warning('请输入正确的信息');
        }
      });




    },
    toreturnBack() {
      this.$router.go(-1);
    },

  }
}
</script>
