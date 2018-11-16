// mongodb import
const mongoose = require('mongoose');

// 결재정보 진행을위한 json web token과 user 정보 불러오기
const jwt = require('jsonwebtoken');

const User = require('../../../models/users/userModel');

const Toefl = require('../../../models/toefl/toeflModel');
const Payment = require('../../../models/payment/paymentModel');



exports.show_get_all = (req, res, next) =>{
        console.log('check point');
        Toefl.find()      //exec() 모두 가져오기
                    .exec()
                    .then(toefls => {
                        console.log('최신 토플정보 가저오기', toefls.length);
                        res.status(200).json({
                            message: 'Toefl List 불러옴',
                            toefls: toefls,
                            lastToeflNo: toefls[toefls.length - 1].toeflNo
                        });
                    })
                    .catch(err =>{
                        res.status(500).json({
                            title: 'Toefl List Error',
                            message: 'Toefl List를 불러오는데 실패했습니다.'
                        });
                    })

    };

//벼튼을 누르면 바로 결재했다고 가정하고 진행.

exports.show_payment_exam = (req, res, next) => {
    console.log("User가 결재를 진행합니다.")

    //결재정보 진행시 User Database에 payment 기록을 저장하기에 user정보
    //에서 database에 저장된 유저의 기록과 일치하는 작업.

    const decoded = jwt.decode(req.query.token);
    console.log("결재를 시도하는 유저의 정보" + decoded.user.email);

    // 여기서는 결재하고자 하는 토플의 회차정보를 확인합니다.
    console.log('결재하고자 하는 토플의 회차' + req.params.toeflNo);
    console.log(req.body.paymentAmount);
    console.log(req.body.paymentAccpetCheck);

    // User Database에서 현재 로그인한 유저정보를 찾습니다.
    // asnyc 형식의 함수 형식.
    // findByID fucntion (id <-- 찾고자하는 정보) (err, user)
    // err가 발생시 에러처리를 우선시 하여 처리
    // err가 아닌경우, 결과 진행 user라는 이름은 임의 지정.
    // arrow function => asnyc function 을 표현하는 방법으로
    // 유저가 직관적으로 비동기방식의 흐름을 쫒을수있습니다.
    User.findById(decoded.user._id, (err, user) =>{
        if(err){
            return res.status(500).json({
                title : 'Unmatched User information Error',
                message : 'There is no user information matched in the database.'

            });
        //error를 처리하고, 에러가 없다면 payment db에 내용물을 저장합니다.
        } else {
            Payment.findOne({toeflNo: req.params.toeflNo })
            .exec()
            .then( paymentInfo =>{
                if (paymentInfo){
                    return res.status(409).json({
                        title: 'Payment Infomation already has been registered',
                        message: 'You already bought this Exam!'
                    });
                } else {
                    const payment = new Payment({
                        paymentDate: Date.now(),
                        toeflNo: req.body.toeflNo,
                        paymentConsumer : user._id
                    });
                }

            console.log(payment);

            payment
                    .save()
                    .then(result => {
                        //payment정보를 성공적으로 저장했다면 user정보에 있는 payment에도 정보를 추가합니다.
                        user.paymentId.push(result.toObject());
                        user.save();
                        res.status(200).json({
                            message: 'Payment Information has been saved Successfully!',

                        });

                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            title: 'payment proceed error',
                            message: 'Failed to check out processing.'
                        });
                    });
            });
        }
    });


}

