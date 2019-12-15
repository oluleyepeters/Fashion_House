var search = document.querySelector('#searchInput');
var searchBtn = document.querySelector('.category');

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

