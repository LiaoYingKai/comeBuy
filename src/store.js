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
    countryCode:[],
    channelURL:''
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
    countryCode:(state)=>{
      return state.countryCode
    },
    getChannelURL:(state)=>{
      return state.channelURL
    }
  },
  mutations: {
    setToken:(state,token)=>{
      state.fbToken = token
    },
    setuserStatus:(state,userStatus)=>{
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
    setCountryCode:(state,countryCode)=>{
      state.countryCode = countryCode
    },
    setChannelURL:(state,channelURL)=>{
      state.channelURL = channelURL
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
        })
      })
    },
    getUserInfo:({commit})=>{
      return API('GET','users')
    },
    setUserInfo:({commit},data)=>{
      commit('setUserInfo',data)
    },
    getUserStatus:({commit})=>{
      API('GET','user-status')
      .then(response=>{
        console.log(response)
        commit('setuserStatus',response.data)
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
        // dispatch('getSellingProduct')
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
    },
    sellProduct:({dispatch},itemId)=>{
      API('POST',`streaming-items/${itemId}`)
      .then(response=>{
        console.log(response)
        dispatch('getSellingProduct')
      })
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
        commit('setTaiwanPostcode',response.data.response)
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
        commit('setChannelURL',response.data.response)
        dispatch('getUserStatus')
      })
    },
    leaveCahnnel:({commit,dispatch})=>{
      API('PUT','user-channel-id')
      .then(response=>{
        console.log(response)
        commit('setChannelURL','')
        dispatch('getUserStatus')

      })
    }
  }
})
