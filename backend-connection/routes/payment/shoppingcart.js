const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const saltKey = require('../../middleware/saltKey');

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

