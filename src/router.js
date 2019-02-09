import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/MainPage.vue'
import Live from './components/seller/Live.vue'
import Product from './components/seller/Product.vue'
import Order from './components/seller/Order.vue'
import Buyer from './components/buyer/Buyer.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/mainPage/',
    name: 'mainPage',
    component: MainPage,
    children: [{
      path: 'liveRoom',
      component: Live
    }, {
      path: 'product',
      component: Product
    }, {
      path: 'order',
      component: Order
    }, {
      path: 'buyer',
      component: Buyer
    }]
  }, ]
})
