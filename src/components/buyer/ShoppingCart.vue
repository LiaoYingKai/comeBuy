<template >
<div class="">
  <el-tabs v-model="activeName" @tab-click="filterShoppingCart">
    <el-tab-pane label="未結帳訂單" name="unchecked"></el-tab-pane>
    <el-tab-pane label="已結帳訂單" name="checked"></el-tab-pane>
    <el-tab-pane label="所有訂單" name="all"></el-tab-pane>
  </el-tabs>
  <div class="">
    <el-row :gutter="20" v-for="shoppingCart in shoppingCartList">
      <el-col :span="1" :offset="1" v-if="activeName == 'unchecked'">
        <input type="checkbox" :id="shoppingCart.id" :value="shoppingCart.id" v-model="paymentInfo.payment.order_id">
        <label :for="shoppingCart.id"></label>
      </el-col>
      <el-col :span="1" :offset="1" v-else>
        <input type="checkbox" disabled>
      </el-col>
      <el-col :span="6">
        <img :src="shoppingCart.images" alt="">
      </el-col>
      <el-col :span="14" :offset="1">
        <ShoppingCartProduct :shoppingCart="shoppingCart" />
      </el-col>
    </el-row>
    <el-button @click="openPay" v-if="activeName == 'unchecked'" :disabled="!shoppingCartList.length"> 付款 </el-button>
  </div>
  <div class="modal" v-if="isPay">
    <div class="modal-content">
      <h3>選擇付款方式</h3>
      <p>總金額：${{totalPay}}</p>
      <el-radio v-model="paymentInfo.thirdPayId" :label="payMethod.id" v-for="payMethod in thirdPay">{{payMethod.name}}</el-radio>
      <div class="">
        <el-button @click="cancelPay"> 取消付款 </el-button>
        <el-button @click="pay"> 付款 </el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ShoppingCartProduct from './ShoppingCartProduct'
export default {
  components: {
    ShoppingCartProduct
  },
  data() {
    return {
      activeName: 'unchecked',
      shoppingCartList: [],
      isPay: false,
      paymentInfo: {
        thirdPayId: '',
        payment: {
          order_id: [],
          ClintBackURL: "http://localhost:8080/mainPage/ShoppingCart",
          source: "mobile"
        }
      }
    }
  },
  methods: {
    getShoppingCart: function() {
      this.$store.dispatch('getShoppingCart')
    },
    getThirdPay: function() {
      this.$store.dispatch('getThirdPay')
    },
    pay: function() {
      console.log(this.paymentInfo)
      this.closePay()
      this.$store.dispatch('payingPayment', this.paymentInfo)
    },
    filterShoppingCart: function() {
      if (this.activeName === "unchecked") {
        let array = this.shoppingCarts.filter(item => {
          if (!item.status) {
            return item
          }
        })
        this.shoppingCartList = array
      } else if (this.activeName === "checked") {
        let array = this.shoppingCarts.filter(item => {
          if (item.status) {
            return item
          }
        })
        this.shoppingCartList = array
      } else {
        this.shoppingCartList = this.shoppingCarts
      }
    },
    openPay: function() {
      this.isPay = true
    },
    closePay: function() {
      this.isPay = false
    },
    cancelPay: function() {
      this.closePay()
    }
  },
  computed: {
    shoppingCarts: function() {
      return this.$store.getters.shoppingCarts
    },
    thirdPay: function() {
      return this.$store.getters.thirdPay
    },
    totalPay: function() {
      let total = 0
      this.shoppingCarts.forEach(item => {
        if (this.paymentInfo.payment.order_id.indexOf(item.id) >= 0) {
          total += item.quantity * item.unit_price
        }
      })
      return total
    }
  },
  watch:{
    shoppingCarts:function(){
      this.filterShoppingCart()
    }
  },
  mounted() {
    this.getThirdPay(),
      this.filterShoppingCart()
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';
h3 {
    margin: 5px;
}
img {
    width: 100%;
    height: auto;
}
.modal {
    @include modal();
}
</style>
