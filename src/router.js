import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/MainPage.vue'
import ManageLive from './components/seller/ManageLive.vue'
import Products from './components/seller/Products.vue'
import Order from './components/seller/Order.vue'
import WatchLive from './components/buyer/WatchLive.vue'
import RecipientsInfo from './components/buyer/RecipientsInfo.vue'
import ShoppingCart from './components/buyer/ShoppingCart.vue'

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
      component: ManageLive
    }, {
      path: 'product',
      component: Products
    }, {
      path: 'order',
      component: Order
    }, {
      path: 'watchRoom',
      component: WatchLive
    },{
      path: 'RecipientsInfo',
      component: RecipientsInfo
    },{
      path: 'shoppingCart',
      component: ShoppingCart
    }]
  }, ]
})
