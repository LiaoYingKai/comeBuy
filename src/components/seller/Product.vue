<template >
<div class="">
<AddProduct :isOpen="isOpen" @closeAddProduct="closeAddProduct"/>
<button @click="addProduct"> 新增商品</button>
</div>
</template>

<script>
import AddProduct from './AddProduct'
export default {
  data(){
    return {
      isOpen:false
    }
  },
  components:{
    AddProduct
  },
  methods: {
    getProduct: function() {
      this.$store.dispatch('getProduct')
    },
    addProduct:function(){
      this.isOpen = true
    },
    closeAddProduct:function(){
      this.isOpen = false
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>

</style>
