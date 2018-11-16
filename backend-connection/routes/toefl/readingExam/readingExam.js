const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../../middlewareAuthChecker/checkAuth');
const saltKey = require('../../../middlewareAuthChecker/saltKey');
const Reading = require('../../../models/toefl/readingModel');
const ToeflReadingController = require('../../../controllers/toefl/readingExam/readingExam');

// jwt를 이용한 인증방법 1-- query 방식을 사용하여 http  request 시 query값으로 token을 가지고 오는방식

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, saltKey, (err, decoded) => {
        if (err) {
            res.status(401).json({
                title: 'not Authenticated',
                error: err
            });
        }
        next();
    });
});


router.get('/:toeflNo', ToeflReadingController.reading_getOne);
router.post('/', ToeflReadingController.reading_create);
router.patch('/', ToeflReadingController.reading_update);
router.delete('/:toeflNo', ToeflReadingController.reading_delete);

module.exports = router;
