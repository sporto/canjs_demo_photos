(function () {

	'use strict';

	var Item = can.Model({
		findAll: 	"GET /items",
		create: 	'POST /items',
		update: 	'PUT /items/{id}',
		destroy: 	'DELETE /items/{id}'
	}, {});

	var Control = can.Control({

		init: function (ele, options) {
			var self = this;

			// create an empty list to be populated later
			this.items = new Item.List([]);

			// compile the template
			var template = can.view("#template", {items: this.items});
			
			// append the view to the DOM
			can.$(ele).append(template);

			// load the libraries from the server
			var pro = Item.findAll({}, function(items) {
				self.items.replace(items);
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
			var item = can.data(ele, 'item');
			item.destroy();
			
			return false;
		}

	});

	var control = new Control('#main');


}());