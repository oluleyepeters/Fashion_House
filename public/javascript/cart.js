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
	 					<p class="category">${item.name}</p>	
	 					<p class="category">#${item.price}</p>		
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

	let totalPrice = user.cart.items.reduce((currentTotal, item) => {
						return currentTotal + parseInt(item.price) },0); 
	totalPrice = `#`+ totalPrice
	console.log(totalPrice)

	var cartHeader = `
			<div class="cart-header">
	 			<h4 class="text-center">My Cart</h4>
	 			<div  class="close"><span>&times;</span></div>
	 		</div>`
	var proceedButton =  user.cart.items.length >= 1 ? `
			<div class="payment-proceed">
				<button type="submit" class="category">Order</button>	
				<p class="category">${totalPrice}</p>
			</div>` : 
			`<div class="payment-proceed">
				<p class="center">You Have no item in Your Cart</p>
			</div>` 
	cartHeader += clothes
	cartHeader += proceedButton
	return cartHeader;
}

cartBtn.addEventListener('click', e => {
	console.log(userId)
	var url = `https://herbeifashion.herokuapp.com/users/getUser/${userId}`
	fetch(url)
	.then(res => {
		return res.json()
	})
	.then( user => {
		console.log(user.cart.items.length)
		if(user.cart.length === 0){
			emptyCart.innerHTML = 
				`<div class="cart-header">
					<h3 class="text-center">My Cart</h3>
					<div class="close"><span>&times;</span></div>
				</div>
				<p class="center">Your cart is empty</p>`

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