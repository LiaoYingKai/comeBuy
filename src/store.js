import Vue from 'vue'
import Vuex from 'vuex'
import API from './units/API.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fbToken:'',
    userInfo:'',
  },
  getters:{
    token:(state)=>{
      return state.fbToken
    },
    userInfo:(state)=>{
      return state.userInfo
    }
  },
  mutations: {
    setToken:(state,token)=>{
      state.fbToken = token
    },
    setUserInfo:(state,data)=>{
      state.userInfo = data
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
      })
    },
    getUserInfo:({commit})=>{
      API('GET','users')
      .then(response=>{
        commit('setUserInfo',response.data.response)
      })
    }
  }
})
