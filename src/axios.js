import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://disanias-diploma-back-52bc.twc1.net'
})

instance.interceptors.request.use((config) => {
    config.headers.setAuthorization("Bearer " + window.localStorage.getItem('token'))
    return config
})

export default instance
