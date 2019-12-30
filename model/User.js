const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type: String,
		required: true
	},
	userName:{
		type: String,
		required: true
	},	
	email:{
		type: String,
		required: true
	},
	type:{
		type: String,
		required : true,
		default : 'Admin'
	},
	password:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	},
	cart:{ 
		items : [{
				id :{type:String},
				name:{type : String},
				price:{type : String},
				front_view:{type : String},
				side_view:{type : String},
				back_view:{type : String}		
			}],
		totalPrice : {
			type: Number
		}
	}
});

var users = mongoose.model('Users', UserSchema);
module.exports =  users;