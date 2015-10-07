/*jslint node: true */
'use strict';

// Load modules
var Glue = require('glue');
var Hapi = require('hapi');
var Path = require('path');

// Internals
var internals = {
    manifest: {
        connections: [
            {
                port: 8080,
                labels: ['http'],
                routes: {
                    files: {
                        relativeTo: Path.join(__dirname, 'public')
                    }
                }
            }, 
            {
                port: 8088,
                labels: ['api']
            }
        ],
        plugins: {
            './httproutes': [{
                'select': ['http']
            }],
            './apiroutes': [{
                'select': ['api']
            }],
            good: {
                opsInterval: 5000,
                reporters: [{
                    'reporter': 'good-console',
                    'events': {
                        'log': '*'
                    }
                }]
            }
        }
    }
};

if (!process.env.PRODUCTION) {
    internals.manifest.plugins.blipp = [{}];
    internals.manifest.plugins.good.reporters[0].events.ops = '*';
}


Glue.compose(internals.manifest, {
    relativeTo: __dirname
}, function(err, server) {

    if (err) {
        console.log('server.register err:', err);
    }
    server.start(function() {
        // console.log('✅  Server is listening on ' + pack.info.uri.toLowerCase());
        // console.log('✅  Server is listening on ' + server.info.uri);

        console.log('✅  Server is listening ');
    });
});