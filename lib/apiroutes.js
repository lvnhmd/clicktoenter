/*jslint node: true */
'use strict';

var CompetitionSource = require('./controllers/competitionsource');

exports.register = function(server, options, next) {

	server.register(require('inert'), function(err) {
		server.route({
			method: 'GET',
			path: '/stylist',
			config: CompetitionSource.stylist
		});

	});

	next();
};

exports.register.attributes = {
	name: 'apiroutes',
	version: '1.0.0'
};