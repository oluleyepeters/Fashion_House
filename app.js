const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const flash = require('connect-flash');
//const multer = require('multer');
const session = require('express-session');
const webpush = require('web-push')

const app = express();

//Passport Config
require('./config/passport');

const keys = require('./config/keys');

//setting up web push
const publicVapid = keys.public_vapid_Key;
const privateVapid = keys.private_vapid_key;
webpush.setVapidDetails(
	'mailto: oluleyepeters@gmail.com',
	publicVapid,
	privateVapid
)

mongoose.promise = global.Promise;

mongoose.connect(keys.mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log)

const db = require('./model')

//ejs middleware
app.set('view engine', 'ejs')

//bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//static folder
app.use(express.static(__dirname+'/public/'))

//method override
app.use(methodOverride('_method'));

//express session middleware
app.use(session({
	secret:'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//Global Variables
app.use(function(req,res,next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
})

const users = require('./routes/users');
const clothes = require('./routes/clothes');
const orders = require('./routes/orders');
//const admin = require('./routes/admin');

app.get('/', (req, res)=>{
	res.render('index')
});

app.get('/offline', (req, res)=>{
	res.render('offline')
});

app.post('/subscribe', (req,res) => {
	new db.Subscriptions(req.body)
	.save()
	.then(sub => console.log)
	.catch(err => console.log(err))
})

app.get('/subscribe', (req,res) => {
	db.Subscriptions.find()
	.then(sub => res.json(sub))
	.catch(err => console.log(err))
})

app.use('/users', users);
app.use('/clothes', clothes);
app.use('/orders', orders);
//app.use('/admin', admin);

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})