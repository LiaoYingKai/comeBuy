import Vue from 'vue'
import Vuex from 'vuex'
import API from './units/API.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fbToken:'',

  },
  getters:{
    token:(state)=>{
      return state.fbToken
    }
  },
  mutations: {
    setToken:(state,token)=>{
      state.fbToken = token
    }
  },
  actions: {
    getToken:({commit})=>{
      commit('setToken',$cookies.get('FBtoken'))
    },
    createAccount:({},data)=>{
      API('POST','token',data)
      .then(response=>{
        console.log(response)
      })
    }
  }
})
