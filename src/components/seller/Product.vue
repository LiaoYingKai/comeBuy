<template>
<div class="product" :key="productInfo.id">
  <el-row :gutter="20">
    <el-col :span="6" :offset="1">
      <div class="image-upload">
        <label for="file-input" v-if="isEdit">
              <font-awesome-icon icon="image" />
          </label>
        <input id="file-input" type="file" @change="onFileChange" />
        <img :src="previewPicture" v-if="previewPicture">
        <img :src="productInfo.images" v-else>
      </div>
    </el-col>
    <el-col :span="12" :offset="1">
      <div class="infoStyle">
        <div class="">
          商品名稱：<input type="text" v-model="product.name" v-if="isEdit"><span v-else>{{productInfo.name}}</span>
        </div>
        <div class="">
          商品描述：<input type="text" v-model="product.description" v-if="isEdit"> <span v-else>{{productInfo.description}}</span>
        </div>
        <div class="">
          商品存貨：<input type="text" v-model="product.stock" v-if="isEdit"> <span v-else>{{productInfo.stock}}</span>
        </div>
        <div class="">
          商品成本：<input type="text" v-model="product.cost" v-if="isEdit"> <span v-else>{{productInfo.cost}}</span>
        </div>
        <div class="">
          商品價錢：<input type="text" v-model="product.unit_price" v-if="isEdit"> <span v-else>{{productInfo.unit_price}}</span>
        </div>
        <div class="">
          <el-button @click="postEdit(productInfo.id)" v-if="isEdit">完成</el-button>
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
      },
      picture: '',
      previewPicture: '',
      isEdit: false
    }
  },
  methods: {
    deleteProduct: function(id) {
      this.$confirm('是否刪除商品', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let deleteItem = {
            items: []
          }
          deleteItem.items.push(id)
          this.$store.dispatch('deleteProduct', deleteItem)
          this.successfulDeleteNotify()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    aditProduct: function(id) {
      this.isEdit = true
    },
    cancelEditProduct: function() {
      this.previewPicture = ''
      this.isEdit = false
    },
    postEdit: function(id) {
      let data = new FormData();
      let productInfo = this.product
      for (let key in productInfo) {
        data.append(key, productInfo[key]);
      }
      data.append('_method', 'PATCH')
      if (this.previewPicture) {
        data.append('images', this.picture)
      }
      let product = {
        Id: id,
        dataForm: data
      }
      this.cancelEditProduct()
      this.$store.dispatch('editProduct', product)
      this.successfulEditNotify()
    },
    onFileChange: function(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.picture = files[0]
    },
    createImage: function(file) {
      let image = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        this.previewPicture = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    successfulEditNotify:function(){
      this.$notify({
          title: '編輯成功',
          type: 'success'
        });
    },
    successfulDeleteNotify:function(){
      this.$notify.info({
          title: '刪除商品',
        });
    }
  },
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
span {
    height: 30px;
    line-height: 30px;
    margin-left: 15px;
}
.image-upload {
    position: relative;
    input {
        display: none;
    }
    label {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 48px;
        color: #fff;
        cursor: pointer;
    }
}
</style>
