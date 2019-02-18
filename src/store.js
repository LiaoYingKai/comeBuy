import Vue from 'vue'
import Vuex from 'vuex'
import API from './units/API.js'
import formAPI from './units/formAPI.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fbToken:'',
    userInfo:'',
    userStatus:{},
    products:[],
    liveInfo:{},
    sellingProduct:{},
    recipientsInfo:{},
    taiwanPostcode:[],
    taiwanCity:[],
    countryCode:[],
    shoppingCarts:[],
    thirdPay:[]
  },
  getters:{
    token:(state)=>{
      return state.fbToken
    },
    userStatus:(state)=>{
      return state.userStatus
    },
    userInfo:(state)=>{
      return state.userInfo
    },
    products:(state)=>{
      return state.products
    },
    sellingProduct:(state)=>{
      return state.sellingProduct
    },
    recipientsInfo:(state)=>{
      return state.recipientsInfo
    },
    taiwanPostcode:(state)=>{
      return state.taiwanPostcode
    },
    taiwanCity:(state)=>{
      return state.taiwanCity
    },
    countryCode:(state)=>{
      return state.countryCode
    },
    shoppingCarts:(state)=>{
      return state.shoppingCarts
    },
    thirdPay:(state)=>{
      return state.thirdPay
    }
  },
  mutations: {
    setToken:(state,token)=>{
      state.fbToken = token
    },
    setUserStatus:(state,userStatus)=>{
      state.userStatus = userStatus
    },
    setUserInfo:(state,userInfo)=>{
      state.userInfo = userInfo
    },
    setProduct:(state,productList)=>{
      state.products = productList
    },
    setLiveInfo:(state,liveInfo)=>{
      state.liveInfo = liveInfo
    },
    setSellingProduct:(state,productInfo)=>{
      state.sellingProduct = productInfo
    },
    setRecipientsInfo:(state,recipientsInfo)=>{
      state.recipientsInfo = recipientsInfo
    },
    setTaiwanPostcode:(state,taiwanPostcode)=>{
      state.taiwanPostcode = taiwanPostcode
    },
    setTaiwanCity:(state,taiwanCity)=>{
      state.taiwanCity = taiwanCity
    },
    setCountryCode:(state,countryCode)=>{
      state.countryCode = countryCode
    },
    setShoppingCart:(state,shoppingCarts)=>{
      state.shoppingCarts = shoppingCarts
    },
    setThirdPay:(state,thirdPay)=>{
      state.thirdPay = thirdPay
    }
  },
  actions: {
    getToken:({commit})=>{
      commit('setToken',$cookies.get('FBtoken'))
    },
    createAccount:({dispatch},data)=>{
      API('POST','token',data)
      .then(response=>{
        dispatch('getUserInfo')
        .then(response => {
          dispatch('setUserInfo', response.data.response)
          dispatch('getProduct')
          dispatch('getUserStatus')
        })
      })
    },
    getUserInfo:({commit})=>{
      return API('GET','users')
    },
    setUserInfo:({commit},data)=>{
      commit('setUserInfo',data)
    },
    getUserStatus:({commit,dispatch})=>{
      API('GET','user-status')
      .then(response=>{
        console.log(response)
        commit('setUserStatus',response.data)
        if(response.data.result){
          dispatch('getSellingProduct')
        }
      })
    },
    addProduct:({dispatch},formData)=>{
      return formAPI('POST','items',formData)
    },
    getProduct:({commit})=>{
      return API('GET','items')
      .then(response=>{
        console.log(response)
        commit('setProduct',response.data.response)
      })
    },
    deleteProduct:({dispatch},deleteItem)=>{
      API('DELETE','items',deleteItem)
      .then(response=>{
        console.log(response)
        dispatch('getProduct')
      })
    },
    editProduct:({dispatch},product)=>{
      let Id = product.Id
      let dataForm = product.dataForm
      console.log(Id,dataForm)
      formAPI('POST',`items/${Id}`,dataForm)
      .then(response=>{
        console.log(response)
        dispatch('getProduct')
      })
    },
    startLive:({dispatch},liveInfo)=>{
      API('POST','channel',liveInfo)
      .then(response=>{
        console.log(response)
        dispatch('getUserStatus')
        dispatch('getSellingProduct')
      })
    },
    closeLive:({dispatch,commit})=>{
      API('PUT','users-channel-id')
      .then(response=>{
        console.log(response)
        dispatch('getUserStatus')
        commit('setSellingProduct',{})
      })
    },
    getSellingProduct:({commit})=>{
      API('GET','streaming-items')
      .then(response=>{
        console.log(response)
        commit('setSellingProduct',response.data.response)
      })
      .catch(err=>{
        console.log(err)
        commit('setSellingProduct',{})
      })
    },
    sellProduct:({dispatch},itemId)=>{
      API('POST',`streaming-items/${itemId}`)
      .then(response=>{
        console.log(response)
        dispatch('getSellingProduct')
      })
    },
    addRecipients:({dispatch},recipients)=>{
      API('POST','recipients',recipients)
      .then(response=>{
        console.log(response)
        dispatch('getRecipientsInfo')
      })
    },
    deleteRecipient:({dispatch},recipientsId)=>{
        API('DELETE','recipients',recipientsId)
        .then(response=>{
          console.log(response)
          dispatch('getRecipientsInfo')
        })
    },
    editRecipients:({dispatch})=>{

    },
    getRecipientsInfo:({commit})=>{
      API('GET','recipients')
      .then(response=>{
        console.log(response)
        commit('setRecipientsInfo',response.data.response)
      })
    },
    getTaiwanPostcode:({commit})=>{
      API('GET','taiwan-post-code')
      .then(response=>{
        console.log(response)
        let responseArray= response.data.response
        let cityArray = responseArray.map(item=>{
          //這邊要將重複的篩選掉
          return {value:item.City}
        })

        commit('setTaiwanPostcode',responseArray)
        commit('setTaiwanCity',cityArray)
      })
    },
    getCountryCode:({commit})=>{
      API('GET','country-code')
      .then(response=>{
        console.log(response)
        commit('setCountryCode',response.data.response)
      })
    },
    joinChannel:({commit,dispatch},data)=>{
      API('PATCH','user-channel-id',data)
      .then(response=>{
        console.log(response)
        dispatch('getUserStatus')
      })
    },
    leaveCahnnel:({commit,dispatch})=>{
      API('PUT','user-channel-id')
      .then(response=>{
        console.log(response)
        dispatch('getUserStatus')
      })
    },
    putIntoShoppingCart:({dispatch},shoppingCartInfo)=>{
      API('POST',`orders/${shoppingCartInfo.itemId}/${shoppingCartInfo.recipientId}`,{number:shoppingCartInfo.number})
      .then(response=>{
        console.log(response)
        dispatch('getSellingProduct')
      })
    },
    getShoppingCart:({commit})=>{
      API('GET','orders')
      .then(response=>{
        console.log(response)
        commit('setShoppingCart',response.data.response)
      })
    },
    getThirdPay:({commit})=>{
      API('GET','payment-services')
      .then(response=>{
        console.log(response)
        commit('setThirdPay',response.data.response)
      })
    },
    payingPayment:({},paymentInfo)=>{
      // console.log(paymentInfo)
      API('POST',`payments/${paymentInfo.thirdPayId}`,paymentInfo.payment)
      .then(response=>{
        // window.open(response.data.response)
        console.log(response)
      })
    }
  }
})
