import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/MainPage.vue'
import Seller from './views/Seller.vue'
import Buyer from './views/Buyer.vue'
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
      path: 'seller',
      component: Seller
    }, {
      path: 'buyer',
      component: Buyer
    }]
  }, ]
})
