<template >
<div class="">
  <div class="">
    <el-row :gutter="20" v-for="shoppingCart in shoppingCarts">
      <el-col :span="1" :offset="1" >
        <input type="checkbox" :id="shoppingCart.id" :value="shoppingCart.id" v-model="checkList">
        <label :for="shoppingCart.id"></label>
      </el-col>
      <el-col :span="6" >
        <img :src="shoppingCart.images" alt="">
      </el-col>
      <el-col :span="14" :offset="1">
        <ShoppingCartProduct :shoppingCart="shoppingCart"/>
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
  components:{
    ShoppingCartProduct
  },
  data() {
    return {
      checkList: []
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
      console.log(paymentInfo)
      // console.log(this.checkList)
      this.$store.dispatch('payingPayment', paymentInfo)
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
  mounted() {
    this.getShoppingCart(),
      this.getThirdPay()
  }
}
</script>

<style lang="scss" scoped>
img{
  width:100%;
  height:auto;
}
</style>
