<template >
<div class="">
  {{userInfo}} {{recipientsInfo}} 個人基本資料
  <div class="sub-title">輸入國家</div>
  <el-autocomplete v-model="country" :fetch-suggestions="querySearch" placeholder="請輸入內容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
</div>
</template>

<script>
export default {
  data() {
    return {
      country: '',
      countryCode:'',
      city:'',
      address:'',
      taiwanPostcode:''

    }
  },
  methods: {
    getRecipientsInfo: function() {
      this.$store.dispatch('getRecipientsInfo')
    },
    getTaiwanPostcode: function() {
      this.$store.dispatch('getTaiwanPostcode')
    },
    getCountryCode: function() {
      this.$store.dispatch('getCountryCode')
    },
    querySearch(queryString, cb) {
      var results = queryString ? this.countryCodeList.filter(item=>item.country.includes(queryString)) : this.countryCodeList;
      let array = results.map(item=>{
        return item.value = item.country
      })
      console.log(cb)
      cb(array);
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.getters.userInfo
    },
    recipientsInfo: function() {
      return this.$store.getters.recipientsInfo
    },
    taiwanPostcodeList: function() {
      return this.$store.getters.taiwanPostcode
    },
    countryCodeList: function() {
      return this.$store.getters.countryCode
    }
  },
  mounted() {
    this.getRecipientsInfo(),
      this.getTaiwanPostcode(),
      this.getCountryCode()
  }
}
</script>

<style lang="scss" scoped>
</style>
