const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../../models/users/userModel');

exports.shoppingcart_post = (req, res, next) => {

    console.log("Shopping Cart List Save Mode!");

    const decoded = jwt.decode(req.query.token);

    shoppingListUpdate = {};
    console.log(req.body);

    updateShoppingcart = req.body;

            console.log("front로부터 온 정보" + updateShoppingcart);

            User.findByIdAndUpdate(
                                    {_id : decoded.user._id },
                                    {$set:{shoppingCartLists : updateShoppingcart }},
                                    {new: true}, (err, result) =>{

                                        if (err) {
                                            console.log(err);
                                            res.status(500).json({
                                                title : 'user shopping list update error',
                                                message : 'Failed to update user shopping list information.'
                                            })
                                        }
                                        return res.status(200).json({
                                                message: 'User Updated',
                                                result : result.shoppingCartLists
                                        });
            })

        }
