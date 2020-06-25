import http from '../httpConfig/httpServiceLibrary'


export default {
    async accountLogin(username, password) {
        let queryUrl = '/matrix/login'
        return http.post(queryUrl ,{username , password})
    }
}
