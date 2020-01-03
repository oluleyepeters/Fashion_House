const main = document.querySelector('main');
const footer = document.querySelector('#footer');
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cart-btn');
const userId = document.querySelector('.id').textContent;
const emptyCart = document.querySelector('.emptyCart');
const filledCart = document.querySelector('.filledCart')

const renderItems = (user) => {
//	filledCart.innerHTML = '';
//	emptyCart.innerHTML = ''
	let clothes = ``;
	user.cart.items.forEach((item ,index) => {
		clothes += `
	 			<article class="cart-card">
	 				<div class="cart-image">
	 					<img src=${item.front_view} class="p1" alt="info">
	 				</div>
	 				<div class="category-left cart-box">
	 					<p class="category">${item.category}</p>	
	 					<p class="category">${item.price}</p>		
	 				</div>				
	 			</article>
	 			<input type="text" class="hidden" name="items[${index}][name]" value= ${item.category} >
	 			<input type="text" class="hidden" name="items[${index}][price]" value=${item.price}>
	 			<input type="text" class="hidden" name="items[${index}][id]" value=${item.id}>
	 			<input type="text" class="hidden" name="items[${index}][front_view]" value=${ item.front_view }>
	 			<input type="text" class="hidden" name="items[${index}][side_view]" value=${ item.side_view }>
	 			<input type="text" class="hidden" name="items[${index}][back_view]" value=${ item.back_view}>
		`
	})

	var totalPrice = user.cart.items.reduce((currentTotal, item) => {
						currentTotal + item.price },0); 
	totalPrice = `#`+{totalPrice}

	var cartHeader = `
			<div class="cart-header">
	 			<h4 class="text-center">My Cart</h4>
	 			<div  class="close"><span>&times;</span></div>
	 		</div>`
	var proceedButton = `
			<div class="payment-proceed">
				<button type="submit" class="category">Place Order</button>	
				<p class="category">${totalPrice}</p>
			</div>`
	cartHeader += clothes
	cartHeader += proceedButton
	return cartHeader;
}

cartBtn.addEventListener('click', e => {
	console.log(userId)
	var url = `http://localhost:8080/users/getUser/${userId}`
	fetch(url)
	.then(res => {
		return res.json()
		console.log(res.json())
	})
	.then( user => {
		if(user.cart.length < 1){
			emptyCart.innerHTML = 
				`<div class="cart-header">
					<h3 class="text-center">My Cart</h3>
					<div class="close"><span>&times;</span></div>
				</div>`			
		}else{
			filledCart.innerHTML =  renderItems(user);
		}
		return user
	})
	.then( (user) => {
		main.classList.add('blur');
	 	footer.classList.add('blur');
	 	cart.style.opacity = 1;
		return user
	})
	.then (() => {
		document.querySelector('.close').addEventListener('click', function(e) {
			console.log('hello')
			setTimeout(function(){
				cart.style.opacity = 0;
				main.classList.remove('blur')					
				footer.classList.remove('blur')
			},800)
		})
	})
	.catch(()=> console.log)
});