// Creating the idb object store
var dbPromise = idb.open('clothes-store', 1, function(db){
	if(!db.objectStoreNames.contains('clothes')){
		db.createObjectStore('clothes', {keyPath: 'date'});
	}
});

//write data to the database
function writeData(st, data){
	return dbPromise
		.then(db => {
		// create transaction
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.put(data);
		// returning the transaction
		return tx.complete;
	});
}

//load data from the database
function readAllData(st){
	return dbPromise
		.then(db => {
		var tx = db.transaction(st, 'readonly');
		var store = tx.objectStore(st);
		return store.getAll();
	})
}

//Delete all data from the database
function clearAllData(st){
	return dbPromise
		.then(db => {
		var tx = tx.transaction(st, 'readwrite')
		var store = tx.objectStore(st);
		store.clear();
		return tx.complete;
	})
}

//Delete Single Item
function deleteItemFromData(st, date){
	dbPromise
	.then(function(db){
		var tx = db.transaction(st, 'readwrite');
		var store = tx.objectStore(st);
		store.delete(date)
	})
	.then(() => {
		console.log('Item Deleted')
	})
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}