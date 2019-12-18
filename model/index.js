var mongoose=require('mongoose');
mongoose.set('debug',true);

mongoose.connect("mongodb://localhost/school_website");

mongoose.promise=global.Promise;

module.exports.User = require('./User.js');

module.exports.Cloth = require('./Cloth.js');

module.exports.Orders = require('./Orders.js');

module.exports.Subscriptions = require('./Subscription.js');