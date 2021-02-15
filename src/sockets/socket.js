const { path } = require('./configs/config');
const socketPasser = require('./socketPasser');
const { isValidObject, isRequiredObject, isDefinedObject } = require('../commons/functions/validateObj') //Keeping this public

socket = function (io) {
    //Listening for connection client.
    io.on('connection', function (socketIo) {
        // console.log("tesea");
        socketIo.on(path.SER_PAT, function (req) {
            
            socketPasser(req, socketIo, io);
        });
        socketIo.on('disconnect', () => {
            if (!socketIo.id) return;
            let updateOnline = arrayUser.filter(item => item.idSocket != socketIo.id)
            arrayUser = updateOnline
            io.local.emit('listUser', arrayUser)

        })
    });
}

module.exports.socket = socket
