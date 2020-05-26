'use strict';
const express = require('express');
const app = express();
const startupSurvey = require('./app');
const bodyParser = require('body-parser');
const passport = require('passport');

app.set('port', process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000);

app.use(express.static('public'));

app.set('view engine','ejs');

app.use(startupSurvey.session);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', startupSurvey.router);

app.listen(app.get('port'),() => {console.log("App Running on Port : "+app.get('port'))});