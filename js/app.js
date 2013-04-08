(function () {

	'use strict';

	var Library = can.Model({
		findAll: 	"GET /libraries",
		create: 	'POST /libraries',
		update: 	'PUT /libraries/{id}',
		destroy: 	'DELETE /libraries/{id}'
	}, {});

	var Control = can.Control({

		init: function (ele, options) {
			var self = this;

			// create an empty list to be populated later
			this.libraries = new Library.List([]);

			// compile the template
			var template = can.view("#template", {libraries: this.libraries});
			
			// append the view to the DOM
			can.$(ele).append(template);

			// load the libraries from the server
			var pro = Library.findAll({}, function(libraries) {
				self.libraries.push.apply(self.libraries, libraries);
			});

		},

		'.btn_save click': function (ele, ev) {
			var self = this;
			// get the currently selected model
			var model = this.state.attr('selected');
			// store if it is new
			var isNew = model.isNew();
			// save it
			model.save(function (library) {
				if (isNew) {
					// if new then append it to the list
					self.libraries.push(library);
				}

			});

			return false;
		},


		'.btn_remove click': function (ele, ev) {
			// get the model from the clicked element and destroy it
			var library = can.data(ele, 'library');
			library.destroy();
			
			return false;
		}

	});

	var control = new Control('#main');


}());