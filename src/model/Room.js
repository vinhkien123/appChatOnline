const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    people: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    name: {
        type: String
    },


})

const Room = mongoose.model('room', roomSchema)
module.exports = Room