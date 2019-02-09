import axios from 'axios'
export default function API(method, path, data) {
  return axios({
    method: method,
    url: `https://facebookoptimizedlivestreamsellingsystem.rayawesomespace.space/api/${path}`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${$cookies.get('FBtoken')}`
    },
  })
}
