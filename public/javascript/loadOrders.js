var search = document.querySelector('#searchInput');
var searchBtn = document.querySelector('.category');

const renderOrder = order => {
    const markup = `<div class="order">
						<p>
							${order.date.toDateString()}
						</p>
						<div class="category"><a href="/orders/allorder/${order._id}>View Order</a></div>
					</div>`;
			document.querySelector('#order-container').insertAdjacentHTML('beforeend',markup)	
};

const createButton = (page, type) => `
    <div class="category btn-inline" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <a>Page ${type === 'prev' ? page - 1 : page + 1}</a>
    </div>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
	console.log(pages)
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
		console.log(button)
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
			<div class="category" style="visibility:hidden">Button</div>
            ${createButton(page, 'next')}
        `;
		console.log(button)
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
		console.log(button)
    }
	document.querySelector('#button-container').innerHTML = button		
};

const renderOrders = (orders, page = 1, resPerPage = 20) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    orders.slice(start, end).forEach(renderOrder);
    // render pagination buttons
    renderButtons(page, orders.length, resPerPage);
};

$(document).ready(() => {
	fetch(`http://localhost:8080/orders/allOrders`)
		.then(res => {
			return res.json()
		})
		.then(data => {
			renderOrders(data)
			return data;
		})
		.then(data => {
		var self = data
		console.log(self)
			document.querySelector('body').addEventListener('click', e => {
				console.log('clicked')
    			if (e.target.matches('.category, .btn-inline')) {
					console.log('clicked2')
        			const goToPage = parseInt(e.target.dataset.goto, 10);
        			document.querySelector('#button-container').innerHTML = '';					
        			document.querySelector('#order-container').innerHTML = '';
        			renderClothes(self, goToPage);
    			}
			})
		})	
		.catch(err => console.log)
})

searchBtn.addEventListener('click', function(e){	
	var url = `http://localhost:8080/orders/findOrder/${search.value}`;	
	document.querySelector('#order-container').innerHTML= ''		
	fetch(url)
		.then(res => {
			return res.json()
		}) 
		.then(data => {
			renderClothes(data)
			return data
		})
		.then(data => {
			var self = data;
			document.querySelector('body').addEventListener('click', e => {
				console.log('clicked')
    			if (e.target.matches('.category, .btn-inline')) {
        			const goToPage = parseInt(e.target.dataset.goto, 10);
        			document.querySelector('#button-container').innerHTML = '';					
        			document.querySelector('#order-container').innerHTML = '';
        			renderClothes(self, goToPage);
    			}
			})
		}).catch(err => console.log)		
	e.preventDefault();	
});