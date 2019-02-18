<template >
  <div class="">
    購物車
    <div class="">
      {{shoppingCarts}}
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
