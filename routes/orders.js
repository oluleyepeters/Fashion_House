const express = require('express');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../model');
const middleware = require('../middleware')

//router.get('/',(req,res) => {
//	db.Orders.find({})
//	.then(orders => {
//		res.render('admin/index', {
//			orders : orders
//		})
//	}).catch(console.log)
//})

//router.get('/', (req,res) => {
//	db.Cloth.find({})
//	.then(clothes => {
//		res.render('clothes/index',{
//			clothes:clothes
//		})		
//	})
//});

router.get('/allOrders',middleware.isloggedin , middleware.checkisAdmin , (req,res) => {
	db.Orders.find({})
	.then(orders => {
		res.render('admin/index', {
			orders : orders
		})	
	})
});

router.get('/allOrders/:id', middleware.isloggedin , middleware.checkisAdmin ,(req,res) => {
	db.Orders.findById(req.params.id)
	.then(order => {
		res.render('admin/order', {
			order : order
		})
	})
	.catch(console.log)
})

//router.get('/findOrder/:id',(req,res) => {
//	db.Orders.find({'id':req.params.id})
//	.then(order => {
//		res.json(order)
//	})
//	.catch(console.log)
//})

module.exports = router; 