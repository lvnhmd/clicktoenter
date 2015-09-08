/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */

var express = require('express'); 
var app = express(); 

var utils = require('./utils');

var Crawler = require('simplecrawler');
require('colors');
var xray = require('x-ray')();
var prettyjson = require('prettyjson');
var port = process.env.PORT || 8080; 
// var config = require('./config')[process.env.NODE_ENV || 'production'];

var router = express.Router(); 

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// all of routes will be prefixed with /
app.use('/', router);
// app.use('/xml', express.static(path.join(__dirname, 'xml')));

/*
Start a job to clean up temp file after 10 min
*/

// var minutes = 10,
//     interval = minutes * 60 * 1000;
// setInterval(function() {
//     utils.removeFilesFrom('temp');
// }, interval);



app.listen(port);
console.log('Magic happens on port ' + port);

router.get('/stylist', function(req, res) {

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

        res.type('application/json; charset=utf-8');
        res.send(json);
    });

    var fetch = function() {

        var myCrawler = new Crawler('www.stylist.co.uk', '/win');

        myCrawler.maxDepth = 1;

        // myCrawler.addFetchCondition(function(parsedURL) {
        //     return parsedURL.path.match(/.*\bwin\b/);
        // });
        
        // myGrawler.on('fetchstart', )

        myCrawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {

            // if (queueItem.depth > 1) {

                // console.log(JSON.stringify(queueItem));
                // console.log(responseBuffer.toString('utf8'));
                utils.saveFile('temp/' + utils.urlToFilename(queueItem.url), responseBuffer.toString('utf8'), function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('temp/' + utils.urlToFilename(queueItem.url) + ' persisted temporarily'.gray);
                });

                xray(responseBuffer, 'div.grid', [{ //div class=article__hero
                        img: 'img@srcset',
                        headline: 'h1.h3 summary__title',
                        content: 'p.summary__sell',
                        url: 'footer@data-url'
                    }])
                    (function(err, data) {
                        if (err) {
                            console.log('Error: ' + err);
                        } else {
                            json[queueItem.url] = data;
                        }
                    });
            // }
            utils.saveFile('temp/stylist.json', JSON.stringify(json), function(err) {
                if (err) {
                    throw err;
                }
                console.log('temp/stylist.json persisted temporarily'.gray);
            });

        });

        myCrawler.on('complete', function() {
            console.log('DONE!'.rainbow);

            res.type('application/json; charset=utf-8');
            res.send(json);

            utils.saveFile('persist/stylist.json', JSON.stringify(json), function(err) {
                if (err) {
                    throw err;
                }
                console.log('stylist.json persisted permanently'.green);

                // utils.cleanUp('temp', function(err) {
                //     if (err) {
                //         throw err;
                //     }
                // });
            });
        });

        myCrawler.start();

    };

});