/*jslint node: true */
'use strict';

var CompetitionController = require('./controllers/CompetitionController');

exports.register = function(server, options, next) {

	server.register(require('inert'), function(err) {
		server.route({
			method: 'GET',
			path: '/stylist',
			config: CompetitionController.stylist
		});

	});

	next();
};

exports.register.attributes = {
	name: 'apiroutes',
	version: '1.0.0'
};