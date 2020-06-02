'use strict';
const router = require('express').Router();
const db = require('../db');

let _registerRoutes = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
            _registerRoutes(routes[key], key);
        } else {
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            } else {
                //Bug 1
                router.use(routes[key]);
            }
        }
    }
}

let route = (routes) => {
    _registerRoutes(routes);
    return router;
}

let findOne = profileID => {
    return db.UserModel.findOne({
        //Bug 2
        'profileId': profileID
    });
}

let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newChatUser = new db.UserModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });

        newChatUser.save(error => {
            if (error)
                console.log('Create New user Error');
            else
                resolve(newChatUser);
        });
    });
}

let findById = id => {
    return new Promise((resolve, reject) => {
        db.UserModel.findById(id, (error, user) => {
            if (error)
                reject(error);
            else
                resolve(user);
        });
    });
}

// Middleware to restrict URL
let isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/');
}

//Response Data Insertion
let createNewResponse = req => {
    return new Promise((resolve, reject) => {
        if (req.user.fullName) {
            const responseData = new db.ResponseModel(req.body);
            responseData.user = req.user.fullName;
            console.log('Data in Form Response ', responseData);

            responseData.save(error => {
                if (error)
                    console.log('Create New Response Data -Form Error');
                else
                    resolve(responseData);
            });
        }
    });
}

module.exports = {
    route,
    findOne,
    createNewUser,
    findById,
    isAuthenticated,
    createNewResponse
}