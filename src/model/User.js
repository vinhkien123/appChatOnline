const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    room: [
        {
            type: Schema.Types.ObjectId,
            ref: "room"
        }
    ]
})

const User = mongoose.model('user', userSchema)
module.exports = User