<template >
<div class="">
  <div class="" >
    姓名：{{userInfo.name}}
  </div>
  <div class="">輸入電話號碼</div>
  <el-input v-model="recipients.phone.phone_number"  placeholder="請輸入內容" ></el-input>
  <div class="">輸入國家</div>
  <el-autocomplete v-model="country" :fetch-suggestions="countrySearch" placeholder="請輸入內容" :trigger-on-focus="false" @select="countrySelector"></el-autocomplete>
  <div class="">輸入城市</div>
  <el-autocomplete v-model="recipients.address.city" :fetch-suggestions="citySearch" placeholder="請輸入內容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
  <div class="">輸入地址</div>
  <el-autocomplete v-model="recipients.address.district" :fetch-suggestions="addressSearch" placeholder="請輸入內容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
  <div class="">輸入其他</div>
  <el-input v-model="recipients.address.others"  placeholder="請輸入內容" ></el-input>
  {{recipients}}
  <el-button @click="addRecipients">  新增收件人</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      recipients:{
        name:'',
        phone:{
          phone_code: '',
          phone_number: ''
        },
        address:{
          country_code: '',
          post_code: '',
          city: '',
          district: '',
          others: ''
        },
      },
      country: '',
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
    countrySearch: function(queryString, cb) {
      var filterResults = queryString ? this.countryCodeList.filter(item => item.country.includes(queryString)) : this.countryCodeList;
      let renderArray = filterResults.map(item => {
        return { ...item,
          value: item.country
        }
      })
      cb(renderArray);
    },
    citySearch: function(queryString, cb) {
      var renderArray = queryString ? this.taiwanCity.filter(item => item.value.includes(queryString)) : this.taiwanCity;
      cb(renderArray);
    },
    addressSearch: function(queryString, cb) {
      var filterResults = queryString ? this.taiwanPostcodeList.filter(item => item.Area.includes(queryString)) : this.countryCodeList;
      let renderArray = filterResults.map(item => {
        return {
          value: item.Area
        }
      })
      cb(renderArray);
    },
    countrySelector: function(item) {
      this.recipients.phone.phone_code = String(item.phone_code)
      this.recipients.address.country_code =item.country_code
    },
    handleSelect: function(){
      if(this.recipients.address.city && this.recipients.address.district){
        this.taiwanPostcodeList.forEach(item=>{
          if(this.recipients.address.city === item.City && this.recipients.address.district === item.Area){
            this.recipients.address.post_code = item.ZipCode
          }
        })
      }
    },
    addRecipients:function(){
      this.recipients.name = this.userInfo.name
      this.$store.dispatch('addRecipients',this.recipients)
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
    taiwanCity: function() {
      return this.$store.getters.taiwanCity
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
