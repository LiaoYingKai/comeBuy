<template >
<div class="products">
<AddProduct :isOpen="isOpen" @closeAddProduct="closeAddProduct"/>
<div class="container" v-for="productInfo in products">
  <Product :productInfo="productInfo" class="product"/>
</div>
<div class="addButton">
  <font-awesome-icon icon="plus-circle" @click="addProduct"/>

</div>
</div>
</template>

<script>
import AddProduct from './AddProduct'
import Product from './Product'

export default {
  data(){
    return {
      isOpen:false
    }
  },
  components:{
    AddProduct,Product
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
  computed:{
    products:function(){
      return this.$store.getters.products
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
.products{
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.product{
    max-width: 960px;
    margin:20px auto 0px;
    background-color: #fff;
    padding: 10px 0;
    border-radius: 10px;
}
.addButton{
  cursor: pointer;
  color:#03a9f4;
  font-size: 36px;
  position: fixed;
  bottom: 50px;
  right:50px;
}
</style>
