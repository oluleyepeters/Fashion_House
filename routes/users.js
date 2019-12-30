const express= require('express'),
	  mongoose = require('mongoose'),
	  passport = require('passport'),
	  bcrypt = require('bcryptjs'),
	  router = express.Router();

//Load User Model
var db = require('../model')
var middleware = require('../middleware')

//User Login Route
router.get('/login', (req,res) => {
	res.render('users/login')
});

//User Login Route
router.get('/register', (req,res) => {
	res.render('users/register')
});

router.post('/login',passport.authenticate('local',
    {
        successRedirect:'/clothes',
        failureRedirect:'/users/login',
        failureFlash:true
    })  ,function(req,res){
});

router.post('/register',(req,res) => {
	let errors = [];
	if(req.body.password != req.body.password2){
		errors.push({text: 'Password Not Correct'})
	}
	
	if(req.body.password > 4){
		errors.push({text: 'Passwords must be at least than 4'})
	}
	
	if(errors.length > 0){
		res.render('users/register',{
			errors: errors,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			password2: req.body.password2
		});
	} else {
		db.User.findOne({email:req.body.email})
			.then(user => {
				if(user){
					req.flash('error_msg', 'The email is already registerd');
					res.redirect('/users/register')
				}else{
					const newUser = new db.User({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					userName: req.body.userName,
					email: req.body.email,
					password: req.body.password
				})
					bcrypt.genSalt(10, (err, salt)=>{
					bcrypt.hash(newUser.password,salt,(err, hash)=>{
						if(err) throw err;
						newUser.password = hash;
						newUser.cart
						newUser.save()
						.then(user => {
							req.flash('success_msg', 'You are now registered and can now login');
							res.redirect('/users/login')
						})
						.catch(err => {
							req.flash('error_msg', 'You are now registered and can now login');
							res.redirect('/users/login')
						})
					})
				})
			}				
		})
	}
});

//Logout
router.get('/logout', (req,res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login')
})


router.post('/:id/addtoCart', middleware.isloggedin , (req,res) => {
	db.User.findById(req.params.id)
	.then(user => {
		console.log(user)
		const newCartItem = {
			name : req.body.name,
			price: req.body.price,
			id : req.body.id,
			front_view : req.body.front_view,
			side_view : req.body.side_view,
			back_view : req.body.back_view
		}
		console.log(req.body.id)
		console.log(req.body.id)
		console.log(typeof user._id)
		console.log(typeof req.params.id)
		console.log(typeof req.body.id)		
		user.cart.items.unshift(newCartItem)
		user.save()
		.then(user => {
			console.log('Item Added')
		})
	})
	.catch(console.log)
})

//Carts
router.post('/:id/order',(req,res) => {
	var items = req.body;
	db.User.findById(req.params.id)
	.then(user => {
			if(user){
				db.Orders.create({
					user:req.user.id
				})
				.then(order => {
					order.cart = items;
//					order.user =req.user.id
					order.save()
					.then(order => {
						user.cart.items = [];
						user.save();
						res.redirect(`/`)
					})
				})
			}
		})
	.catch(console.log)
});

router.get('/myOrders', middleware.isloggedin ,(req,res) => {
	db.Orders.find({ user : req.user.id})
	.then(orders => {
		res.render('orders/index', {
			orders : orders
		})
	})	
});

router.get('/myOrders/:id', middleware.isloggedin ,(req,res) => {
	db.Orders.findById(req.params.id)
	.then(order => {
		res.render('orders/order', {
			order : order
		})
	})
	.catch(console.log)
})



module.exports = router;