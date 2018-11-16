const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const checkAuth = require('../../middlewareAuthChecker/checkAuth');
const saltKey = require('../../middlewareAuthChecker/saltKey');
const User = require('../../models/users/userModel');

const PaymentController = require('../../controllers/payment/payment');

router.get('/', PaymentController.payment_get_result);


router.use('/', (req, res, next) =>{
    jwt.verify(req.query.token, saltKey, (err, decoded) =>{
        if(err){
            res.status(401).json({
                title: 'auth failed',
                error: err
            });
        }
        console.log("payment hello");
        next();
    })
})



module.exports = router;

