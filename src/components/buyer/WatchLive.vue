<template >
<div class="">
  {{sellingProduct}}
  <LiveBroadcast v-if="isLive" />
  <el-input v-model="channel.channel_token" placeholder="輸入直播房號" v-else></el-input>
  <el-button @click="leaveChannel" v-if="isLive">離開直播</el-button>
  <el-button @click="joinChannel" v-else>加入直播</el-button>
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
      channel: {
        channel_token: ''
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
  },
  computed: {
    isLive: function() {
      return this.$store.getters.userStatus.result
    },
    sellingProduct: function(){
      return this.$store.getters.sellingProduct
    }
  },
  mounted(){
    // this.getSellingProduct()
  }
}
</script>
<style lang="scss" scoped>
</style>
