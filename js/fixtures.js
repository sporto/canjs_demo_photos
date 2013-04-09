(function () {
		// mock the server responses
	can.fixture("GET /items", "fixtures/items.json");
	// create 
	can.fixture('POST /items', function(original, respondWith, settings){
		original.id = _.random(10, 5000) ;
		respondWith(original);
	});
	// update
	can.fixture('PUT /items/{id}', function(original, respondWith, settings){
		respondWith(original);
	});
	// destroy
	can.fixture('DELETE /items/{id}', function(){
		return 200;
	});

}());