const User = require('../../model/User')
const Message = require('../../model/Message')
const Room = require('../../model/Room')
const jwt = require('jsonwebtoken')
const validation = require('../functions/validation')
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = {
    signUp: async (params) => {
        try {
            const { fullName, email, password } = params
            if (validateEmail(email)) {
                const user = await User.findOne({ email })
                if (!user) {
                    const addUser = new User({ fullName, email, password })
                    await addUser.save()
                    return {
                        message: "Đăng ký thành công !",
                        status: true
                    }
                } else {
                    return {
                        status: false,
                        message: "Email đã tồn tại ! "
                    }
                }
            } else {
                return {
                    status: false,
                    message: "Email không đúng định dạng !"
                }
            }

        } catch (error) {
            console.log(error);
            return error
        }
    },
    login: async (params, socketIo, io) => {
        try {
            const { email, password } = params
            if (validateEmail(email)) {
                const user = await User.findOne({ email, password })
                if (user) {
                    delete user.password
                    let data = {
                        email: user.email,
                        fullName: user.fullName,
                        _id: user._id,
                        idSocket: socketIo.id
                    }
                    const token = jwt.sign({ data }, "token_chat_online", { expiresIn: 60 * 518400 });
                    data.token = token
                    arrayUser.push({ fullName: data.fullName, _id: data._id, idSocket: socketIo.id })
                    // socketIo.join(data._id)
                    if (user.room) {
                        const array = user.room
                        console.log('ok join room', socketIo.join());
                        array.forEach(element => {
                            socketIo.join(`${element}`)
                        });
                    }
                    io.local.emit('listUser', arrayUser)
                    return {
                        message: "Đăng nhập thành công ! ",
                        status: true,
                        data
                    }
                } else {
                    return {
                        status: false,
                        message: "Tài khoản hoặc mật khẩu không đúng !"
                    }
                }
            } else {
                return {
                    message: "Email không đúng định dạng ! ",
                    status: false
                }
            }
        } catch (error) {
            console.log(error);
            return error
        }
    },
    logout: async (params, socketIo, io) => {
        const { token } = params
        const data = validation.tokenUser(token)
        console.log(data);
        if (data) {
            let updateOnline = arrayUser.filter(item => item.idSocket != data.idSocket)
            arrayUser = updateOnline
            io.local.emit('listUser', arrayUser)
            return {
                status: false,
                message: "Đăng xuất thành công !"
            }

        } else {
            return {
                status: false,
                message: "Lỗi hệ thống !"
            }
        }
    },
    loginOnline: async (params, socketIo, io) => {
        const { token } = params
        const data = validation.tokenUser(token)
        if (data) {
            data.idSocket = socketIo.id
            arrayUser.push(data)
            // socketIo.join(data._id)

            const user = await User.findById(data._id)

            if (user) {
                // socketIo.join(data._id)
                const array = user.room
                array.forEach(element => {
                    socketIo.join(element)
                });
                io.local.emit('listUser', arrayUser)
                return {
                    status: true,
                    message: "Đăng nhập thành công !"
                }
            }
            else {
                return {
                    status: false,
                    message: "Đăng nhập thất bại !"
                }
            }

        } else {
            return {
                status: false,
                message: "Lỗi hệ thống !"
            }
        }
    },
    sendMessage: async (params, socketIo, io) => {
        const { message, token, room } = params
        const data = validation.tokenUser(token)
        if (data) {
            const newMessage = new Message({ message })
            newMessage.user = data._id
            newMessage.room = room
            await newMessage.save()
            // socketIo.to(room).emit('message', newMessage)
            io.to(room).emit('message', newMessage)
            return {
                message: "Gửi tin nhắn thành công !",
                status: true
            }
        } else {
            return {
                message: "Lỗi hệ thống !",
                status: false
            }
        }
    },
    joinRoom: async (params, socketIo, io) => {
        try {
            const { token, idUser } = params
            const data = validation.tokenUser(token)
            if (data) {
                console.log(data);
                const room1 = await Room.findOne({ people: [data._id, idUser] })
                const room2 = await Room.findOne({ people: [idUser, data._id] })
                if (room1) {
                    return {
                        message: "Join Room thành công !",
                        status: true,
                        data: { idRoom: room1._id }
                    }
                } else if (room2) {
                    return {
                        message: "Join Room thành công !",
                        status: true,
                        data: { idRoom: room2._id }

                    }
                } else {
                    const arrayTest = [data._id, idUser]
                    const addRoom = new Room({ name: "chat" })
                    addRoom.people = arrayTest
                    await addRoom.save()
                    const user = await User.findById(data._id)
                    user.room.push(addRoom.id)
                    const user2 = await User.findById(idUser)
                    user2.room.push(addRoom.id)
                    // socketIo.join(room._id)
                    await user.save()
                    await user2.save()
                    return {
                        message: "Create Room thành công !",
                        status: true,
                        data: {
                            idRoom: addRoom.id
                        }
                    }
                }

            } else {
                return {
                    message: "Lỗi hệ thống !",
                    status: false
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    historyMessage: async (params, socketIo, io) => {
        const { idRoom } = params
        const room = await Message.find({ room: idRoom })
        if (room) {
            return {
                message: "Lấy lịch sử tin nhắn thành công !",
                status: true,
                data: room
            }
        } else {
            return {
                message: "Chưa có tin nhắn nào !",
                status: false
            }
        }
    }
}
