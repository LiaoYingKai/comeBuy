<template >
  <div class="">
    購物車
    {{shoppingCarts}}
  </div>
</template>

<script>
export default {
  methods:{
    getShoppingCart:function(){
      this.$store.dispatch('getShoppingCart')
    }
  },
  computed:{
    shoppingCarts:function(){
      return this.$store.getters.shoppingCarts
    }
  },
  mounted(){
    this.getShoppingCart()
  }
}
</script>

<style lang="scss" scoped>
</style>
