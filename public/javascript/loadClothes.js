$(document).ready(() => {
	fetch(`http://localhost:8080/clothes/clothes`)
		.then(res => {
			return res.json()
		})
		.then(data => {
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
})

//Search for the cloth
document.querySelector('.search', searchCloth)

//I am to rewrite the code in order to save the fetch or requets data

var networkdataRecieved = false

var searchCloth = (e) =>{
	fetch(url)
		.then(function(res){
			return res.json
		})
		.then(function(data){
		networkdataRecieved = true
			console.log('From Web', data);
			return data
		})
		.then(() => {
			createClothContainer();
		})


	if('caches' in window){
		caches.match(url)
			.then(function(response){
				if(response){
				return response.json();
				}
			})
			.then(function(data){
				console.log(data);
				return data
			})
			.then((data) => {
				if(!networkdataRecieved){
					createClothContainer();	
				}
			})
		}
	e.preventDefault
}

//Note: I am to implement caching in the service worker 

var url= 'http://localhost:8080/clothes/clothes'

