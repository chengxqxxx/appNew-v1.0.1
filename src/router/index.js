import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '../components/homepage/homepage.vue'
import Intro from '../components/homepage/intro.vue'
import Tuto from '../components/homepage/tutorial.vue'
import Contact from '../components/homepage/contact.vue'

import Login from '../components/login/login.vue'
import Register from '../components/login/register.vue'
import Forget from '../components/login/forget.vue'

import Dashboard from '../components/dashboard/index.vue'
import DashboardHome from '../components/dashboard/home.vue'
import DashboardAdd from '../components/dashboard/add.vue'
import DashboardAddFunction from '../components/dashboard/FunctionManage/AddFunction.vue'
import DashboardFunctionPay from '../components/dashboard/FunctionManage/FunctionPay.vue'
import UserSetup from '../components/dashboard/usersetup.vue'
import DashboardIntro from '../components/dashboard/intro.vue'
import DashboardTuto from '../components/dashboard/tutorial.vue'
import DashboardContact from '../components/dashboard/contact.vue'

import OrderInit from '../components/dashboard/FunctionModalInt/OrderInit.vue'
import ProductInit from '../components/dashboard/FunctionModalInt/ProductInit.vue'


import Ordermanage from '../components/ordermanage/index.vue'
import OrdermanageHome from '../components/ordermanage/home.vue'
import OrdermanageList from '../components/ordermanage/list.vue'
import OrdermanageDetail from '../components/ordermanage/detail.vue'
import OrdermanageSend from '../components/ordermanage/send.vue'
import OrdermanageBuy from '../components/ordermanage/buy.vue'

import Goodsmanage from '../components/goodsmanage/index.vue'
import GoodsmanageHome from '../components/goodsmanage/home.vue'
import GoodsmanageList from '../components/goodsmanage/list.vue'
import GoodsmanageAdd from '../components/goodsmanage/add.vue'
import GoodsmanageEdit from '../components/goodsmanage/edit.vue'
import GoodsmanagePersonal from '../components/goodsmanage/personal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {path:'/intro',name:'Intro',component:Intro},
    {path:'/tutorial',name:'Tuto',component:Tuto},
    {path:'/contact',name:'Contact',component:Contact},
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {path:'home',name:'DashboardHome',component:DashboardHome},
        {path:'add',name:'DashboardAdd',component:DashboardAdd},
        {path:'addfunction/:shopid',name:'AddFunction',component:DashboardAddFunction},
        {path:'functionpay/:shopid',name:'FunctionPay',component:DashboardFunctionPay},
        {path:'usersetup',name:'UserSetup',component:UserSetup,meta:{keepAlive:false}},
        {path:'orderinit/:shopid/:functionid',name:'OrderInit',component:OrderInit},
        {path:'productinit/:shopid/:functionid',name:'ProductInit',component:ProductInit},
        {path:'intro',name:'DashboardIntro',component:DashboardIntro},
        {path:'tutorial',name:'DashboardTuto',component:DashboardTuto},
        {path:'contact',name:'DashboardContact',component:DashboardContact},
      ]
    },
    {
      path: '/ordermanage/:shopid',
      name: 'Ordermanage',
      component: Ordermanage,
      children: [
        {path:'home',name:'OrdermanageHome',component:OrdermanageHome},
        {path:'list',name:'OrdermanageList',component:OrdermanageList},
        {path:'detail/:orderno',name:'OrdermanageDetail',component:OrdermanageDetail},
        {path:'send',name:'OrdermanageSend',component:OrdermanageSend},
        {path:'buy',name:'OrdermanageBuy',component:OrdermanageBuy},
      ]
    },
    {
      path: '/goodsmanage/:shopid',
      name: 'Goodsmanage',
      component: Goodsmanage,
      children: [
        {path:'home',name:'GoodsmanageHome',component:GoodsmanageHome},
        {path:'list',name:'GoodsmanageList',component:GoodsmanageList},
        {path:'edit',name:'GoodsmanageEdit',component:GoodsmanageEdit},
        {path:'add',name:'GoodsmanageAdd',component:GoodsmanageAdd},
        {path:'personal',name:'GoodsmanagePersonal',component:GoodsmanagePersonal},
      ]
    },
  ]
})
