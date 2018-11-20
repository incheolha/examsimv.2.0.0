const mongoose = require('mongoose');
const User = require('../../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltKey = require('../../middleware/saltKey');

exports.user_get_all = (req, res, next) => {

    User.find()
                .select()
                .exec()
                .then(docs => {

                    const response = {
                        count: docs.length,
                        users: docs.map(doc => {
                            return {
                                email: doc.email,
                                password: doc.password,
                                name: doc.name,
                                permissionTag: doc.permissionTag,
                                created_at: doc.created_at,
                                updated_at: doc.updated_at,
                                provider: doc.provider,
                                _id: doc._id,
                                request:   {
                                    type: 'GET',
                                    url: 'http://localhost:3000/user/' + doc._id
                                }
                            };
                        })
                    };
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });
};

exports.user_signUp = (req, res, next) => {
  console.log('name is '+ req.body.name);
  console.log('email is '+ req.body.email);
  console.log('password is '+ req.body.password);
  console.log('permission tag is '+ req.body.permissionTag);

    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length >= 1) {
                return res.status(409).json({
                  title: 'User SignUp Error',
                  message: 'User is already existed'
                });
            } else {
                console.log(req.body.password);

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {

                        return res.status(500).json({
                          title: 'User SignUp Error',
                          message: 'Password is not matched'
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            permissionTag: req.body.permissionTag
                        });
                        user
                            .save()
                            .then(result => {
                               const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                               return res.status(200).json({
                                message: 'user are saved successfully',
                                token: token,
                                permissionTag: user.permissionTag,
                                userName: user.name,
                                userEmail: user.email,
                                shoppingCartLists : user.shoppingCartLists,
                                paidToeflLists : user.paidToeflLists,
                                userId: user._id
                            });

                            })
                            .catch(err => {
                                res.status(500).json({
                                  title: 'User SignUp Error',
                                  message: 'User can not be saved'
                                });
                            });

                    }
                });

            }
        });
};

exports.user_login = (req, res, next) => {

    User.findOne({email: req.body.email})
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                  title: 'User Login Error',
                  message: 'User is not existing'
                });
            }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                  title: 'User Login Error',
                  message: 'Password is wrong.....'
                });
            }
            if (result) {
                const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    permissionTag: user.permissionTag,
                    userName: user.name,
                    userEmail: user.email,
                    shoppingCartLists : user.shoppingCartLists,
                    paidToeflLists : user.paidToeflLists,
                    paymentId : user.paymentId,
                    userId: user._id
                });
            }
            res.status(401).json({
              title: 'User Login Error',
              message: 'Authentication is failed'
            });
        });

    })
    .catch(err => {
        res.status(500).json({
          title: 'User Login Error',
          message: 'No user existed'
        });
    });
};

exports.user_delete = (req, res, next) => {
    const id = req.params.userId;

    User.remove({_id:id})
                            .exec()
                            .then(result => {
                                res.status(200).json(
                                    {
                                        message: 'User deleted'
                                    }
                                );
                            })
                            .catch(err => {
                                res.status(500).json({
                                  title: 'User Delete Error',
                                  message: 'User can not be deleted'
                                });
                            });
};
