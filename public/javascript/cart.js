const main = document.querySelector('main');
const footer = document.querySelector('footer');
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cart-btn');
const closeModal = document.querySelector('.close');
const value = 20000;

cartBtn.addEventListener('click', e => {
	main.classList.add('blur');
	footer.classList.add('blur');
	cart.style.opacity = 1;
//	cart.style.marginTop = 200;
//	cart.style.top = 0;
//	cart.style.left = 0;
//	cart.style.bottom = 0;
//	cart.style.right = 0;
});

closeModal.addEventListener('click', function(e) {
	setTimeout(function(){
//		cart.style.position = 'absolute'
//		cart.style.top = -20000;
//		cart.style.left = 0;
//		cart.style.opacity = 0
		cart.style.opacity = 0;
		main.classList.remove('blur')					
		footer.classList.remove('blur')
//		cart.style.bottom = 0;
//		cart.style.right = 0;	
	},800)
})