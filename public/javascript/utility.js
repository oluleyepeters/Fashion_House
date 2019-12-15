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