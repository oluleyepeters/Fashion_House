self.addEventListener('install', (e) => {
	console.log('[Service Worker] installing service worker...', event)
});

self.addEventListener('activate', (e) => {
	console.log('[Service Worker] activating service worker...', event)
	return self.clients.claim();
});