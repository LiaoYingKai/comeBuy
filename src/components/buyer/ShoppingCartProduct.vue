<template >
<div class="shoppingCartProduct">
  <div class="">
    商品名稱：{{shoppingCart.name}}
  </div>
  <div class="">
    商品售價：{{shoppingCart.unit_price}}
  </div>
  <div class="">
    購買數量：{{shoppingCart.quantity}}
  </div>
  <div class="" v-if="shoppingCart.status">
    已結帳
  </div>
  <div class="" v-else>
    購買時間：{{shoppingCart.time}} 三天後截止

  </div>
</div>
</template>

<script>
export default {
  props: ['shoppingCart']
}
</script>

<style lang="scss" scoped>
.shoppingCartProduct {
    div {
        text-align: left;
    }
}
</style>
