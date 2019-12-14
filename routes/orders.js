const express = require('express');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../model');

router.get('/allorder',(req,res) => {
	db.Orders.find({})
	.then(orders => {
		res.render('admin/index', {
			orders : orders
		})
	})
	.catch(console.log)
})

router.get('/allorder/:id',(req,res) => {
	db.Orders.findById(req.params.id)
	.then(order => {
		res.render('orders/order', {
			order : order
		})
	})
	.catch(console.log)
})

module.exports = router; 