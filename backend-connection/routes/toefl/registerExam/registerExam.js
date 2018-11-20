/*

단일 파일을 올리는 경우
router.post('/:toeflNo', upload.single('toeflImage'), ToeflRegisterController.register_create1);
여러개의 파일을 올리는 경우

jwt를 이용한 인증방법 1-- query 방식을 사용하여 http  request 시 query값으로 token을 가지고 오는방식

http request시 header 값을 authorization, Bearer를 진행하였을시 사용하는 인증방식
router.post('/:toeflNo', checkAuth, upload.single('toeflImage'),ToeflRegisterController.register_create);
router.patch('/:id', checkAuth, upload.single('toeflImage'),ToeflRegisterController.register_update);
router.delete('/:id', checkAuth, upload.single('toeflImage'),ToeflRegisterController.register_delete);
router.post('/:toeflNo', upload.array('toeflFiles', 12), ToeflRegisterController.register_create);
router.patch('/:toeflNo', upload.array('toeflFiles', 12), ToeflRegisterController.register_update);
*/

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multerFileUpload = require('../../../middleware/multerFileUpload');
const saltKey = require('../../../middleware/saltKey');
const ToeflRegisterController = require('../../../controllers/toefl/registerExam/registerExam');

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
router.post('/:toeflNo', multerFileUpload, ToeflRegisterController.register_create);
router.patch('/:toeflNo', multerFileUpload, ToeflRegisterController.register_update);
router.delete('/:toeflId', ToeflRegisterController.register_delete);

module.exports = router;
