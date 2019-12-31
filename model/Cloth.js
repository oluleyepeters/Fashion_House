const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ClotheSchema = new Schema({
	category:{
		type: String,
		required: true
	},		
	name:{
		type: String,
		required: true
	},
	front_view:{
			type: String
	},
	back_view:{
			type: String
	},
	side_view:{
			type: String
	},		
	price : {
		type: Number,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

var clothes = mongoose.model('Clothes', ClotheSchema);

module.exports =  clothes;