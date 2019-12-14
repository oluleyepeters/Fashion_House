const pwaCache = 'pwa_Cache-1';
const dynamicCache = 'pwa_Dynamic_cache-1';

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
			cache.addAll([
				'/',
				'/offline',
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
			])
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

//Events emitted any time a page, item is fetched
// self.addEventListener('fetch', (e) => {
// 	console.log('Fetched.....' , e)
// 	e.respondWith(
//		Checks if the request is an existing key in the cache 
//		caches.match(e.request)
//		.then((response) => {
//			if(response){
//				if it is return the response
//				return response;
//			}else{
//				if it does not contain it it sends the new request
//				return fetch(e.request)
//				.then((res) => {
//					storing responses dynamically
//					return caches.open(dynamicCache)
//					.then((cache) => {
//						we are to store a clone because the response will be consumed
//						cache.put(e.request.url, res.clone() );
//						return res;
//					})
//				}).catch(err => {
//					return caches.open(pwaCache)
//					.then((cache) => {
//						return cache.match('/offline')
//					})
//				})
//			}		
//		})
//	);
// })

//cache only
//self.addEventListener('fetch', (e) => {
//	e.respondWith(
//		caches.match(e.request)
//	)
//})

//network only
//self.addEventListener('fetch', (e) => {
//	e.respondWith(
//		fetch(e.request)
//	)
//})


//Network first then cache fallback
//Events emitted any time a page, item is fetched
// self.addEventListener('fetch', (e) => {
// 	console.log('Fetched.....' , e)
// 	e.respondWith(
//		check for the request online initially
//		fetch(e.request)
//		.then(function(res){
//			return caches.open(dynamicCache)
//				.then((cache) => {
//					cache.put(e.request.url, res.clone());
//					return res;
//			})
//		})
//		.catch(() => {
//			return caches.match(e.request)
//		})
//	);
//})

//Cache first then Network fallback
//Events emitted any time a page, item is fetched
//self.addEventListener('fetch', (e) => {
// 	console.log('Fetched.....' , e)
// 	e.respondWith(
////		Open Cache
//		caches.open(dynamicCache)
//		.then(function(cache){
//			return fetch(e.request)
//				.then((res) => {
//					cache.put(e.request, res.clone());
//					return res;
//			})
//		})
//	);
//})

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
	var url = `http://localhost:8080/clothes/clothes/${search.value}`;
	var staticAssets = [
				'/',
				'/offline',
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
	if(e.request.url.indexOf(url) > -1){
 		console.log('Fetched.....' , e)
 		e.respondWith(
			caches.open(dynamicCache)
			.then((cache) => {
				return fetch(e.request)
				.then(function(res){
//					trimCache(dynamicCache, 30)
					cache.put(e.request,res.clone());
					return res;
				})
			})
		);
	}else if(event.request.url, staticAssets) {
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
//					if it is return the response
					return response;
				}else{
//					if it does not contain it it sends the new request
				return fetch(e.request)
				.then((res) => {
//					storing responses dynamically
					return caches.open(dynamicCache)
					.then((cache) => {
//						we are to store a clone because the response will be consumed
						cache.put(e.request.url, res.clone() );
						return res;
					})
				}).catch(err => {
					return caches.open(pwaCache)
					.then((cache) => {
//						returning file based on file requested for
						if(event.request.headers.get.includes(`text/html`)){
							return cache.match('/offline')
						}
					})
				})
			}		
		})
	);
		
	}
})