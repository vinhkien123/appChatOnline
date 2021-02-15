const MongoClient = require('mongoose')

var url = `mongodb://localhost:27017`

MongoClient.connect('mongodb+srv://chatonline:chatonline@cluster0.it7i8.mongodb.net/chatonline?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log("connect success");
}).catch((err) => {
    console.error(err);
})
module.exports = MongoClient