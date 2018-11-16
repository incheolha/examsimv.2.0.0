const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../../middlewareAuthChecker/checkAuth');
const saltKey = require('../../../middlewareAuthChecker/saltKey');
const Toefl = require('../../../models/toefl/toeflModel');
const ToeflRegisterController = require('../../../controllers/toefl/registerExam/registerExam');


//multer setting
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './backend-connection/routes/toefl/registerExam/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, 'NO.'+req.params.toeflNo+'.'+(new Date()).toISOString()+file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'  ||
        file.mimetype === 'image/jpg'  ||
        file.mimetype === 'image/gif'  ||
        file.mimetype === 'audio/mp3' ||
        file.mimetype === 'audio/wav' ||
        file.mimetype ==='audio/ogg')
    {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage,
                       limits: {
                           fileSize: 1024 * 1024 * 1024 * 1024,
                           fieldSize: 1024 * 1024 * 1024
                       },
                       fileFilter: fileFilter
                    });

// 단일 파일을 올리는 경우
// router.post('/:toeflNo', upload.single('toeflImage'), ToeflRegisterController.register_create1);
// 여러개의 파일을 올리는 경우

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
router.get('/', ToeflRegisterController.register_get_all);
router.post('/:toeflNo', upload.array('toeflFiles', 12), ToeflRegisterController.register_create);
router.patch('/:toeflNo', upload.array('toeflFiles', 12), ToeflRegisterController.register_update);
router.delete('/:toeflId', ToeflRegisterController.register_delete);

// http request시 header 값을 authorization, Bearer를 진행하였을시 사용하는 인증방식
// router.post('/:toeflNo', checkAuth, upload.single('toeflImage'),ToeflRegisterController.register_create);
// router.patch('/:id', checkAuth, upload.single('toeflImage'),ToeflRegisterController.register_update);
// router.delete('/:id', checkAuth, upload.single('toeflImage'),ToeflRegisterController.register_delete);

module.exports = router;
