import axios from 'axios'

const instance = axios.create({
    baseURL: getenv('BACK_URL')
})

instance.interceptors.request.use((config) => {
    config.headers.setAuthorization("Bearer " + window.localStorage.getItem('token'))
    return config
})

export default instance
