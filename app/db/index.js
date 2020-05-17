'use strict';
const config = require('../config');
const Mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
Mongoose.connect(process.env.MONGODB_URI || config.dbURI, connectionOptions);


//Schema to Store User data
const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

//UserModel
let UserModel = Mongoose.model('chatUser', chatUser);

module.exports = {
    Mongoose,
    UserModel
}