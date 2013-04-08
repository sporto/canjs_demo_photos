(function () {
		// mock the server responses
	can.fixture("GET /libraries", "fixtures/libraries.json");
	// create 
	can.fixture('POST /libraries', function(original, respondWith, settings){
		original.id = _.random(10, 5000) ;
		respondWith(original);
	});
	// update
	can.fixture('PUT /libraries/{id}', function(original, respondWith, settings){
		respondWith(original);
	});
	// destroy
	can.fixture('DELETE /libraries/{id}', function(){
		return 200;
	});

}());