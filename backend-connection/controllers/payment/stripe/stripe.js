const keys = require('../paymentKeyContainers/stripekeyContainer/stripekeys');
const stripe = require('stripe')(keys.stripeSecretKey);

const jwt = require('jsonwebtoken');
const User = require('../../../models/users/userModel');

var Payment = require('../../../models/payment/paymentModel');

exports.stripe_payment = (req, res, next) => {

  console.log('stripe payment check in');

  console.log(req.body);

  //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.body.userToken);
    console.log("decoded: " + decoded.user.permissionTag);
    console.log("decoded: " + decoded.user.email);
    console.log("shoppingCart: " + req.body.shoppingCartLists);
    updatePaidToeflLists = req.body.shoppingCartLists;
    userId = decoded.user._id;
    User.findById(userId, (err, user) => {

        if (err) {
                    return res.status(500).json({
                            title: 'Auth Fail Error',
                            message: 'The User is not existed'
                            });
        } else {
            stripe.customers.create({
                                     email: req.body.cardHolderEmail,
                                     source: req.body.tokenId })
                            .then(customer => stripe.charges.create({
                                    amount: req.body.amount,
                                    description: 'Web Stripe Tester',
                                    currency: 'usd',
                                    customer: customer.id
                                }))
                            .then(charge => {
                                const convertAmount = (charge.amount / 100);
                                Payment.findOne({paymentID: charge.id})
                                            .exec()
                                            .then( paymentDoc => {
                                                    if(paymentDoc){
                                                        return res.status(409).json({
                                                            message: 'Payment is already exists'
                                                        });
                                                    } else {
                                                        const payment = new Payment({
                                                                        paymentID : charge.id,
                                                                        paymentAgency : 'stripe',
                                                                        paymentType : charge.object,
                                                                        paymentAmount : convertAmount,
                                                                        paymentDate : Date.now(),
                                                                        paymentBalanceTransactionID : charge.balance_transaction,
                                                                        paymentCurrency : charge.currency,
                                                                        paymentCustomerID : charge.customer,
                                                                        paymentDescription : charge.description,
                                                                        paymentPaid : charge.paid,
                                                                        paymentRefunded : charge.refunded,
                                                                        refund : {
                                                                            refundDataArray : charge.refunds.data,
                                                                            refundCount : charge.refunds.total_count,
                                                                            refundURL : charge.refunds.url
                                                                        },
                                                                        paymentResult : {
                                                                            paymentResultStatus : charge.outcome.network_status,
                                                                            paymentResultReason : charge.outcome.reason,
                                                                            paymentResultRiskLevel : charge.outcome.risk_level,
                                                                            paymentResultMessage : charge.outcome.seller_message,
                                                                            paymentResultSummary : charge.outcome.type
                                                                        },
                                                                        paymentDetails : {
                                                                            paymentDetailsID :charge.source.id,
                                                                            paymentDetailsPaymentType : charge.source.object,
                                                                            paymentDetailsPaymentBillingZIP : charge.source.address_zip,
                                                                            paymentDetailsPaymentBrand : charge.source.brand,
                                                                            paymentDetailsPaymentCountry : charge.source.country,
                                                                            paymentDetailsPaymentCustomerID : charge.source.customer,
                                                                            paymentDetailsPaymentCustomerEmail : req.body.cardHolderEmail
                                                                        },

                                                                        shippingDetails : {
                                                                            shippingPayer : {
                                                                                shippingPayerEmail : req.body.cardHolderEmail,
                                                                                shippingInfo : {
                                                                                    shippingRecipientName : req.body.cardHolderEmail,
                                                                                    shippingPostalCode : req.body.cardHolderZip
                                                                                }
                                                                            }
                                                                        },
                                                                        paymentStatus : charge.status,
                                                                        userId: userId
                                                                });

                                                    // console.log(payment);
                                                        payment
                                                            .save()
                                                            .then( result => {
                                                                    for ( updatePaidToeflItem of updatePaidToeflLists) {
                                                                        user.paidToeflLists.push(updatePaidToeflItem);
                                                                    }
                                                                    user.paymentId.push(result.toObject());
                                                                    user.shoppingCartLists = [];
                                                                    user.save()
                                                                            .then(result => {
                                                                                    return res.status(201).json({
                                                                                            message: 'paidToeflList are successfully updated',
                                                                                            paidToeflLists: result.paidToeflLists,
                                                                                            shoppingCartLists: result.shoppingCartLists
                                                                                            })
                                                                            })
                                                                            .catch(err =>{
                                                                                console.error(err)
                                                                                return res.status(500).json({
                                                                                    title: 'Payment Error',
                                                                                    message: 'Payment can not be registered'
                                                                                });
                                                                            });

                                                                })
                                                            .catch(err =>{
                                                                console.error(err)
                                                                return res.status(500).json({
                                                                    title: 'Payment Error',
                                                                    message: 'Payment can not be registered'
                                                                });
                                                            });
                                                    }
                                            })
                                            .catch(err =>{
                                                console.error(err)
                                                return res.status(500).json({
                                                    title: 'Payment Error',
                                                    message: 'Payment can not be registered'
                                                });
                                            });
                            });
        }
    });
}
