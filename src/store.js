import Vue from 'vue'
import Vuex from 'vuex'
import API from './units/API.js'
import formAPI from './units/formAPI.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fbToken:'',
    userInfo:'',
    products:[]
  },
  getters:{
    token:(state)=>{
      return state.fbToken
    },
    userInfo:(state)=>{
      return state.userInfo
    },
    products:(state)=>{
      return state.products
    }
  },
  mutations: {
    setToken:(state,token)=>{
      state.fbToken = token
    },
    setUserInfo:(state,userInfo)=>{
      state.userInfo = userInfo
    },
    setProduct:(state,productList)=>{
      state.products = productList
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
        .then(response => dispatch('setUserInfo', response.data.response))
      })
    },
    getUserInfo:({commit})=>{
      return API('GET','users')
    },
    setUserInfo:({commit},data)=>{
      commit('setUserInfo',data)
    },
    addProduct:({dispatch},data)=>{
      return formAPI('POST','items',data)
    },
    getProduct:({commit})=>{
      API('GET','items')
      .then(response=>{
        console.log(response)
        commit('setProduct',response.data.response)
      })
    }
  }
})
