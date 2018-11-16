const jwt = require('jsonwebtoken');
const User = require('../../../models/users/userModel');
const paypalKey = require('../paymentKeyContainers/paypalKeyContainer/paypalkeys');

const paypal = require('paypal-rest-sdk');
const Payment = require('../../../models/payment/paymentModel');

totalAmount = 0;              // paypal에 결재하고자 하는 총 금액을 계산할 금액에 대한 global변수로 지정한다
userId = '';                  // paypal에 피룡한 사용자 id값도 초기화한다
updatePaidToeflLists = [];    // paypal 결재후 mongodb에 저장하고자 하는 결재된 toefl lists를 위한 초기값

exports.create_payment = (req, res, next) => {

  console.log('this is the paypal back server');

  //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.body.userToken);

    console.log("decoded: " + decoded.user.email);
    console.log("shoppingCart: " + req.body.shoppingCartLists);
    updatePaidToeflLists = req.body.shoppingCartLists;
    userId = decoded.user._id;
    totalAmount = req.body.amount;

    paypal.configure({
            'mode':'sandbox',
            'client_id': paypalKey.CLIENT_ID,
            'client_secret': paypalKey.CLIENT_SECRET
    });

    const create_payment_json = {
            "intent" : "sale",
            "payer" : {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/paypal/executePayment",
                "cancel_url": "http://localhost:3000/paypal/cancelPayment"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Toefl Exam",
                        "sku": "exam simulator",
                        "price": totalAmount,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": totalAmount
                },
                "description": "This is the toefl payment description."

            }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if(error) {
            throw error;
        } else {

            console.log("Create Payment Response");
            console.log(payment);

            for(let pay of payment.links){
                if(pay.rel === 'approval_url'){
                    return res.json({
                                    url: pay.href
                    });
                }
            }
        }
    });
}

// paypal 실행 모드

exports.execute_payment = (req, res, next) => {
    console.log('payment Id is ' + req.query.paymentId);
    console.log('payer Id is ' + req.query.PayerID);
    console.log('checkout Token is '+ req.query.token);

    var execute_payment_json = {
                                    "payer_id": req.query.PayerID,
                                    "transactions": [{
                                        "amount": {
                                            "currency": "USD",
                                            "total": totalAmount
                                        }
                                    }]
                                };

    var paymentId = req.query.paymentId;
// paypal 실제 실행하는 모드
    paypal.payment.execute(paymentId, execute_payment_json, (error, paymentInfo) => {
        if(error){
            console.log(error.response);
            throw error;
        } else {
            User.findById(userId, (err, user) => {
                    if (err) {
                        return res.status(500).json({
                            title: 'Auth Fail Error',
                            message: 'The User is not existed'
                            });
                    } else {

                        Payment.findOne({paymentID: paymentInfo.id})
                        .exec()
                        .then( paymentDoc => {
                            if(paymentDoc){
                                return res.status(409).json({
                                    message: 'Payment is already exists'
                                });
                            } else {
                                const payment = new Payment({
                                                                paymentID : paymentInfo.id,
                                                                paymentAgency : 'paypal',
                                                                paymentType : paymentInfo.transactions[0].related_resources[0].sale.payment_mode,
                                                                paymentAmount : paymentInfo.transactions[0].amount.total,
                                                                paymentTransactionFee: paymentInfo.transactions[0].related_resources[0].sale.transaction_fee.value,

                                                                paymentDate: Date.now(),
                                                                paymentBalanceTransactionID : paymentInfo.transactions[0].related_resources[0].sale.id,
                                                                paymentCurrency: paymentInfo.transactions[0].related_resources[0].sale.amount.currency,

                                                                paymentDescription: paymentInfo.transactions[0].description,

                                                                paymentResult : {
                                                                    paymentResultStatus : paymentInfo.transactions[0].related_resources[0].sale.state,
                                                                    // paymentResultReason : payment.transactions[0].related_resources[0].sale.,
                                                                    paymentResultRiskLevel : paymentInfo.transactions[0].related_resources[0].sale.protection_eligibility_type,
                                                                    paymentResultMessage : paymentInfo.transactions[0].related_resources[0].sale.protection_eligibility,
                                                                    paymentResultSummary : paymentInfo.transactions[0].related_resources[0].sale.state
                                                                },
                                                                paymentDetails : {
                                                                    paymentDetailsID : paymentInfo.id,
                                                                    paymentDetailsPaymentType : paymentInfo.payer.payment_method ,
                                                                    paymentDetailsPaymentBillingZIP :paymentInfo.payer.payer_info.postal_code,
                                                                    paymentDetailsPaymentBrand : paymentInfo.transactions[0].related_resources[0].sale.payment_mode,
                                                                    paymentDetailsPaymentCountry : paymentInfo.payer.payer_info.country_code,
                                                                    paymentDetailsPaymentCustomerID : paymentInfo.payer.payer_info.payer_id,
                                                                    paymentDetailsPaymentCustomerEmail : paymentInfo.payer.payer_info.email

                                                                },
                                                                shippingDetails : {
                                                                    shippingID : paymentInfo.cart,
                                                                    shippingStatus : paymentInfo.payer.status,
                                                                    shippingPayer : {
                                                                        shippingPayerEmail : paymentInfo.payer.payer_info.email,
                                                                        shippingPayerLastName : paymentInfo.payer.payer_info.last_name,
                                                                        shippingPayerFirstName : paymentInfo.payer.payer_info.first_name,
                                                                        shippingPayerID : paymentInfo.payer.payer_info.payer_id,
                                                                        shippingInfo : {
                                                                            shippingRecipientName : paymentInfo.payer.payer_info.shipping_address.recipient_name,
                                                                            shippingAddressLine : paymentInfo.payer.payer_info.shipping_address.line1,
                                                                            shippingCity : paymentInfo.payer.payer_info.shipping_address.city,
                                                                            shippingState : paymentInfo.payer.payer_info.shipping_address.state,
                                                                            shippingPostalCode : paymentInfo.payer.payer_info.shipping_address.postal_code,
                                                                            shippingCountry : paymentInfo.payer.payer_info.shipping_address.country_code
                                                                        }
                                                                    }
                                                                },
                                                                paymentStatus : paymentInfo.state,
                                                                userId: userId
                                                            });

                                payment
                                        .save()
                                        .then(result => {

                                                        for (let updatePaidToefItem of updatePaidToeflLists) {
                                                            user.paidToeflLists.push(updatePaidToefItem);
                                                        }
                                                        user.paymentId.push(result.toObject());

                                                        user.save()
                                                            .then( userDoc => {
                                                              return res.status(200).redirect('http://localhost:3000/payment/result')
                                                            })

                                        })
                                        .catch(err => {
                                            console.error(err)
                                            return res.status(500).json({
                                                title: 'Payment Error',
                                                message:'Payment can not be registered.'
                                            })
                                        })
                            }
                        })

                    }

                });
        }
    });
}

exports.cancel_payment = (req, res, next) => {
    res.status(200).json({
        message: 'payment Cancelled'
    });
}


exports.payment_get_result = (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  console.log(decoded);
  console.log(req);
  console.log('decoded: ' + decoded.user.email);
  console.log('user id:' + decoded.user._id);

  User.findById(decoded.user._id, (err, user) => {
      if(err){
          return res.status(500).json({
              title: 'User does not existed',
              message : 'User does not existed at the database'
          });
      } else {

        console.log(user.paidToeflLists);

          return res.status(200).json( {
            payPalResult: user.paidToeflLists
          } )

      }
    })
}
