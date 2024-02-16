const mongoDB = require('mongoose');
exports.mongodb = async () => {
    mongoDB.connect(process.env.HOST_URI)
          .then(() => { console.log("connection okay") })
}