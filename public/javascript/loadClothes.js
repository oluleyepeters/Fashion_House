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
								<div class="category "><a href="/clothes/${cloth._id}/view">View</a></div>
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

const conditioning = (state) => {
			document.querySelectorAll('.condition').forEach(condition => {
				condition.addEventListener('change', (e) => {
						conditionChecked.forEach(condition =>{
							if(e.target.checked){
								if(parseInt(e.target.value) === 1500){
									state.forEach(cloth => {
										if(cloth.price <= 1500){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}
										}
									})
								}
								else if(parseInt(e.target.value) === 2500){
									state.forEach(cloth => {
										if((cloth.price) <= 2500 ){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								} 
								else if(parseInt(e.target.value) === 2501){
									state.forEach(cloth => {
										if((cloth.price) > 2500 ){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								} 								
								else if(e.target.value === 'Pants'){
									state.forEach(cloth => {
										if(cloth.category === 'Pants'){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}
								else if(e.target.value === 'Skirts'){
									state.forEach(cloth => {
										if(cloth.category === 'Skirts'){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}								
								else if(e.target.value === 'Blazzers'){
									state.forEach(cloth => {
										if(cloth.category === 'Blazzers'){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}								
								else if(e.target.value === 'Gowns'){
									state.forEach(cloth => {
										if(cloth.category === 'Gowns'){
											if(!(newCloth.includes(cloth))){
												newCloth.push(cloth)
											}									
										} 
									})
								}																					
							}else{
								if(!(e.target.checked)){
							 		if(parseInt(e.target.value) === 1500){
							 			state.forEach(cloth => {
							 				if(cloth.price <= 1500){
							 					if((newCloth.includes(cloth))){
							 						newCloth.splice(newCloth.indexOf(cloth), 1)
							 						// console.log(clothes)
							 					}
							 				}
							 			})
							 		}else if(parseInt(e.target.value) === 2500){
							 			state.forEach(cloth => {
							 				if((cloth.price <= 2500)){
							 					if((newCloth.includes(cloth))){
							 						newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
								 			}
								 		})
								 	}else if(parseInt(e.target.value) === 2501){
							 			state.forEach(cloth => {
							 				if((cloth.price > 2501)){
							 					if((newCloth.includes(cloth))){
							 						newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
								 			}
								 		})
								 	}else if(parseInt(e.target.value) === 'Pants'){
									 	state.forEach(cloth => {
									 		if((cloth.category === 'Pants')){
									 			if((newCloth.includes(cloth))){
								 				newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
									 		}
									 	})
									}else if(parseInt(e.target.value) === 'Blazzers'){
									 	state.forEach(cloth => {
									 		if((cloth.category !== 'Blazzers')){
									 			if((newCloth.includes(cloth))){
									 				newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
									 		}
									 	})
									}else if(parseInt(e.target.value) === 'Gowns'){
									 	state.forEach(cloth => {
									 		if((cloth.category !== 'Gowns')){
									 			if((newCloth.includes(cloth))){
									 				newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
									 		}
									 	})
									}else if(parseInt(e.target.value) === 'Skirts'){
									 	state.forEach(cloth => {
									 		if((cloth.category !== 'Skirts')){
									 			if((newCloth.includes(cloth))){
									 				newCloth.splice(newCloth.indexOf(cloth), 1)
								 				}									
									 		}
									 	})
									}									
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
		}

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
    			if (e.target.classList.contains('btn-inline')) {
        			const goToPage = parseInt(e.target.dataset.goto, 10);
        			renderClothes(data, goToPage);
    			}
			})
			return state;
		})
		.then(state => {
			conditioning(state);
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
			state=[];
			// var self = data;
			data.forEach(data => {
				state.push(data)
			})
			// state = data;
			document.querySelector('body').addEventListener('click', e => {
				console.log('clicked')
    			if (e.target.classList.contains('btn-inline')) {
        			const goToPage = parseInt(e.target.dataset.goto, 10);
        			renderClothes(self, goToPage);
    			}
			})
			return state;
		})
		.then( state  => {
			conditioning(state);
		})
		.catch(err => console.log)	
	
	
//	cache then network strategy
	if('indexedDB' in window){
		readAllData('clothes')
		.then(data => {
			networkDataReceived = true;
			console.log('From web', data)
			renderClothes(data);
			// state.clothes = data;
			return data
		})
		.then(data => {
			// var self = data;
			state = [];
			data.forEach(data => {
				state.push(data)
			})
			// state = data;
			document.querySelector('body').addEventListener('click', e => {
				console.log('clicked')
    			if (e.target.classList.contains('btn-inline')) {
        			const goToPage = parseInt(e.target.dataset.goto, 10);
        			renderClothes(self, goToPage);
    			}
			})
			return state;
		})
		.then( state  => {
			conditioning(state);
		})
		.catch(err => console.log)		
	}
	e.preventDefault();	
});