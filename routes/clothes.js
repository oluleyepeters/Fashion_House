const express= require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
//const bcrypt = require('bcryptjs');
const router = express.Router();
const webpush = require('web-push')

//Load Model
var db = require('../model')

//Load Middlewares
const middleware = require('../middleware');

const storage = multer.diskStorage({
	destination: './public/uploads',
	filename:function(req,file,cb){
		cb(null, file.fieldname + '-' + file.originalname)
	}
});

const upload=multer({
    storage:storage,
    limits:{fileSize:100000000},
    fileFilter:function(req,file,cb){
        checkFileType(file, cb)
    }
})

function checkFileType(file,cb){
//    allowed ext
    const filetypes=/jpeg|jpg|png|gif/;
//    test
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    
    const mimetype=filetypes.test(file.mimetype)
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Images Only')
    }
}

//All clothes Route
router.get('/', (req,res) => {
	db.Cloth.find({})
	.then(clothes => {
//		res.json(clothes)
		res.render('clothes/index',{
			clothes:clothes
		})		
		console.log(clothes.length)		
	})
});

router.get('/clothes', (req,res) => {
	db.Cloth.find({})
	.then(clothes => {
		res.json(clothes)
	})
});


router.get('/add', (req,res) => {
	res.render('clothes/add',{
	});
});

//Particular type of clothes
//router.get('/:type', (req,res) => {
//	db.Cloth.find({})
//	.then(clothes => {
//		res.json(clothes)
//	})
//})

//Individual Clothes
router.get('/:id/view', (req,res) => {
	db.Cloth.findById(req.params.id)
	.then(clothe => {
		console.log(typeof clothe._id)
		console.log(clothe._id)		
		res.render('clothes/show',{
			clothe:clothe
		})		
	})
});
	
router.post('/', upload.array('photos',3), (req,res,next) => {
	const photos = req.files;
	console.log(req.files);	
	let images = [];	
	photos.forEach((photo) => {
		images.push(photo)
	});	
	const newCloth = {
		name : req.body.name,
		price : req.body.price,
		category: req.body.category,
		front_view : `/uploads/${images[0].filename}`,
		back_view :	`/uploads/${images[1].filename}`,
		 side_view : `/uploads/${images[2].filename}`,
	}
	var id;
	new db.Cloth(newCloth)
	.save()
	.then(cloth => {
		console.log(cloth);
		id = cloth._id;
		return cloth;
	})
	.then(cloth => {
		db.Subscriptions.find({})
		.then(subscriptions => {
			if(subscriptions.length > 0){
				subscriptions.forEach(function(sub){
					var pushConfig = {
						endpoint : sub.endpoint,
						keys: {
							auth: sub.keys.auth,
							p256dh: sub.keys.p256dh
						}
					}
					console.log(pushConfig)
					webpush.sendNotification(pushConfig, JSON.stringify({
					title: 'New Cloth', 
					content:'New Cloth Added',
					openUrl: 'http://localhost:8080/clothes/id/view'
				}))
			})
			res.redirect('/clothes/add');							
			}else{
				res.redirect('/clothes/add');										
			}		
		})
		.catch((err) => console.log)					
	})
	.catch((err) => console.log)					
})

router.delete('/:id',  middleware.isloggedin , middleware.checkisAdmin ,(req,res) => {
	db.Cloth.remove({_id: req.params.id})
	.then(() => {
		res.redirect('/clothes')
	})
})

//Searching for clothes
//By name
router.get('/searchClothes/:name', (req,res) => {
	db.Cloth.find({'category': req.params.name})
	.then(clothes => {
		res.json(clothes)
	})
});

module.exports = router;