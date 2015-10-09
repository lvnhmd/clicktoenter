/*global window, Ractive */
/*jslint white: true */

var app = (function(window, Ractive) {

	'use strict';

	var app = new Ractive({
		el: 'clicktoenterapp',
		template: '#main',
		data: {
			items: DB["www.stylist.co.uk/win"]
		}
	});
	console.log('ready steady go');
	// Event handlers
	app.on({
		enter: function(event) {
			var competition = event.node.value.trim();

			console.log(competition);
		}
	});

	return app;

}(window, Ractive));