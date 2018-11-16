const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Reading = require('../../../models/toefl/readingModel');
const User = require('../../../models/users/userModel');

exports.reading_getOne = (req, res, next) => {

    //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.query.token);
    console.log("decoded: " + decoded.user.permissionTag);
    console.log("decoded: " + decoded.user.email);

    User.findById(decoded.user._id, (err, user) => {
      if (err) {
          return res.status(500).json({
            title: 'Toefle Registration Creation Error',
            message: 'The teacher is not existed'
          });
      } else {
                if (decoded.user.permissionTag == 'teacher') {
                    Reading.findOne({ toeflNo: req.params.toeflNo })
                                .then(reading => {
                                    res.status(200).json({
                                        message: 'get successfully',
                                        reading: reading
                                    });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                      title: 'Reading List Error',
                                      message: 'Reading List can not be listed'
                                    });
                                });
                } else {
                    return res.status(401).json({
                      title: 'Reading List Error',
                      message: 'You must have a right permission to access'
                    });
                }
            }
    })
}

//Reading Exam 등록 신청시 반드시 parameters로 toeflNo를 가지고 들어오기

exports.reading_create = (req, res, next) => {

    //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.query.token);
    console.log("decoded: " + decoded.user.email);
    console.log('toeflNO is '+ req.body.toeflNo);
    console.log('reading created date is '+ req.body.readingCreatedDate);
    console.log('readingSection Title is '+ req.body.section1Title);
    console.log('readingScript is '+ req.body.section1Script);


        User.findById(decoded.user._id, (err, user) => {
            if (err) {
                return res.status(500).json({
                title: 'Reading Exam Creation Error',
                message: 'The teacher is not existed'
                });
            } else {
                Reading.findOne({ toeflNo: req.body.toeflNo })
                .exec()
                .then( readingDoc => {
                    if (readingDoc) {
                        return res.status(409).json({
                            message: 'Toefl No. is already exists'
                        });
                    } else {
                        const reading = new Reading({
                            toeflNo: req.body.toeflNo,
                            readingCreatedDate: req.body.readingCreatedDate,
                            section1Title: req.body.section1Title,
                            section1Script: req.body.section1Script
                        });

                        console.log(reading);
                        reading
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    message: 'Reading section is saved successfully',
                                    reading: result
                                });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).json({
                                title: 'Reading Creation Error',
                                message: 'Reading Exam can not be registered'

                                });
                            });
                    }
                });
            }
        });
};

exports.reading_update = (req, res, next) => {

    //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.query.token);
    console.log(" updated decoded: " + decoded.user.email);
    console.log("updated toefl No" + req.body.toeflNo);
    console.log("updated section 1 title" + req.body.section1Title);
    console.log("updated section 2 title" + req.body.section2Title);
    console.log("updated section 3 title" + req.body.section3Title);
    console.log("updated section 4 title" + req.body.section4Title);
    
    updateOperation = {};

            if (req.body.section1Title !== '') {
                console.log('section 1')
                updateOperation = {
                    readingCreatedDate: req.body.readingCreatedDate,
                    section1Title: req.body.section1Title,
                    section1Script: req.body.section1Script

                };
            } else if (req.body.section2Title !== '') {
                console.log('section 2');
                updateOperation = { 
                    readingCreatedDate: req.body.readingCreatedDate,
                    section2Title: req.body.section2Title,
                    section2Script: req.body.section2Script
                };
            } else if (req.body.section3Title !== '') {
                console.log('section 3');
                updateOperation = { 
                    readingCreatedDate: req.body.readingCreatedDate,
                    section3Title: req.body.section3Title,
                    section3Script: req.body.section3Script
                };
            } else if (req.body.section4Title !== '') {
                console.log('section 4');
                updateOperation = { 
                    readingCreatedDate: req.body.readingCreatedDate,
                    section4Title: req.body.section4Title,
                    section4Script: req.body.section4Script
                };
            };

    console.log('update operation'+JSON.stringify(updateOperation));


        Reading.findOneAndUpdate({toeflNo : req.body.toeflNo }, { $set: updateOperation }, {new: true}, (err, reading) => {
                    if (err) {
                                  console.log(err);
                                  res.status(500).json({
                                  title: 'Reading general Update Error',
                                  message: 'Reading general can not be updated'
                                  });
                    }
                      console.log(reading);
                      return res.status(200).json({
                        message: 'Reading General Updated',
                        reading: reading});
        })
};

exports.reading_delete = (req, res, next) => {

    console.log('this is the req.files: ' + req.files);

    //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.query.token);
    console.log("decoded: " + decoded.user.email);

        User.findById(decoded.user._id, (err, user) => {
            if (err) {
                return res.status(500).json({
                title: 'Reading Exam Creation Error',
                message: 'The teacher is not existed'
                });
            } else {
                Reading.findOne({ toeflNo: req.params.toeflNo })
                .exec()
                .then( reaingDoc => {
                        if (readingDoc) {
                            reading.remove((err, result) => {
                                if (err) {
                                    return res.status(500).json({
                                    title: 'Reading General Deletion Error',
                                    message: 'Reading General can not be removed'
                                });
                                }
                                console.log(result);
                                res.status(200).json({
                                    message: 'deleted Toefl Exam',
                                    obj: result
                                });
                            });

                        } else {
                            return res.status(500).json({
                                title: ' Reading General Deletion Error',
                                message: 'Reading General can is not found'
                            });
                        }
                })
                .catch(err => {
                                console.error(err);
                                res.status(500).json({
                                title: 'Reading Creation Error',
                                message: 'Reading Exam can not be registered'

                                });
                            });
            }
        });

}

