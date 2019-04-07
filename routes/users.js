const express = require('express');
const router = express.Router();

// imports
const User = require('../models/user');

//registration
    router.post('/register', (req, res, next) => {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save((err, user) => {
            if (err ) {
                return res.send({
                    success: false,
                    message: 'Failed to save the user'
                });
            }
            res.send({
                success: true,
                message: 'User Saved',
                user
            });
        });
    });

// login
    router.get('/login', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        const query = { email }
        // check the user exists
        User.findOne(query, (err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error, please try again'
                });
            }
            // checking for the user
            if (!user) {
                return res.send({
                    success: false,
                    message: 'Error, Account not Found!!'
                });
            }

            user.isPasswordMatch(password, user.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.send({
                        success: false,
                        message: 'Error, Invalid Password'
                    });
                }

                let returnUser = {
                    name: user.name,
                    email: user.email,
                    id: user._id
                }
                return res.send({
                    success: true,
                    message: 'You can login now',
                    user: returnUser
                });
            });
        });
        
    });


module.exports = router;