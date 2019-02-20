<template>
<div class="home">
  <div class="content">
    <p>天天來買</p>
    <button @click="FBlogin" name="button" v-if="(fbStatus.status === 'unknown' || !(fbStatus.status)) && !(fbToken)" class="login">FB Login</button>
    <div class="" v-else>
      <button @click="buyerLogin" class="buyer">前往買家平臺<br></button>
      <button @click="sellerLogin" class="seller">前往賣家平臺<br></button>
    </div>
  </div>
</div>
</template>

<script>
import FBlogin from '../units/token.js'

export default {
  name: 'home',
  methods: {
    sellerLogin: function() {
      this.$router.push('mainPage/product')
    },
    buyerLogin: function() {
      this.$router.push('mainPage/shoppingCart')
    },
    FBlogin: function() {
      FBlogin()
    },
  },
  computed: {
    fbStatus: function() {
      return this.$store.getters.fbStatus
    },
    fbToken: function(){
      return this.$store.getters.token
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../scss/mixin';
.home {
    height: 100vh;
    width: 100vw;
    background-image: url("../assets/homeBackground.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
}
.content {
    margin-left: 15vw;
    p {
        font-size: 48px;
        font-family: sans-serif;
    }
    .buyer {
        @include buttonStyle(20px,10px 20px,24px,#61bd4f);
    }
    .seller {
        @include buttonStyle(20px,10px 20px,24px,#0079bf);
    }
    .login{
      @include buttonStyle(20px,10px 20px,24px,#0079bf);
    }
    span {
        font-size: 16px;
    }
}
</style>
