var deferredPrompt;

//  Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {
	
  // Register the SW
  	navigator.serviceWorker.register('/sw.js', {scope:'/'})
	.then((registration) => {
		console.log('Service Worker Registered')
  	}).catch(console.log)
}

window.addEventListener('beforeinstallprompt', (e) => {
	console.log('BeforeInstalledPrompt Fired');
	e.preventDefault();
	deferredPrompt = e;
	return false;
})

var add= document.querySelector('.add')
console.log(add)

add.addEventListener('click', requestPermission);

function requestPermission(){
	if(deferredPrompt !== undefined){
		deferredPrompt.prompt();
		deferredPrompt.userChoice
		.then((choiceResult)=> {
			console.log(choiceResult.outcome);
			if(choiceResult.outcome === 'dismissed'){
				console.log('User cancelled installation')
			}else{
				console.log('User added to Homescreen')
			}
		})
		deferredPrompt = null;
	}
}
