import axios from 'axios'

const http = axios.create({
    baseURL: 'http://0.0.0.0:5000'
})

export default http
