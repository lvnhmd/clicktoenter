// var Welcome = require('./controllers/welcome');

exports.register = function(server, options, next) {

	server.register(require('inert'), function(err) {

		server.route({    
		    method: 'GET',
		    path: '/persist/{param*}',
		    handler: {
			    directory: {
			        path: './persist',
			        listing: true,
			        index: false
			    }
			}
		});

		server.route({    
		    method: 'GET',
		    path: '/assets/{param*}',
		    handler: {
			    directory: {
			        path: './assets',
			        listing: true,
			        index: false
			    }
			}
		});

		server.route({
			method: 'GET',
			path: '/',
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