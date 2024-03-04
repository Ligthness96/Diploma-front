import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

instance.interceptors.request.use((config) => {
    config.headers.setAuthorization("Bearer " + window.localStorage.getItem('token'))
    return config
})

export default instance