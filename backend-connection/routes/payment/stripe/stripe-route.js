const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const StripePaymentController = require('../../../controllers/payment/stripe/stripe');

router.post('/', StripePaymentController.stripe_payment);
module.exports = router;