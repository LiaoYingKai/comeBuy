<template>
<div class="">
  <div class="userInfo">
    <el-row :gutter="20">
      <el-col :span="6" :offset="1">
        <img :src="userInfo.avatar" alt="">
      </el-col>
      <el-col :span="14" :offset="2">
        <div class="">
          姓名：{{userInfo.name}}
        </div>
        <div class="">
          email：
          <div class="divInline" v-if="isEditEmail">
            <el-input v-model="editInfo.email" ></el-input>
            <el-button @click="cancelEditEmail"> 取消</el-button>
            <el-button @click="confirmEdit"> 修改</el-button>
          </div>
          <div class="divInline" v-else>
            {{userInfo.email}}
            <el-button @click="editEmail">編輯</el-button>
          </div>
        </div>
        <div class="">
          電話：
          <div class="divInline" v-if="isEditPhone">
            <el-input v-model="editInfo.phone.phone_number" ></el-input>
            <el-button @click="cancelEditPhone"> 取消</el-button>
            <el-button @click="confirmEdit"> 修改</el-button>
          </div>
          <div class="divInline" v-else>
            {{userInfo.phone.phone_number}}
            <el-button @click="editPhone">編輯</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="" v-for="recipient in recipientsInfo">
    <div class="recipientContent">
      <p>
        收件人姓名：{{recipient.name}}
      </p>
      <p>
        收件人地址：{{recipient.address.city}} {{recipient.address.district}} {{recipient.address.others}}
      </p>
      <p>
        收件人電話：{{recipient.phone.phone_number}}
      </p>
      <el-button @click="deleteRecipient(recipient.recipient_id)"> 刪除收件人 </el-button>
    </div>
  </div>
  <AddRecipient :isOpen="isOpen" @closeAddRecipient="closeAddRecipient" />
  <el-button @click="openAddRecipient">新增收件人地址</el-button>
</div>
</template>

<script>
import AddRecipient from './AddRecipient.vue'
export default {
  data() {
    return {
      isOpen: false,
      isEditEmail: false,
      isEditPhone: false,
      editInfo: {
        phone: {
          phone_code: "886",
          phone_number:''
        },
        email:''
      }
    }
  },
  components: {
    AddRecipient
  },
  methods: {
    getRecipientsInfo: function() {
      this.$store.dispatch('getRecipientsInfo')
    },
    openAddRecipient: function() {
      this.isOpen = true
    },
    closeAddRecipient: function() {
      this.isOpen = false
    },
    deleteRecipient: function(recipient_id) {
      this.$store.dispatch('deleteRecipient', {
        recipients: [recipient_id]
      })
    },
    editEmail: function() {
      this.isEditEmail = true
    },
    cancelEditEmail: function() {
      this.isEditEmail = false
    },
    editPhone: function() {
      this.isEditPhone = true
    },
    cancelEditPhone: function() {
      this.isEditPhone = false
    },
    confirmEdit: function() {
      this.editInfo.phone.phone_number ? this.editInfo.phone.phone_number : this.userInfo.phone.phone_number
      this.editInfo.email ? this.editInfo.email : this.userInfo.email
      this.$store.dispatch('updataUserInfo',this.editInfo)
      this.isEditEmail = false
      this.isEditPhone = false
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.getters.userInfo
    },
    recipientsInfo: function() {
      return this.$store.getters.recipientsInfo
    }
  },
}
</script>

<style lang="scss" scoped>
.userInfo {
    div {
        line-height: 50px;
        text-align: left;
    }
    img {
        width: 100%;
        height: auto;
    }
    .el-input {
        width: 200px;
    }
    .divInline {
        display: inline-block;
    }
}
.recipientContent{
  background-color: #fff;
  padding:20px;
}
</style>
