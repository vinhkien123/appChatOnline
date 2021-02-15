const coinApi = require('./services/getCoinApi')
const coinConvert = require('./services/coinConvert');
const customRealTime = require('./services/customRealTime');
const jwt = require('jsonwebtoken')
const data = require('../database/account');
const { socket } = require('../sockets/socket');
// const apiPasser = require('./apiPasser');
let online = []
realtime = function (io) {
    var flagConnect = false;


    //Listening for connection client.
    io.on('connection', function (socketIo) {
        console.log("onl");
        let flag = true
        online.forEach((user) => {
            if (user == socketIo.id) {
                flag = false
            }
        })
        if (flag) {
            online.push(socketIo.id)
        }
        socketIo.on('online',(req)=>{
            socketIo.emit('userOnline',online.length)
        })
        io.local.emit('checkOnline', online.length)
        if (!flagConnect) {
            flagConnect = true;
            setInterval(async () => {
                try {
                    const dataCoin = await coinApi.coinApi();
                    coinConvert.convert(dataCoin, io, "min");
                } catch (error) {
                    console.log(error)
                }
            }, 60000);

            //Set time emiting to client.
            setInterval(async () => {
                try {
                    const dataCoin = await coinApi.coinApi();
                    coinConvert.convert(dataCoin, io, "sec");
                } catch (error) {
                    console.log(error)
                }
            }, 10000);
        }
        socketIo.on("joinApp", function (token) {
            // var decodedToken = jwt.verify(token, 'token_user_name');
            socketIo.join("joinApp");
            socketIo.phone = token
            socketIo.on('sendNotification', (listNotification) => {
                customRealTime.notification(listNotification, phone)
            })

        });
        socketIo.on('addNotification', async (req) => {
            console.log(socketIo.phone, "phone");

            const notification = await customRealTime.addNotification(req, io, socketIo)
            socketIo.emit('addNotification', notification)
        })
        socketIo.on('notificationALL', async (req) => {
            const data = {
                title: req.title,
                detail: req.detail
            }
            io.local.emit('notificationALL', data);
        })

        socketIo.on('disconnect', () => {
            // if (!socketIo.id) return;
            console.log("Asdasdda");
            // let updateOnline = online.filter(item => item != socketIo.id)
            // online = updateOnline
            // io.local.emit('checkOnline', online.length)

        })

    });
}

module.exports.realtime = realtime