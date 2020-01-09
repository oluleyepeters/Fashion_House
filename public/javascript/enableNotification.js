var enabledNotificationsButtons = document.querySelector('.enable');
var publicKey;

function askForNotificationPermission(){
//	asking for notification permission automatically grant access to push notification
	Notification.requestPermission(result => {
		console.log('User choice', result);
		if(result !== 'granted'){
			console.log('No notification Permission granted')
		}else{
//			displayConfirmNotification()
			configPushSub();
		}
	})
}

//from within service worker
function displayConfirmNotification(){
	if('serviceWorker' in navigator){
		var options = {
			body : 'You Successfully subscribed to our notification Package',
			icon:'/images/icons/icon-72x72.png',
			image: '/images/icons/icon-128x128.png',
			lang : 'en-US',
			vibrate: [100, 50, 200],
			badge: '/images/icons/152x152.png',
			tag : 'confirm-notification',
			renotify : true,
			actions: [
				{ action: 'confirm', title:'Okay',	icon:'/images/icons/icon-72x72.png'},
				{ action: 'cancel', title:'Cancel',	icon:'/images/icons/icon-72x72.png'}
//				{ action: 'confirm', title:'Okay',	icon:'/images/icons/icon-72x72.png'},				
			]
		};
		navigator.serviceWorker.ready
		.then(function(swreg){
			swreg.showNotification('Successfully Subscribed', options)	
		})
	}
}


function configPushSub(){
	if(!('serviceWorker' in navigator)){
		return;
	}else{
		console.log('Hello')
		var reg;
		navigator.serviceWorker.ready
		.then(function(swreg){
//			reg = swreg
			console.log('Alaye');			
			console.log(swreg.pushManager.getSubscription());			
			return swreg.pushManager.getSubscription();
		})
		.then(function(sub){
			if(sub){
				return sub;
			}
//			create a new subscription
			var vapidPublicKey = 'BCzSkNNvQh2gpC_lgc3BFpanvbVBbCQTdrRX6WqZDZPE5n9KHCPSgtVCdiRtz909lYsyVsiyAWOvP6v7VT0vRkI';
			var convertedPublicKey = urlBase64ToUint8Array(vapidPublicKey);
			publicKey = convertedPublicKey
			return convertedPublicKey
		})
		.then(key => {
			navigator.serviceWorker.ready
			.then((swReg) => {
				console.log(swReg.pushManager);
				swReg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: publicKey
				})
				.then((newSub) => {
					console.log('Received Push Subscription', JSON.stringify(newSub));
					return fetch('https://herbeifashion.herokuapp.com/subscribe', {
						method:'POST',
						headers:{
							'Content-Type':'application/json',
							'Accept':'application/json'
						},
						body:JSON.stringify(newSub)
					})
				})
				.then(res =>{
					if(res.ok){
						displayConfirmNotification()
					}
				})	
			})
		})
		.catch(err => console.log)	
	}
}

//function displayConfirmNotification(){
//	var options = {
//		body : 'You Successfully subscribed to or notification Package'
//	};
//	new Notification('Successfully Subscribed', options);
//}
//

//Enable Notification
if('Notification' in window && 'serviceWorker' in navigator){
	navigator.serviceWorker.ready
	.then(swReg => {
		return swReg.pushManager.getSubscription()
	})
	.then(sub => {
		if(!sub){
			enabledNotificationsButtons.style.display = 'inline-block';
			enabledNotificationsButtons.addEventListener('click', askForNotificationPermission)
		}
	})
}