const newCartItem = {
	name : document.querySelector('#name').textContent,
	price: document.querySelector('#price').textContent,
	id : document.querySelector('#name').dataset.id,
	front_view : document.querySelector('#front').src,
	side_view : document.querySelector('#side').src,
	back_view : document.querySelector('#back').src
}

const userid = document.querySelector('#category').dataset.user;
 
const getResult = function(e){
	fetch(`http://localhost:8080/users/${userid}/addtoCart`, {
     method: 'POST',
     headers : {
     'Content-type' : 'application/json' 
     },
     body: JSON.stringify(newCartItem)
     })
     .then(res => res.json())
     .catch(err => console.log)
	e.preventDefault();
	}

document.querySelector('#sbm').addEventListener('click' , getResult);

//document.querySelector('#sbm').addEventListener('click' , e => {
//	console.log(newCartItem)
//});