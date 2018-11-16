const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const jwt = require('jsonwebtoken');
const checkAuth = require('../../middlewareAuthChecker/checkAuth');
const saltKey = require('../../middlewareAuthChecker/saltKey');
const User = require('../../models/users/userModel');

const ShoppingcartController = require('../../controllers/payment/shoppingcart/shoppingcart');


router.use('/', (req, res, next) =>{
    jwt.verify(req.query.token, saltKey, (err, decoded) =>{
        if(err) {
            res.status(401).json({
                title: 'auth failed',
                error: err
            });
        }
        console.log("hello!")
        next();
    });
});



router.post('/', ShoppingcartController.shoppingcart_post);


module.exports = router;


//delete

