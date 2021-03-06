import store from '../store.js'
export default function tokenFlow() {
  FB.login(response => {
    console.log(response)
    store.dispatch('setFBStatus',response)
    if(response.status !== "unknown"){
      let data = {
        expiresIn: response.authResponse.expiresIn
      }
      $cookies.set('FBtoken', response.authResponse.accessToken)
      store.dispatch('getToken')
      store.dispatch('createAccount', data)
    }
  })
}
