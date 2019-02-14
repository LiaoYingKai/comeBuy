<template>
<div class="">
  <AddRecipient :isOpen="isOpen" @closeAddRecipient="closeAddRecipient"/>
  <el-button @click="openAddRecipient">新增收件人地址</el-button>
  {{recipientsInfo}}
</div>
</template>

<script>
import AddRecipient from './AddRecipient.vue'
export default {
  data(){
    return {
      isOpen: false
    }
  },
  components: {
     AddRecipient
  },
  methods: {
    getRecipientsInfo: function() {
      this.$store.dispatch('getRecipientsInfo')
    },
    openAddRecipient: function(){
      this.isOpen = true
    },
    closeAddRecipient: function(){
      this.isOpen = false
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.getters.userInfo
    },
    recipientsInfo: function() {
      return this.$store.getters.recipientsInfo
    },
  },
  mounted() {
    this.getRecipientsInfo()
  }
}
</script>

<style lang="css">
</style>
