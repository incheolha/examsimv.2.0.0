// Payment model 생성을 위한 모듈 import 
const mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({
    paymentID: {type: String, trim:true, 'default':''},               //Payment Id
    paymentAgency: {type: String, trim:true, 'default':''},            // pay agency name: stripe, paypal, etc
    paymentType :{type: String, trim:true, 'default':''},             //ex) charge, refund, etc
    paymentAmount :{type: Number},                                    //payment Amount
    paymentTransactionFee : {type: Number},                           //payment Agency transaction Fee
    paymentSubtotal : {type: Number},                                 //payment Amount subtract Payment Agency transaction Fee
    paymentDate : {type: Date, 'default': Date.now},                  //payment Date
    paymentBalanceTransactionID : {type:String, trim:true, 'default':''},    //paymentTranscationId
    paymentCurrency : {type:String, trim:true, 'default':''},         //paymentCurrency ex)USD, JPY,
    paymentCustomerID : {type:String, trim:true, 'default':''},       //paymentCustomerID
    paymentDescription : {type:String, trim:true, 'default':''},      //paymentDescription
    paymentPaid : {type:String, trim:true, 'default' :''},            //결제 여부  true or false
    paymentRefunded :{type:String, trim:true, 'default':''},          //환불 여부  true or false
    refundAmount : {type: Number},                                    //refund Amount
    refund :[{                                                        //refund Detail information
        refundDataArray : {type:Array},                               //refund data Array
        refundCount : {type: Number},                                 //refund countCheck
        refundURL : {type: String, trim : true}                       //refund URL address
    }],
    paymentResult : [{                                                              //은행으로부터 온 정보 
        paymentResultStatus : {type: String, trim: true, 'default': ''},            //은행으로부터 승인/미승인 여부
        paymentResultReason : {type: String, trim: true, 'default': ''},            //미승인시 미승인에 관한 이유
        paymentResultRiskLevel : {type: String, trim : true, 'default': ''},        //정보의 risk level 정보
        paymentResultMessage : {type:String, trim: true, 'default':''},             //판매자가 구매자에게 보내는 메세지.
        paymentResultSummary : {type:String, trim: true, 'default': ''}             //은행으로부터 온 결과 요약.
    }],
    paymentDetails : [{                                                             //PaymentDetails
        paymentDetailsID: { type: String, trim:true },                              //paymentDetailsID                   
        paymentDetailsPaymentType : {type: String, trim:true, 'default':''},        //paymentDetailType ex)card, check,
        paymentDetailsPaymentBillingZIP : {type: Number},                           //paymentBillingZipcode 
        paymentDetailsPaymentBrand : {type: String, trim:true, 'default': ''},      //paymentBrand ex) Visa, MasterCard..
        paymentDetailsPaymentCountry : {type: String, trim:true, 'default':''},     //paymentCountry ex)US, JPN, ....
        paymentDetailsPaymentCustomerID : {type: String, trim:true, 'default':''},  //paymentCustomerID
        paymentDetailsPaymentCustomerEmail :{type: String, trim: true, 'default':''}//paymentCustomerEmail
    }],
    shippingDetails : [{                                                           //shipping Details
       shippingStatus: {type: String, trim:true, 'default':''},                     //shipping Status   
       shippingPayer : [{                                                           //shipping specific infomation
            shippingPayerEmail: {type: String, trim:true, 'default':''},            //payer Email
            shippingPayerLastName: {type: String, trim:true, 'default':''},         //payer Last Name
            shippingPayerFirstName : {type: String, trim:true, 'default':''},       //payer First Name
            shippingPayerID : {type: String, trim:true, 'default':''},              //payer Id
            shippingInfo: [{                                                        
                shippingRecipientName : {type: String, trim:true, 'default':''},    //shipping RecipientName
                shippingAddressLine : {type: String, trim:true, 'default':''},      //shipping AddressLine
                shippingCity : {type: String, trim:true, 'default':''},             //shipping city
                shippingState: {type: String, trim:true, 'default':''},             //shipping state
                shippingPostalCode: {type: String, trim:true, 'default':''},        //shipping poastal
                shippingCountry: {type:String, trim:true, 'default':''}             //shipping Country
            }]
       }],       
    }],
    paymentStatus : {type: String, trim: true, 'default':''},                        //paymentStatus ex) 'succeeded'
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'}  
})

paymentSchema.post('remove', (payment) => {
    console.log(payment.userId);
    User.findById(payment.userId, (err, user) => {
        user.paymentId.pull(payment);
        user.save();
    });
});

module.exports = mongoose.model('Payment', paymentSchema)