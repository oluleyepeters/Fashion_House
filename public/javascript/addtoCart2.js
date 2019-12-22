const getResult = function(e){
	console.log('clicked')
//	setTimeout(() => {
		document.getElementById('login_first').textContent = 'You have to be logged in to add Item to cart'
//	}, 100)
	e.preventDefault();
}

document.querySelector('#sbm').addEventListener('click' , getResult);