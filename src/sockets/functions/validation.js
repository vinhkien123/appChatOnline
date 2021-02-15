const jwt = require('jsonwebtoken')

module.exports = {
    tokenUser: (token) => {
        var decodeToken = jwt.verify(token, 'token_chat_online')
        if (decodeToken.data) {
            return decodeToken.data
        } else {
            return false
        }
    },
    tokenAdmin: (token) => {
        var decodeToken = jwt.verify(token, 'token_user_name')
        if (decodeToken.cusObj.type == "admin") {
            return true
        } else {
            return false
        }
    }
}