if(process.env.NODE_ENV === 'production') {
    module.exports = require('./paypal_prod_key')
} else {
    module.exports = require('./paypal_dev_key')
}
