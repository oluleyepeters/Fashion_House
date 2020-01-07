const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
	user:{
		type: String,
//		required: true
	},	
	cart:{
		items : [{
			id :{type:String},
			name:{type : String},
			price:{type : String},
			front_view:{type : String},
			side_view:{type : String},
			back_view:{type : String}
		}]
	},
	delivered: {
		type: String,
		default : 'No'
	},
	date:{
		type: Date,
		default: Date.now
	}	
});

var orders = mongoose.model('Orders', OrderSchema);

module.exports =  orders;