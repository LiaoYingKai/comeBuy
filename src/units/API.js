import axios from 'axios'
import store from '../store.js'
export default function API(method, path, data) {
  return axios({
    method: method,
    url: `https://facebookoptimizedlivestreamsellingsystem.rayawesomespace.space/api/${path}`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${store.getters.token}`
    },
  })
}
