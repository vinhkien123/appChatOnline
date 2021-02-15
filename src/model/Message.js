const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    created_ad: { type: Date, required: true, default: Date.now }


})

const Message = mongoose.model('message', messageSchema)
module.exports = Message