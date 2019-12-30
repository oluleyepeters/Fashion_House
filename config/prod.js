module.exports={
	mongoURI:process.env.MONGO_URI,
	domain: process.env.REDIRECT_DOMAIN,
	public_vapid_Key: process.env.Vapid_Public,
	private_vapid_Key: process.env.Vapid_Private,	
};

//mongo ds257668.mlab.com:57668/fashion_house -u <dbuser> -p <dbpassword>