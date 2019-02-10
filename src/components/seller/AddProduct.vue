<template lang="html">
  <div class="model" v-if="isOpen">
    <div class="modal-content">


    <el-row :gutter="20">
      <div class="close" @click="closeAddProduct">
        <font-awesome-icon icon="times" />
      </div>
      <el-col :span="6" :offset="1">
        <div class="uploadImage">
          <input type="file" @change="onFileChange" ref="inputFile">
          <img :src="previewPicture">
        </div>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-form label-position="left" label-width="80px" :model="productInfo" ref="productInfo" @keyup.enter="test">
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
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
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
    test: function(){
      console.log("fuck")
    },
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
          this.closeAddProduct()
          this.$store.dispatch('getProduct')
        })
        .catch(error => {
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
    closeAddProduct: function() {
      this.$emit('closeAddProduct')
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
}
</script>

<style lang="scss" scoped>
.model {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    max-width: 960px;
}
.uploadImage {
    height: 372px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-top: 20px;
        width: 100%;
        height: auto;
    }
    input {
        width: 100%;
    }
}
.close {
    position: absolute;
    top: 0px;
    right: 10px;
    opacity: 0.4;
    font-size: 24px;
    cursor: pointer;
}
</style>
