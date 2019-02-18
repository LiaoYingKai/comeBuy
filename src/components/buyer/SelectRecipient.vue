<template >
<div class="modal">
  <div class="modal-content">
    <div class="" v-for="recipient in recipients" :key="recipient.recipient_id">
      <el-radio v-model="recipientId" :label="recipient.recipient_id">{{recipient}}</el-radio>
    </div>
    <el-button @click="cancelAdd">取消</el-button>
    <el-button @click="addIntoShoppingCart">加入購物車</el-button>
  </div>
</div>
</template>

<script>
export default {
  props: ['shoppingCartInfo'],
  data() {
    return {
      recipientId: '',
    }
  },
  methods: {
    close: function(){
      this.$emit('cancelAdd')
    },
    cancelAdd: function() {
      this.close()
    },
    addIntoShoppingCart: function() {
      this.shoppingCartInfo.recipientId = this.recipientId
      this.$store.dispatch('putIntoShoppingCart',this.shoppingCartInfo)
      this.close()
    }
  },
  computed: {
    recipients: function() {
      return this.$store.getters.recipientsInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
.modal {
    @include modal();
}
</style>
