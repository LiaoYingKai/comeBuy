<template>
<div class="home">
  <div class="content">
    <p>天天來買</p>
    <button @click="buyerLogin" class="buyer">前往買家平臺<br></button>
    <button @click="sellerLogin" class="seller">前往賣家平臺<br></button>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    sellerLogin: function() {
      this.loginFlow()
    },
    buyerLogin: function() {
      this.loginFlow()
    },
    loginFlow:function(){
      if(this.$store.getters.token){
        this.$store.dispatch('getUserInfo')
      }else{
        this.fbLogin()
      }
    },
    fbLogin:function(){
      FB.login(response=>{
        let data = {
          expiresIn:response.authResponse.expiresIn
        }
        $cookies.set('FBtoken',response.authResponse.accessToken)
        this.$store.dispatch('getToken')
        this.createAccount(data)
      })
    },
    createAccount:function(data){
      this.$store.dispatch('createAccount',data)
    }
  }
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

    span{
    font-size: 16px;
    }
}
</style>
