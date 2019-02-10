import axios from 'axios'
export default function API(method, path, data) {
  return axios({
    method: method,
    url: `https://facebookoptimizedlivestreamsellingsystem.rayawesomespace.space/api/${path}`,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${$cookies.get('FBtoken')}`
    },
  })
}
