const customerService = require('./customerService');
const walletService = require('./walletService');
const { jsonResp } = require('../models/jsonResponse');
const customer2FA = require('./customer2FA');
const customerTron = require('./customerTron');
module.exports = {
    //Customer log-in service.
    signUp: (params, socketIo, io) => {
        return customerService.signUp(params, socketIo, io)
    },
    login: (params, socketIo, io) => {
        return customerService.login(params, socketIo, io)
    },
    logout: (params, socketIo, io) => {
        return customerService.logout(params, socketIo, io)
    },
    loginOnline: (params, socketIo, io) => {
        return customerService.loginOnline(params, socketIo, io)
    },
    joinRoom: (params, socketIo, io) => {
        return customerService.joinRoom(params, socketIo, io)
    },
    sendMessage: (params, socketIo, io) => {
        return customerService.sendMessage(params, socketIo, io)
    },
    historyMessage : (params, socketIo, io) => {
        return customerService.historyMessage(params, socketIo, io)
    },

}