// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import FontIcon from './components/CommonComponents/font-icon.vue';
import './common/fonts/iconfont.css';
import './common/fonts/iconfont.js';
Vue.component('FontIcon', FontIcon);

import VeeValidate , { Validator }from 'vee-validate'
VeeValidate.Validator.localize('zh_CN');
const dictionary = {
	zh_CN: {
		messages: {
			email: (field) => field + '格式有误，请填写正确邮箱',
			required: (field) => field + '必须输入',
			confirmed: (field) => field + '必须一致',
			min: (field) => field + '至少需要6位'
		},
		attributes: {
			email: '邮箱',
			password: '密码',
			oldpassword: '原始密码',
			newpassword: '新密码',
			newpassword_confirmed: '再次输入的密码'
		}
	}
}
Validator.localize(dictionary);
Vue.use(VeeValidate);

import { Message, MessageBox, Pagination, Loading, Upload, Select, Option } from 'element-ui'

Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$loading = Loading.service;


Vue.prototype.$Axios = axios;
Vue.prototype.$ApiUrl = 'http://api.syjingling.com/public/api/v1/';
Vue.prototype.$ApiUrlV2 = 'http://api.syjingling.com/public/api/v2/';

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
