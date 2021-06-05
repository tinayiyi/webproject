import axios from 'axios'

const serves = axios.create({
  baseURL: process.env.VUE_APP_VID,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
axios.defaults.headers.post['Content-Type'] = 'application/json'

const customRequest = params => {
  return serves(params)
}

export default customRequest
