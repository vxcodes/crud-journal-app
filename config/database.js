const mongoose = require("mongoose");

const connectionString = 'mongodb+srv://admin:abc1234@cluster0.pa0vw.mongodb.net/calendar-app-new?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});