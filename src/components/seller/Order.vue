<template >
<div class="">
  {{sellerOrderInfo}}
</div>
</template>

<script>
export default {
  computed:{
    sellerOrderInfo: function(){
      return this.$store.getters.sellerOrderInfo
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
