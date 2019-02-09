import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/MainPage.vue'
import ManageLive from './components/seller/ManageLive.vue'
import Product from './components/seller/Product.vue'
import Order from './components/seller/Order.vue'
import WatchLive from './components/buyer/WatchLive.vue'
import UserInfo from './components/buyer/UserInfo.vue'
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
      component: Product
    }, {
      path: 'order',
      component: Order
    }, {
      path: 'watchRoom',
      component: WatchLive
    },{
      path: 'userInfo',
      component: UserInfo
    },{
      path: 'shoppingCart',
      component: ShoppingCart
    }]
  }, ]
})
