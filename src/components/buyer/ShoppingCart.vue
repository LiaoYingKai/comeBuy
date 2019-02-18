<template >
  <div class="">
    購物車
    <div class="">
      {{shoppingCarts}}
      <el-button @click="pay"> 付款 </el-button>
    </div>
    <div class="">
      {{thirdPay}}
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    getShoppingCart:function(){
      this.$store.dispatch('getShoppingCart')
    },
    getThirdPay:function(){
      this.$store.dispatch('getThirdPay')
    },
    pay:function(){
      let paymentInfo = {}
      paymentInfo.thirdPayId = 2
      paymentInfo.payment={
        order_id:[this.shoppingCarts[0].id],
        ClintBackURL:"http://localhost:8080/mainPage/ShoppingCart",
        source: "mobile"
      }
      // console.log(paymentInfo)
      this.$store.dispatch('payingPayment',paymentInfo)
    }
  },
  computed:{
    shoppingCarts:function(){
      return this.$store.getters.shoppingCarts
    },
    thirdPay:function(){
      return this.$store.getters.thirdPay
    }
  },
  mounted(){
    this.getShoppingCart(),
    this.getThirdPay()
  }
}
</script>

<style lang="scss" scoped>
</style>
