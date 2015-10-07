/*jslint node: true */
'use strict';

var utils = require('./utils');
require('colors');

var Crawler = require('simplecrawler');
var xray = require('x-ray')();
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port: 8088 });

server.route({
    method: 'GET',
    path: '/stylist',
    handler: function(request, reply) {

        var json = {};

        var fs = require('fs');
        fs.readFile('persist/stylist.json', {
            encoding: 'utf8'
        }, function(err, data) {
            var json;
            if (err) {
                console.log('Error loading persisted JSON', 'persist/stylist.json', err);
                return fetch();
            }

            try {
                json = JSON.parse(data);
            } catch (e) {
                console.log('Error decoding persisted JSON', 'persist/stylist.json', e);
                return fetch();
            }

            return reply(JSON.stringify(json));
        });

        var fetch = function() {

            var myCrawler = new Crawler('www.stylist.co.uk', '/win');

            myCrawler.maxDepth = 1;
            myCrawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {

                utils.saveFile('temp/' + utils.urlToFilename(queueItem.url), responseBuffer.toString('utf8'), function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('temp/' + utils.urlToFilename(queueItem.url) + ' persisted temporarily'.gray);
                });

                xray(responseBuffer, 'div.grid', [{
                        img: 'img@srcset',
                        headline: 'h1.summary__title',
                        content: 'p.summary__sell',
                        url: 'footer@data-url'
                    }])
                    (function(err, data) {
                        if (err) {
                            console.log('Error: ' + err);
                        } else {
                            console.log('data is ', JSON.stringify(data, undefined, 4));
                            // json[queueItem.url] = data;
                            json['www.stylist.co.uk/win'] = data;
                        }
                    });

                utils.saveFile('temp/stylist.json', JSON.stringify(json), function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('temp/stylist.json persisted temporarily'.gray);
                });

            });

            myCrawler.on('complete', function() {
                console.log('DONE!'.rainbow);

                reply(JSON.stringify(json));

                utils.saveFile('persist/stylist.json', 'window.DB = ' + JSON.stringify(json), function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('stylist.json persisted permanently'.green);

                    utils.cleanUp('temp', function(err) {
                        if (err) {
                            throw err;
                        }
                    });
                });
            });

            myCrawler.start();

        }; //end fetch
    }
});

server.start(function(err) {

    console.log(server.info.uri);
});