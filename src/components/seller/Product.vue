<template>
<div class="product" :key="productInfo.id">
  <el-row :gutter="20">
    <el-col :span="6" :offset="1">
      <img :src="productInfo.images" alt="">
    </el-col>
    <el-col :span="12" :offset="1">
      <div class="infoStyle">
        <div class="">
          商品名稱：{{productInfo.name}}
        </div>
        <div class="">
          商品描述：{{productInfo.description}}
        </div>
        <div class="">
          商品存貨：{{productInfo.stock}}
        </div>
        <div class="">
          商品成本：{{productInfo.cost}}
        </div>
        <div class="">
          商品價錢：{{productInfo.unit_price}}
        </div>
        <div class="">
          <el-button @click="aditProduct">編輯</el-button>
          <el-button @click="deleteProduct(productInfo.id)">刪除</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: ["productInfo"],
  methods:{
    deleteProduct:function(id){
      let deleteItem = {
        items:[]
      }
      deleteItem.items.push(id)
      console.log(deleteItem)
      this.$store.dispatch('deleteProduct',deleteItem)
    },
    aditProduct:function(){
      console.log("fuck")
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
    img {
        width: 100%;
        height: auto;
    }
}
.infoStyle{
  height: 225px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
</style>
