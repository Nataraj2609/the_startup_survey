'use strict';
const config = require('../config');
const Mongoose = require('mongoose'), Schema = Mongoose.Schema;
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
Mongoose.connect(process.env.MONGODB_URI || config.dbURI, connectionOptions);


//Schema to Store User data
const startupUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String,
    mailId: String,
    createdDate: { type: Date, default: Date.now }
});

//Schema to Store User response data
const response = new Mongoose.Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }],
    mailId: String,
    createdDate: { type: Date, default: Date.now }
});

//UserModel
let UserModel = Mongoose.model('startupUser', startupUser);
//ResponseModel
let ResponseModel = Mongoose.model('response', response);

module.exports = {
    Mongoose,
    UserModel,
    ResponseModel
}