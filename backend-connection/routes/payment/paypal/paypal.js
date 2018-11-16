const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const PayPalController = require('../../../controllers/payment/paypal/paypal');

router.get('/executePayment', PayPalController.execute_payment);
router.get('/cancelPayment', PayPalController.cancel_payment);
router.get('/paymentResult', PayPalController.payment_get_result);
router.post('/createPayment', PayPalController.create_payment);

module.exports = router;
