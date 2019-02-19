<template >
<div class="">
  <el-row :gutter="20">
    <el-col :span="10" :offset="1">
      <LiveBroadcast v-if="isLive" />
      <el-input v-model="channel.channel_token" placeholder="輸入直播房號" v-else></el-input>
      <el-button @click="leaveChannel" v-if="isLive">離開直播</el-button>
      <el-button @click="joinChannel" v-else>加入直播</el-button>
    </el-col>
    <el-col :span="10" :offset="2">
      <div class="">
        <el-row>
          <el-col :span="10" :offset="1">
            <img :src="sellingProduct.image" alt="">
          </el-col>
          <el-col :span="10" :offset="2" class="productStyle">
            <div class="">
              商品描述：{{sellingProduct.description}}
            </div>
            <div class="">
              商品售價：{{sellingProduct.unit_price}}
            </div>
            <div class="">
              商品數量：{{sellingProduct.remaining_quantity}}
            </div>
            <div class="">
              銷售數量：{{sellingProduct.sold_quantity}}
            </div>
          </el-col>
        </el-row>
        <el-input-number v-model="shoppingCartInfo.number" :min="1"></el-input-number>
        <el-button @click="putIntoShoppingCart(sellingProduct.item_id)">放入購物車</el-button>
      </div>
      <SelectRecipient v-if="isSelect" @cancelAdd="closeSelect" :shoppingCartInfo="shoppingCartInfo"/>
    </el-col>
  </el-row>
</div>
</template>

<script>
import LiveBroadcast from '../common/LiveBroadcast'
import SelectRecipient from './SelectRecipient'
export default {
  components: {
    LiveBroadcast,
    SelectRecipient
  },
  data() {
    return {
      channel: {
        channel_token: ''
      },
      isSelect:false,
      shoppingCartInfo:{
        itemId:'',
        recipientId:'',
        number:''
      }
    }
  },
  methods: {
    joinChannel: function() {
      this.$store.dispatch('joinChannel', this.channel)
    },
    leaveChannel: function() {
      this.$store.dispatch('leaveCahnnel')
    },
    getSellingProduct: function() {
      this.$store.dispatch('getSellingProduct')
    },
    putIntoShoppingCart: function(id) {
      this.shoppingCartInfo.itemId = id
      console.log(this.shoppingCartInfo)
      this.openSelect()
    },
    openSelect: function(){
      this.isSelect = true
    },
    closeSelect: function(){
      this.isSelect = false
    }
  },
  computed: {
    isLive: function() {
      return this.$store.getters.userStatus.result
    },
    sellingProduct: function() {
      return this.$store.getters.sellingProduct
    },
    userStatus: function() {
      return this.$store.getters.userStatus
    }
  },
}
</script>
<style lang="scss" scoped>
img {
    width: 100%;
    height: auto;
}
.productStyle {

    div {
        text-align: left;
    }
}
</style>
