const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 결제 http request시 salt key는 없지만 
// checkAuth를 통해 로그인이 되어있는지 체크해봐야 한다.
const jwt = require('jsonwebtoken');
const checkAuth = require('../../../middlewareAuthChecker/checkAuth');

const Toefl = require('../../../models/toefl/toeflModel');


const ToeflShowController = require('../../../controllers/toefl/showExam/showExam');



router.get('/', ToeflShowController.show_get_all);

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, (err, decoded) => {
        if(err) {
            res.status(401).json({
                title: 'auth failed',
                error: err
            });
        }
        next();
    });
});

 -

router.post('/:toeflNo', ToeflShowController.show_payment_exam);



 module.exports = router;
