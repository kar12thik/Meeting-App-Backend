const mongoose = require('mongoose')

const mongoDB = 'mongodb+srv://kar12thik:kar12thik@cluster0-utshh.mongodb.net/meeting_hall?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
