<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    getUserInfo: function() {
      if (this.$store.getters.token) {
        this.$store.dispatch('getUserInfo')
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
    // overflow: hidden;
    background-color: #f5f5f5;
}
</style>
