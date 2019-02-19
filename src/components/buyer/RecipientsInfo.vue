<template>
<div class="">
  <div class="" v-for="recipient in recipientsInfo">
    {{recipient}}
    <el-button @click="deleteRecipient(recipient.recipient_id)"> 刪除收件人 </el-button>
  </div>
  {{userInfo}}
  <AddRecipient :isOpen="isOpen" @closeAddRecipient="closeAddRecipient"/>
  <el-button @click="openAddRecipient">新增收件人地址</el-button>
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
    },
    deleteRecipient: function(recipient_id){
      this.$store.dispatch('deleteRecipient',{recipients:[recipient_id]})
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
    // this.getRecipientsInfo()
  }
}
</script>

<style lang="css">
</style>
