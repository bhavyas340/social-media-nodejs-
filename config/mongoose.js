//require library 
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

//connect to database
mongoose.connect('mongodb://localhost:27017/codeial_development')
// mongoose.connect('mongodb://localhost/todo_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error in connecting to db'));

db.once('open',function(){
    console.log('connected to database :: MongoDB')
});

module.exports = db;