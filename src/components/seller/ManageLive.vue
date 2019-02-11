<template >
<div class="">
  <el-row type="flex">
    <el-col :span="10" :offset="1">
      <div class="liveRoom" v-if="isLive">
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
      <el-button @click="startLive" v-else>開始直播</el-button>

    </el-col>
    <el-col :span="10" :offset="2">
      <div class="livingProduct">

        <el-collapse accordion>
          <el-collapse-item v-for="product in products" :name="product.id">
            <template slot="title">
              <div class="test">
                {{product.name}}
                <span v-if="sellingProduct.item_id === product.id">
                  商品推播中
                </span>
              </div>
            </template>
            {{product}}
            <el-button @click="sellProduct(product.id)">測試</el-button>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-col>
  </el-row>


</div>
</template>

<script>
import LiveBroadcast from './LiveBroadcast'
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
    sellProduct:function(itemId){
      this.$store.dispatch('sellProduct',itemId)
    }
  },
  computed: {
    products: function() {
      return this.$store.getters.products
    },
    isLive: function() {
      return this.$store.getters.userStatus.result
    },
    sellingProduct:function(){
      return this.$store.getters.sellingProduct
    }
  },
  mounted() {
    this.getProduct()
    // this.getSellingProduct()
  }
}
</script>

<style lang="scss" scoped>
.test {
    font-size: 24px;
}

button {
    margin-top: 10px;
}
</style>
