// Special syntax that allows importation of scripts
importScripts('/javascript/idb.js');
importScripts('/javascript/utility.js')

const pwaCache = 'pwa_Cache-2';
const dynamicCache = 'pwa_Dynamic_cache-2';
const staticFiles=[
				'/',
				'/offline',
				'/javascript/idb.js',
				'/javascript/jquery-3.3.1.min.js',
				'/javascript/app.js',
				'/javascript/addtocart.js',
				'/javascript/cart.js',
				'/javascript/loadClothes.js',
				'/css/add.css',
				'/css/cart.css',
				'/css/clothes.css',
				'/css/clothes_show.css',
				'/css/headers.css',
				'/css/orders.css',
				'/images/showcase.jpg',
				'/images/icons/icon-72x72.png',
				'/images/icons/icon-96x96.png',
				'/images/icons/icon-128x128.png',
				'/images/icons/icon-144x144.png',
				'/images/icons/icon-152x152.png',
				'/images/icons/icon-192x192.png',
				'/images/icons/icon-384x384.png',
				'/images/icons/icon-512x512.png'				
			]

function trimCache(cacheName, maxItems){
	cache.open(cacheName)
		.then(cache => {
			return cache.keys()
			.then(function(keys){
				if(keys.length > maxItems){
					cache.delete(keys[0])
					.then(trimCache(cacheName, maxItems))
				}
			})
		})
}

//Installing the service worker
self.addEventListener('install', (e) => {
	console.log('[Service Worker] installing service worker...', e)
	e.waitUntil(
		caches.open(pwaCache)
		.then((cache) => {
			console.log('[Service Worker] caching assets');			
			cache.addAll(staticFiles);
		})
	)
});


//Activating the service worker
self.addEventListener('activate', (e) => {
	console.log('[Service Worker] activating service worker...', e)
//	deleting the old cache
	let cacheCleaned= caches.keys()
		.then((keys) => {
		keys.forEach(key => {
			if(key !== pwaCache && key !== dynamicCache) return caches.delete(key);
		})
	})
	e.waitUntil(cacheCleaned);
	return self.clients.claim();
});

function IsInArray(string, Array){
	for(var i = 0; i < Array.length; i++){
		if(Array[i] === string){
			return true;
		}
	}
}

//Cache and Network
//Events emitted any time a page, item is fetched
 self.addEventListener('fetch', (e) => {
	var url = `https://herbeifashion.herokuapp.com/clothes/searchClothes`;
	var login = `https://herbeifashion.herokuapp.com/users/login`;
	var logout = `https://herbeifashion.herokuapp.com/users/logout`;
	var getUser = `https://herbeifashion.herokuapp.com/users/getUser`
	var homePage = `https://herbeifashion.herokuapp.com`
	var pwaCacheLength = pwaCache.length;
	console.log(pwaCacheLength)
	if(e.request.url.includes(url)){
 		console.log('Fetched.....' , e)
 		e.respondWith(
			fetch(e.request)
			.then(function(res){
//			trimCache(dynamicCache, 30)
				// Clone the response
				var clonedRes = res.clone();
//				clear the data
				clearAllData('clothes')
				.then(() => {
				return clonedRes.json()
				})
				.then(function(data){
					for(var key in data){
//						we should clear database before rewriting because if we dont clear it and we delete data dynamically, it will not reflect on our front end application
						writeData('clothes',data[key]);
					}
				})
				return res;
			})
		);
	}else if((e.request.url.includes(getUser))){
		e.waitUntil(
			caches.open(dynamicCache)
				.then(function (cache) {
					cache.delete(e.request)
					return cache
      			})   
		)
	}else if((e.request.url.indexOf(login) > -1) || (e.request.url.indexOf(logout) > -1) || (e.request.url.includes(getUser))){
		e.waitUntil(
			caches.keys()
			.then((keys) => {
				keys.forEach(key => {
					return caches.delete(key);
				})
			})
			.then( () => {
				caches.open(pwaCache)
				.then(function (cache) {
        			console.log('[Service Worker] Precaching App Shell');
//					cache.addAll(staticFiles);
					return cache
      			})
			})    
		)
	}else if((e.request.url.indexOf(homePage) > -1) && pwaCacheLength === 0){
		caches.open(pwaCache)
		.then( cache => {
			cache.addAll(staticFiles)
		})
	}else if(IsInArray( e.request.url, staticFiles)) {
			e.respondWith(
				caches.match(e.request)
		);		
	}else{
		//Events emitted any time a page, item is fetched
		e.respondWith(
//		Checks if the request is an existing key in the cache 
			caches.match(e.request)
				.then((response) => {
					if(response){
//						if it is return the response
						return response;
					}else{
//						if it does not contain it it sends the new request
						return fetch(e.request)
						.then((res) => {
//						storing responses dynamically
							return caches.open(dynamicCache)
							.then((cache) => {
//							we are to store a clone because the response will be consumed
								cache.put(e.request.url, res.clone() );
								return res;
							})
						})
						.catch(err => {
							return caches.open(pwaCache)
							.then((cache) => {
//							returning file based on file requested for
//								if(e.request.headers.get('accept').includes(`text/html`)){
									return cache.match('/offline')
//								}
							})
						})
					}		
				})
		);
	}
})

//Notification Clicks
self.addEventListener('notification',function(e){
	var notification = e.notification;
	var action = e.action;
	
	console.log(notification);
	if(action === 'confirm'){
		console.log('Confirm was chosen');
		notification.close();
	}else{
		console.log(action);
		e.waitUntil(
			clients.matchAll()
				.then(function(clis){
					var client = clis.find(function(c){
						return c.visibiltyState === 'visible'
					})
					if(client !== undefined){
						client.navigate(notification.data.url);
						client.focus();
					}else{
						clients.openWindow('http://location:8080')
					}
					notification.close();	
				})
		)
	}
})

self.addEventListener('notificationclose', function(e) {
	console.log('notification was closed', e)
});

//Responding to push
self.addEventListener('push', (e) => {
	console.log('Push Notification Received', e)
//	check if our event contains data
	var data = {title: 'New', content:'A new Cloth was Added', openUrl:'/'}
	if(e.data){
		data = JSON.parse(e.data.text()); 
	}
	
//	Showing Notification
	var options = {
		body: data.content,
		icon: '/images/icons/icon-96x96.png',
		badge: '/images/icons/icon-72x72.png',
		data: {
			url: data.openUrl
		}
	}
	
	e.waitUntil(
		self.registration.showNotification(data.title, options)
	)
});