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
    sellingProduct:{}
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
    closeLive:({dispatch})=>{
      API('PUT','users-channel-id')
      .then(response=>{
        console.log(response)
        dispatch('getUserStatus')
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
    }
  }
})
