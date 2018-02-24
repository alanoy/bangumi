import axios from 'axios'

let baseURL = 'http://localhost:3000'
if (process.browser && process.env.NODE_ENV === 'production') {
  baseURL = process.env.baseUrl
}

let instance = axios.create({
  baseURL
})

instance.interceptors.response.use((res) => {
  const { code } = res.data

  if (code !== 0) return Promise.reject(res.data)

  return res.data
}, (error) => {
  return Promise.reject(error)
})

export default instance
