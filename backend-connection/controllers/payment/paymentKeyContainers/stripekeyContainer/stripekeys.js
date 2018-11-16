if(process.env.NODE_ENV === 'production') {
    module.exports = require('./stripe_prod_key')
} else {
    module.exports = require('./stripe_dev_key')
}