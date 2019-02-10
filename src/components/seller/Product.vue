<template >
<div class="">
  <el-row :gutter="20">
    <el-col :span="4" :offset="3">
      <div class="uploadImage">
        <input type="file" @change="onFileChange" ref="inputFile">
        <img :src="previewPicture">
      </div>
    </el-col>
    <el-col :span="12" :offset="1">
      <el-form label-position="left" label-width="80px" :model="productInfo" ref="productInfo">
        <el-form-item label="商品名稱">
          <el-input v-model="productInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="productInfo.description"></el-input>
        </el-form-item>
        <el-form-item label="數量">
          <el-input v-model.number="productInfo.stock"></el-input>
        </el-form-item>
        <el-form-item label="成本">
          <el-input v-model="productInfo.cost"></el-input>
        </el-form-item>
        <el-form-item label="售價">
          <el-input v-model="productInfo.unit_price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addProduct">提交</el-button>
          <el-button @click="resetProduct">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  data() {
    return {
      productInfo: {
        name: '',
        description: '',
        stock: '',
        cost: '',
        unit_price: ''
      },
      picture: '',
      previewPicture: ''
    }
  },
  methods: {
    getProduct: function() {
      this.$store.dispatch('getProduct')
    },
    addProduct: function() {
      let data = new FormData();
      let product = this.productInfo

      for (let key in product) {
        data.append(key, product[key]);
      }
      data.append('images', this.picture)
      this.$store.dispatch('addProduct', data)
        .then(() => {
          this.resetProduct()
          this.$store.dispatch('getProduct')
        })
        .catch(error=>{
          console.log(error)
        })
    },
    resetProduct: function() {
      this.productInfo = {
        name: '',
        description: '',
        stock: '',
        cost: '',
        unit_price: ''
      }
      this.previewPicture = ''
      this.$refs.inputFile.value = ''
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.picture = files[0]
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        this.previewPicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
.uploadImage {
    height: 372px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-top: 20px;
    }
    input {
        width: 100%;
    }
}
</style>
