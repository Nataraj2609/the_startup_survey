'use strict';
const helper = require('../helpers/');
const passport = require('passport');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': [helper.isAuthenticated , (req, res, next) => {
                res.render('rooms', {
                    user: req.user
                });
            }],
            '/success': [helper.isAuthenticated ,(req, res, next) => {
                res.render('success');
            }],
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/logout': (req, res, next) => {
                req.logout();
                res.redirect('/');
            }
        },
        'post': {
            '/submit': (req, res, next) => {
                helper.createNewResponse(req);
                res.redirect('/success');
            }

        },
         'NA': (req, res, next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }

    return helper.route(routes);

}