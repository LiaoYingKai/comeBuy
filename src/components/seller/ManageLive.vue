<template >
<div class="">
  <el-row type="flex">
    <el-col :span="10" :offset="1">
      <div class="liveRoom" v-if="isLive && (isSeller === 1)">
        <LiveBroadcast/>
      </div>
      <div class="startLive" v-else>
        <el-row>
          <el-col :span="6">
            直播網址：
          </el-col>
          <el-col :span="18">
            <el-input v-model="liveInfo.iFrame" placeholder="輸入網址"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            直播描述：
          </el-col>
          <el-col :span="18">
            <el-input v-model="liveInfo.channel_description" placeholder="輸入網址"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-button @click="closeLive" v-if="isLive">關閉直播</el-button>
      <el-button @click="startLive" v-else :disabled="products.length === 0">開始直播</el-button>
    </el-col>
    <el-col :span="10" :offset="2">
      <div class="" v-if="products.length === 0">
        請先新增商品
        <el-button @click="goAddProduct">前往新增商品</el-button>
      </div>
      <div class="livingProduct" v-else>
        <el-collapse accordion>
          <el-collapse-item v-for="product in products" :name="product.id" :key="product.id">
            <template slot="title">
              <div class="title">
                {{product.name}}
                <span v-if="sellingProduct.item_id === product.id">
                  商品推播中
                </span>
              </div>
            </template>
            <el-row>
              <el-col :span="10" :offset="1">
                <img :src="product.images" alt="">
              </el-col>
              <el-col :span="10" :offset="2" class="productStyle">
                <div class="">
                  商品描述：{{product.description}}
                </div>
                <div class="">
                  商品數量：{{product.stock}}
                </div>
                <div class="">
                  商品成本：{{product.cost}}
                </div>
                <div class="">
                  商品售價：{{product.unit_price}}
                </div>
                </el-col>
            </el-row>
            <el-button @click="sellProduct(product.id)">商品推播</el-button>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-col>
  </el-row>


</div>
</template>

<script>
import LiveBroadcast from '../common/LiveBroadcast'
export default {
  components: {
    LiveBroadcast
  },
  data() {
    return {
      liveInfo: {
        iFrame: '',
        channel_description: ''
      }
    }
  },
  methods: {
    getProduct: function() {
      this.$store.dispatch('getProduct')
    },
    getSellingProduct: function() {
      this.$store.dispatch('getSellingProduct')
    },
    startLive: function() {
      this.$store.dispatch('startLive', this.liveInfo)
    },
    closeLive: function() {
      this.$store.dispatch('closeLive')
    },
    sellProduct: function(itemId) {
      this.$store.dispatch('sellProduct', itemId)
    },
    goAddProduct: function() {
      this.$router.push('product')
    }
  },
  computed: {
    products: function() {
      return this.$store.getters.products
    },
    isLive: function() {
      return this.$store.getters.userStatus.result
    },
    isSeller: function(){
      return this.$store.getters.userStatus.response.host
    },
    sellingProduct: function() {
      return this.$store.getters.sellingProduct
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    margin-left: 10px;
    span {
        color: red;
    }
}

button {
    margin-top: 10px;
}
img{
  width: 100%;
  height:auto;
}
.productStyle{
  div{
    text-align: left;
  }
}
</style>
