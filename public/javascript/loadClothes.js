var search = document.querySelector('#searchInput');
var searchBtn = document.querySelector('.category');

const renderClothe = cloth => {
    const markup = `<article class="card">
								<img src="${cloth.back_view}" class="p1" alt="info"/>
									<div class="category-box">
										<div class="category-left">
											<div class="category"><a href="">${cloth.name}</a></div>	
										</div>
									<div class="category-left">
										<div class="category"><a href="">Category</a></div>				
									</div>
								<div class="category"><a href="/clothes/${cloth._id}/view">View</a></div>
							</div>
						</article>`;
	document.querySelector('#clothes-container').insertAdjacentHTML('beforeend',markup)	
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
	document.querySelector('#button-container').innerHTML = button;	
};

const renderClothes = (clothes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    clothes.slice(start, end).forEach(renderClothe);
    // render pagination buttons
    renderButtons(page, clothes.length, resPerPage);
};


$(document).ready(() => {
	fetch(`http://localhost:8080/clothes/clothes`)
		.then(res => {
			return res.json()
		})
		.then(data => {
			renderClothes(data)
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
        			document.querySelector('#clothes-container').innerHTML = '';
        			renderClothes(self, goToPage);
    			}
			})
		})	
		.catch(err => console.log)
})


//document.querySelector('body').addEventListener('click', e => {
////    const btn = e.target.matches('.category, .btn-inline');
//    if (e.target.matches('.category, .btn-inline')) {
//        const goToPage = parseInt(e.target.dataset.goto, 10);
//        document.querySelector('#clothes-container').innerHTML = '';
//        renderClothes(data, goToPage);
//    }
//});

searchBtn.addEventListener('click', function(e){	
	var url = `http://localhost:8080/clothes/searchClothes/${search.value}`;	
	var networkDataReceived = false;
	document.querySelector('#clothes-container').innerHTML= ''		
	fetch(url)
		.then(res => {
			return res.json()
		}) 
		.then(data => {
			networkDataReceived = true;
			console.log('From web', data)
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
        			document.querySelector('#clothes-container').innerHTML = '';
        			renderClothes(self, goToPage);
    			}
			})
		}).catch(err => console.log)	
	
	
//	cache then network strategy
	if('indexedDB' in window){
		readAllData('clothes')
			.then(function(data){
				if(!networkDataReceived){
					console.log('From Cache', data);
					let allMovies = '';
					data.forEach((cloth) => {
					allMovies += `<article class="card">
								<img src="${cloth.back_view}" class="p1" alt="info"/>
									<div class="category-box">
										<div class="category-left">
											<div class="category"><a href="">${cloth.name}</a></div>	
										</div>
									<div class="category-left">
										<div class="category"><a href="">Category</a></div>				
									</div>
								<div class="category"><a href="/clothes/${cloth._id}/view">View</a></div>
							</div>
						</article>`
					})
				document.querySelector('#clothes-container').innerHTML = allMovies;	
				}
			})
	}
	e.preventDefault();	
});