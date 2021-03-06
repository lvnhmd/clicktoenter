/*jslint node: true */
'use strict';

var utils = require('../utils/utils');
require('colors');
var Path = require('path');
var Competition = require('../models').Competition;

var Crawler = require('simplecrawler');
var xray = require('x-ray')();


module.exports.stylist = {
	description: 'Competitions from http://www.stylist.co.uk/win',
	handler: function(request, reply) {

		var tempDir = Path.join(__dirname, '../temp/');
		var persistDir = Path.join(__dirname, '../public/persist/');

		var json = {};

		var fs = require('fs');
		fs.readFile(persistDir + 'stylist.json', {
			encoding: 'utf8'
		}, function(err, data) {
			var json;
			if (err) {
				console.log('Error loading persisted JSON', err);
				return fetch();
			}

			// try {
			// 	json = JSON.parse(data);
			// } catch (e) {
			// 	console.log('Error decoding persisted JSON', e);
			// 	return fetch();
			// }

			// return reply(JSON.stringify(json));
			return reply(JSON.stringify(data));
		});

		var fetch = function() {

			var myCrawler = new Crawler('www.stylist.co.uk', '/win');

			myCrawler.maxDepth = 1;
			myCrawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {

				utils.saveFile(tempDir + utils.urlToFilename(queueItem.url), responseBuffer.toString('utf8'), function(err) {
					if (err) {
						throw err;
					}
					console.log((tempDir + utils.urlToFilename(queueItem.url) + ' persisted temporarily').gray);
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

				utils.saveFile(tempDir + 'stylist.json', JSON.stringify(json), function(err) {
					if (err) {
						throw err;
					}
					console.log((tempDir + 'stylist.json' + ' persisted temporarily').gray);
				});

			});

			myCrawler.on('complete', function() {
				console.log('DONE!'.rainbow);

				reply(JSON.stringify(json));

				Competition.saveCompetition('www.stylist.co.uk/win',JSON.stringify(json['www.stylist.co.uk/win']));

				utils.saveFile(persistDir + 'stylist.json', 'window.DB = ' + JSON.stringify(json), function(err) {
					if (err) {
						throw err;
					}
					console.log((persistDir + 'stylist.json persisted permanently').green);

					utils.cleanUp(tempDir, function(err) {
						if (err) {
							throw err;
						}
					});
				});
			});

			myCrawler.start();

		}; //end fetch
	}
};