<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import changeToken from './units/token.js'
export default {
  name: 'App',
  methods: {
    getUserInfo: function() {
      if (this.$store.getters.token) {
        this.$store.dispatch('getUserInfo')
          .then(response => this.$store.dispatch('setUserInfo', response.data.response))
          .catch(error => {
            changeToken()
          })
      }
    }
  },
  mounted() {
    this.$store.dispatch('getToken')
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
p {
    margin: 0;
}
body {
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: #f5f5f5;
}
</style>
