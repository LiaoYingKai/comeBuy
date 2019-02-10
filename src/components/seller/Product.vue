<template>
<div class="product" :key="productInfo.id">
  <el-row :gutter="20">
    <el-col :span="6" :offset="1">
      <img :src="productInfo.images" alt="">
    </el-col>
    <el-col :span="12" :offset="1">
      <div class="infoStyle">
        <div class="">
          商品名稱：<input type="text" v-model="product.name" v-if="isEdit"><span v-else>{{productInfo.name}}</span>
        </div>
        <div class="">
          商品描述：<input type="text" v-model="product.description"v-if="isEdit"> <span v-else>{{productInfo.description}}</span>
        </div>
        <div class="">
          商品存貨：<input type="text" v-model="product.stock"v-if="isEdit"> <span v-else>{{productInfo.stock}}</span>
        </div>
        <div class="">
          商品成本：<input type="text" v-model="product.cost"v-if="isEdit"> <span v-else>{{productInfo.cost}}</span>
        </div>
        <div class="">
          商品價錢：<input type="text" v-model="product.unit_price"v-if="isEdit"> <span v-else>{{productInfo.unit_price}}</span>
        </div>
        <div class="">
          <el-button @click="postEdit(productInfo)" v-if="isEdit">完成</el-button>
          <el-button @click="aditProduct" v-else>編輯</el-button>
          <el-button @click="cancelEditProduct" v-if="isEdit">取消</el-button>
          <el-button @click="deleteProduct(productInfo.id)" v-else>刪除</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  props: ["productInfo"],
  data() {
    return {
      product: {
        name: this.productInfo.name,
        description: this.productInfo.description,
        stock: this.productInfo.stock,
        cost: this.productInfo.cost,
        unit_price: this.productInfo.unit_price,
        images: this.productInfo.image,
      },
      isEdit: false
    }
  },
  methods: {
    deleteProduct: function(id) {
      let deleteItem = {
        items: []
      }
      deleteItem.items.push(id)
      this.$store.dispatch('deleteProduct', deleteItem)
    },
    aditProduct: function(id) {
      this.isEdit = true
    },
    cancelEditProduct: function() {
      this.isEdit = false
    },
    postEdit: function(id) {
      // this.$store.dispatch('editProduct')
      console.log(id)
      this.cancelEditProduct()

    }
  }
}
</script>

<style lang="scss" scoped>
.product {
    img {
        width: 225px;
        height: 225px;
    }
}
.infoStyle {
    height: 225px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
}
input {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    font-size: 16px;
}
span{
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
}
</style>
