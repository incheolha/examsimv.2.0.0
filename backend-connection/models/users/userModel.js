
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email: { type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},

    password: { type: String, required: true},
    name: {type: String, required: true},
    permissionTag: {type: String},
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now},
    toeflId: [{ type: mongoose.Schema.ObjectId, ref: 'Toefl'}],              //토플시험출제연결 ID
    paymentId: [{type: mongoose.Schema.ObjectId, ref:'Payment'}],            //payment 정보 연결 ID
    paidToeflLists: [{
                        examNo: { type: Number },
                        examLevel: {type: String },
                        examPrice: {type: Number},
                        paidDate: {type: Date, index: {unique: false}, 'default': Date.now}
                    }],
    shoppingCartLists : [{
                        examNo : { type: Number },
                        examLevel : {type: String },
                        examPrice : {type: Number},
                        cartListDate: {type: Date, index: {unique: false}, 'default': Date.now}
                        }],
    wishLists : [{
                        examNo : { type: Number },
                        examLevel : {type: String },
                        examPrice : {type: Number},
                        wishListDate: {type: Date, index: {unique: false}, 'default': Date.now}
                }],
    provider: {type: String, 'default':''},
    authToken: {type: String, 'default':''},
    facebook: {},
    google: {},
});

module.exports = mongoose.model('User', userSchema);
