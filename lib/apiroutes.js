/*jslint node: true */
'use strict';

var CompetitionController = require('./controllers/CompetitionController');
var UserCompetitionController = require('./controllers/UserCompetitionController');

exports.register = function(server, options, next) {

	server.register(require('inert'), function(err) {
		server.route({
			method: 'GET',
			path: '/stylist',
			config: CompetitionController.stylist
		});

		server.route({
			method: 'POST',
			path: '/enter/{userId}/{compId}',
			config: UserCompetitionController.enter
		});

	});

	next();
};

exports.register.attributes = {
	name: 'apiroutes',
	version: '1.0.0'
};