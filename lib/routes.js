// var Welcome = require('./controllers/welcome');

exports.register = function(server, options, next) {

	server.register(require('inert'), function(err) {

		server.route({
			method: 'GET',
			path: '/{name}',
			handler: function(request, reply) {
				reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
			}
		});

		server.route({
			method: 'GET',
			path: '/index',
			handler: function(request, reply) {
				reply.file('index.html');
			}
		});


	});

	next();
};

exports.register.attributes = {
	name: 'routes',
	version: '1.0.0'
};