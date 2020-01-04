var deferredPrompt;

//  Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if ('serviceWorker' in navigator) {
	
  // Register the SW
  	// navigator.serviceWorker.register('/sw.js', {scope:'/'})
  	navigator.serviceWorker
  	.register('/sw.js')
	.then((registration) => {
		console.log('Service Worker Registered')
  	}).catch(err => console.log)
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
	console.log('clicked')
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
	}else{
		console.log('beforeinstallprompt is not yet added')
	}
}

