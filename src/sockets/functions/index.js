const data = require('../../database/account')


module.exports = {
    checkPhoneAccount: (phone) => {
        const array = data.account
        let flag = true
        array.forEach(user => {
            if (user === phone) {
                flag = false
            }
        })
        return flag
    },
    checkOutAccount: (phone, id) => {
        const array = data.account
        const update = array.filter(item => item.id != id)
        return update
    },
    arrayToString : (array) =>{
        const str = array.join(" ")
        // let a = str.replace(",", /\s+/g)
        return str
    }
}