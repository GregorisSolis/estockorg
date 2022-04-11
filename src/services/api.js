import axios from 'axios'
import { URLBD } from './config.js'

import { getToken } from './auth.js'

const api = axios.create({ baseURL: URLBD })

api.interceptors.request.use(async config => {
	const token = getToken()
	if(token){
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api