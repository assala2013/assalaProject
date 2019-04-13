var mongoose = require('mongoose');
mongoose.Promise=global.Promise

var mongoDB = 'mongodb://localhost:27017/todoBase';
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports={mongoose};