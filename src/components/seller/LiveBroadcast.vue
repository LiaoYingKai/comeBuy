<template>
<div class="">
  <div class="fb-video" :data-href="url" data-allowfullscreen="true" data-width="500"></div>
</div>
</template>

<script>
export default {
  data(){
    return{
      url:'',
    }
  },
  methods: {
    init: function() {
      if(this.userStatus.response.iFrame){
        this.url = this.userStatus.response.iFrame
      }
      FB.init({
        appId: '326735094614431',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
      });
    },
  },
  computed: {
    userStatus: function() {
      return this.$store.getters.userStatus
    }
  },
  watch:{
    userStatus:function(){
      console.log("fuck")
      this.init()
    }
  },
  mounted(){
    if(this.userStatus.result){
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
