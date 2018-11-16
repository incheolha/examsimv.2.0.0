var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// connecting mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://192.168.1.58:27017/examSimulator", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/examSimulator", { useNewUrlParser: true });

var userRoutes = require('./backend-connection/routes/users/user');
var registerRoutes = require('./backend-connection/routes/toefl/registerExam/registerExam');
var readingRoutes = require('./backend-connection/routes/toefl/readingExam/readingExam');
var showRoutes = require('./backend-connection/routes/toefl/showExam/showExam');
var shoppingcartRoutes = require('./backend-connection/routes/payment/shoppingcart');
var paypalpaymentRoutes = require('./backend-connection/routes/payment/paypal/paypal');
var stripepaymentRoutes = require('./backend-connection/routes/payment/stripe/stripe-route');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

//toefl uploads image and audio file
app.use('/uploads',
        express.static('backend-connection/routes/toefl/registerExam/uploads'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//angular 5.0 CLI와 통합하여 모든 URL(/)을 angular로 연결하기위한 express.static setting
console.log("this is a check point");

app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.use('/showExam', showRoutes);
app.use('/shoppingcart', shoppingcartRoutes);
app.use('/paypal', paypalpaymentRoutes);
app.use('/stripepayment', stripepaymentRoutes);
app.use('/reading', readingRoutes);
app.use('/registerExam', registerRoutes);
app.use('/user', userRoutes);


// all error are automatically send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

module.exports = app;
