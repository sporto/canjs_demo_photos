(function () {

	'use strict';

	var Item = can.Model({
		findAll: 	"GET /items",
		create: 	'POST /items',
		update: 	'PUT /items/{id}',
		destroy: 	'DELETE /items/{id}'
	}, {});
	
	var randoms = ['jquery', 'batman', 'knockout', 'mootools', 'yui', 'meteor', 'node', 'mocha', 'coffeescript', 'serenade', 'moment'];

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

		'.btn_add click': function (ele, ev) {
			var self = this;
			
			var n = _.random(0, randoms.length -1)
			var img = 'img/' + randoms.splice(n, 1)[0] + '.png';
			
			var model = new Item({img: img});
			model.save(function (item) {
				self.items.push(item);
			});
		},


		'.btn_remove click': function (ele, ev) {
			// get the model from the clicked element and destroy it
			var item = can.data(ele, 'item');
			item.destroy();
		}

	});

	var control = new Control('#main');


}());