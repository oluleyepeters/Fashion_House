var search = document.querySelector('#searchInput');
var searchBtn = document.querySelector('.category');
var conditionBtn = document.querySelectorAll('.price');
var conditionChecked = document.querySelectorAll("input[type='checkbox']");
var clothes = [];
var state = [];
var newCloth = [];

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
    if(pages === 1){
		document.querySelector('#button-container').innerHTML = '';	    	
    }else if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
		console.log(button)
		document.querySelector('#button-container').innerHTML = button;			
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
			<div class="category" style="visibility:hidden">Button</div>
            ${createButton(page, 'next')}
        `;
		console.log(button)
		document.querySelector('#button-container').innerHTML = button;			
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
		console.log(button)
		document.querySelector('#button-container').innerHTML = button;			
    }
};

const renderClothes = (clothes, page = 1, resPerPage = 10) => {
	document.querySelector('#button-container').innerHTML = '';											
	document.querySelector('#clothes-container').innerHTML = '';	
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
			data.forEach(data => {
				clothes.push(data)
			})
			// console.log(clothes)			
			renderClothes(data);
			// state.clothes = data;
			return data;
		}) 
		.then(data => {
		data.forEach(data => {
			state.push(data)
		})
		var self;
			document.querySelector('body').addEventListener('click', e => {
				self = data;
				console.log('clicked')
    			if (e.target.matches('.category, .btn-inline')) {
					console.log('clicked2')
        			const goToPage = parseInt(e.target.dataset.goto, 10);
        			renderClothes(self, goToPage);
    			}
			})
			return state;
		})
		.then(state => {
			document.querySelectorAll('.condition').forEach(condition => {
				condition.addEventListener('change', (e) => {
						conditionChecked.forEach(condition =>{
							if(e.target.checked){
								if(parseInt(e.target.value) === 10){
									state.forEach(cloth => {
										if(cloth.price <= 10){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}
										}
									})
								}
								else if(parseInt(e.target.value) === 20){
									state.forEach(cloth => {
										if((cloth.price > 10) && (cloth.price <= 30)){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}
								else if(e.target.value === 'Peter'){
									state.forEach(cloth => {
										if(cloth.name === 'peter'){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}
								else if(e.target.value === 'Others'){
									state.forEach(cloth => {
										if(cloth.name !== 'Peter'){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}								
							}else{
								if(!(e.target.checked)){
							 		if(parseInt(e.target.value) === 10){
							 			state.forEach(cloth => {
							 				if(cloth.price <= 10){
							 					if((newCloth.includes(cloth))){
							 						newCloth.splice(newCloth.indexOf(cloth), 1)
							 						// console.log(clothes)
							 					}
							 				}
							 			})
							 		}else if(parseInt(e.target.value) === 20){
							 			state.forEach(cloth => {
							 				if((cloth.price > 10) && (cloth.price <= 30)){
							 					if((newCloth.includes(cloth))){
							 						newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
								 			}
								 		})
								 	}else if(parseInt(e.target.value) === 'Peter'){
									 	state.forEach(cloth => {
									 		if((cloth.name === 'peter')){
									 			if((newCloth.includes(cloth))){
								 				newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
									 		}
									 	})
									}else if(parseInt(e.target.value) === 'Others'){
									 	state.forEach(cloth => {
									 		if((cloth.name !== 'peter')){
									 			if((newCloth.includes(cloth))){
									 				newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
									 		}
									 	})
									}									
								// }else if((!(e.target.checked)) && newCloth.length === 0){
								// 	console.log(clothes)
								// 	// break
								// 	// renderClothes(clothes)
								}
							}										
						})
						if(newCloth.length > 0){
							renderClothes(newCloth)
							document.querySelector('body').addEventListener('click', e => {
								console.log('clicked')
    							if (e.target.matches('.category, .btn-inline')) {
									console.log('clicked2')
        							const goToPage = parseInt(e.target.dataset.goto, 10);
        							console.log(goToPage)
	       							renderClothes(newCloth, goToPage);
    							}
							})																				
						}else{
							renderClothes(clothes)
							document.querySelector('body').addEventListener('click', e => {
								console.log('clicked')
    							if (e.target.matches('.category, .btn-inline')) {
									console.log('clicked2')
        							const goToPage = parseInt(e.target.dataset.goto, 10);
        							console.log(goToPage)
	       							renderClothes(clothes, goToPage);
    							}
							})																											
						}
					})
				})

		})
		.catch(err => console.log)
})

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
			renderClothes(data);
			// state.clothes = data;
			return data
		})
		.then(data => {
			// var self = data;
		data.forEach(data => {
			state.push(data)
		})
			// state = data;
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