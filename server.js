'use strict';
const express = require('express');
const app = express();
const buddiesChat = require('./app');
const passport = require('passport');

app.set('port', process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000);

app.use(express.static('public'));

app.set('view engine','ejs');


app.use(buddiesChat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', buddiesChat.router);

app.listen(app.get('port'),() => {console.log("App Running "), app.get('port')});