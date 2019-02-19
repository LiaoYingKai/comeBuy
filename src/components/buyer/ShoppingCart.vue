<template >
<div class="">
  <el-tabs v-model="activeName" @tab-click="filterShoppingCart">
    <el-tab-pane label="未結帳訂單" name="unchecked"></el-tab-pane>
    <el-tab-pane label="已結帳訂單" name="checked"></el-tab-pane>
    <el-tab-pane label="所有訂單" name="all"></el-tab-pane>
  </el-tabs>
  <div class="">
    <el-row :gutter="20" v-for="shoppingCart in shoppingCartList">
      <el-col :span="1" :offset="1">
        <input type="checkbox" :id="shoppingCart.id" :value="shoppingCart.id" v-model="checkList">
        <label :for="shoppingCart.id"></label>
      </el-col>
      <el-col :span="6">
        <img :src="shoppingCart.images" alt="">
      </el-col>
      <el-col :span="14" :offset="1">
        <ShoppingCartProduct :shoppingCart="shoppingCart" />
      </el-col>
    </el-row>
    <el-button @click="pay"> 付款 </el-button>
  </div>
  <div class="">
    {{thirdPay}}
  </div>
</div>
</template>

<script>
import ShoppingCartProduct from './ShoppingCartProduct'
export default {
  components: {
    ShoppingCartProduct
  },
  data() {
    return {
      checkList: [],
      activeName: 'unchecked',
      shoppingCartList:[]
    }
  },
  methods: {
    getShoppingCart: function() {
      this.$store.dispatch('getShoppingCart')
    },
    getThirdPay: function() {
      this.$store.dispatch('getThirdPay')
    },
    pay: function() {
      let paymentInfo = {}
      paymentInfo.thirdPayId = 2
      paymentInfo.payment = {
        order_id: this.checkList,
        ClintBackURL: "http://localhost:8080/mainPage/ShoppingCart",
        source: "mobile"
      }
      this.$store.dispatch('payingPayment', paymentInfo)
    },
    filterShoppingCart: function() {
      if(this.activeName === "unchecked"){
        let array = this.shoppingCarts.filter(item=>{
          if(!item.status){
            return item
          }
        })
        this.shoppingCartList = array
      }else if(this.activeName === "checked"){
        let array = this.shoppingCarts.filter(item=>{
          if(item.status){
            return item
          }
        })
        this.shoppingCartList = array
      }else{
        this.shoppingCartList = this.shoppingCarts
      }
    }
  },
  computed: {
    shoppingCarts: function() {
      return this.$store.getters.shoppingCarts
    },
    thirdPay: function() {
      return this.$store.getters.thirdPay
    }
  },
  watch:{
    shoppingCarts:function(){
      this.filterShoppingCart()
    }
  },
  mounted() {
    this.getShoppingCart(),
      this.getThirdPay()
  }
}
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    height: auto;
}
</style>
