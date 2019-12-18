const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SubscriptionSchema = new Schema({
		endpoint:{type: String},
		keys:Schema.Types.Mixed,
		date:{
			type: Date,
			default: Date.now
		}
});

var subscriptions = mongoose.model('Subscriptions', SubscriptionSchema);

module.exports = subscriptions;