/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
// var path = require('path');
var utils = require('./utils');
// var uuid = require('node-uuid');
var Crawler = require('simplecrawler');
require('colors');
var xray = require('x-ray')();
var prettyjson = require('prettyjson');
var port = process.env.PORT || 8080; // set our port
// var config = require('./config')[process.env.NODE_ENV || 'production'];
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);
// app.use('/xml', express.static(path.join(__dirname, 'xml')));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// router.get('/auth', function(req, res) {

//  var capability = new twilio.Capability(config.accountSid, config.authToken);

//  // This would allow inbound connections as $clientName:
//  capability.allowClientIncoming(config.clientName);

//  // This allows outgoing connections to $appSid with the "From" parameter being $clientName
//  //$capability->allowClientOutgoing($appSid, array(), $clientName);
//  capability.allowClientOutgoing(config.appSid);

//  // This would return a token to use with Twilio based on
//  // the account and capabilities defined above
//  var token = capability.generate();

//  res.type('text/xml');
//  res.send(token.toString());

// });

router.get('/stylist', function(req, res) {

    var jsonOptions = {
        keysColor: 'green',
        dashColor: 'magenta',
        stringColor: 'blue'
    };

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

    var fetch = function() { // var myCrawler = new Crawler('www.elvinali.co.uk','/');

        var myCrawler = new Crawler('www.stylist.co.uk', '/win');

        myCrawler.maxDepth = 2;

        myCrawler.addFetchCondition(function(parsedURL) {
            return parsedURL.path.match(/.*\bwin\b/);
        });
        // myCrawler.addFetchCondition(function(parsedURL) {
        //        return !parsedURL.path.match(/\.pdf$/i);
        //    });
        //    myCrawler.addFetchCondition(function(parsedURL) {
        //        return !parsedURL.path.match(/\.css$/i);
        //    });
        //    myCrawler.addFetchCondition(function(parsedURL) {
        //        return !parsedURL.path.match(/\.png$/i);
        //    });
        //    myCrawler.addFetchCondition(function(parsedURL) {
        //        return !parsedURL.path.match(/\.js$/i);
        //    });
        //    myCrawler.addFetchCondition(function(parsedURL) {
        //        return !parsedURL.path.match(/\.ico$/i);
        //    });


        // myCrawler.on("discoverycomplete", function(queueItem, resources) {
        //      // console.log(JSON.stringify(myCrawler._openRequests).green);
        //     console.log(JSON.stringify(myCrawler.queue.scanIndex).magenta);
        // });

        myCrawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {

            console.log(prettyjson.render(myCrawler.queue.scanIndex, jsonOptions));

            console.log('I just received %s (%d bytes)', queueItem.url, responseBuffer.length);
            console.log('It was a resource of type %s', response.headers['content-type']);

            // var filename = utils.urlToFilename(queueItem.url);

            // utils.saveFile(filename, responseBuffer, function(err) {
            // console.log('Downloaded and saved: ' + queueItem.url);
            if (queueItem.depth > 1) {
                // json.push(queueItem.url);

                xray(responseBuffer, 'article.article', [{ //div class=article__hero
                        img: 'img@srcset',
                        headline: 'h1.article__headline',
                        content: 'div.article__content'
                    }])
                    (function(err, data) {
                        if (err) {
                            console.log('Error: ' + err);
                        } else {
                            console.log(data);
                            json[queueItem.url] = data;
                        }
                    });



            }
            utils.saveFile('temp/stylist.json', JSON.stringify(json), function(err) {
                if (err) {
                    throw err;
                }
                console.log('temp/stylist.json persisted temporarily'.gray);
            });
            // });

            // instead of saving this file , parse it 


            // Do something with the data in responseBuffer
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

                utils.cleanUp('temp', function(err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });

        myCrawler.start();

        // var resp = new twilio.TwimlResponse();
        // resp.say('Welcome to Twilio Client!');

        // res.type('text/xml');
        // res.send(resp.toString());

    };

});

// router.get('/fixedcall', function(req, res) {

//  var resp = new twilio.TwimlResponse();
//  resp.say('Placing your call now.')
//      .dial({
//          callerId: config.callerID
//      }, config.displayCallerNumber);

//  res.type('text/xml');
//  res.send(resp.toString());

// });

// router.get('/handle-screen-input/digits/:digits', function(req, res) {

//  var user_pushed = req.params.digits;

//  var resp = new twilio.TwimlResponse();

//  if (user_pushed == 1) {
//      resp.say('Connecting you to the caller.');
//  } else {
//      resp.hangup();
//  }

//  res.type('text/xml');
//  res.send(resp.toString());

// });

// router.get('/screen-caller/clientname/:clientName', function(req, res) {

//  var clientName = req.params.clientName.replace(/[^a-zA-Z0-9]+/, '');

//  var resp = new twilio.TwimlResponse();
//  resp.say('You have an incoming call from ' + clientName + '.');

//  res.type('text/xml');
//  res.send(resp.toString());

// });

// router.get('/screen-caller/clientname/:clientName/room/:room', function(req, res) {

//  var clientName = req.params.clientName;
//  var room = req.params.room;

//  var resp = new twilio.TwimlResponse();
//  resp.say('You have an incoming call from ' + clientName + ' in room ' + room);

//  res.type('text/xml');
//  res.send(resp.toString());

// });


// router.get('/screen-caller/room/:room', function(req, res) {

//  var room = req.params.room;

//  var resp = new twilio.TwimlResponse();
//  resp.say('You have an incoming call from room ' + room);

//  res.type('text/xml');
//  res.send(resp.toString());

// });

// router.get('/call/number/:number/clientname/:clientName/room/:room', function(req, res) {

//  var number = req.params.number.replace(/[^0-9]+/, '');
//  var room = req.params.room.replace(/[^0-9]+/, '');
//  var clientName = req.params.clientName.replace(/[^a-zA-Z0-9]+/, '');

//  //generate xml and put it in folder xml - pass name of xml to the url below
//  //generate names with timestamp
//  //create little thread that cleans up the persisted xmls after an hour

//  var xml = new twilio.TwimlResponse();
//  xml.say('You have an incoming call from ' + clientName + ' in room ' + room);

//  var xmlname = 'xml/screen-caller-' + uuid.v4() + '.xml';

//  utils.saveFile(xmlname, xml.toString(), function() {

//      var resp = new twilio.TwimlResponse();
//      resp.dial({
//          callerId: config.callerID
//      }, function() {

//          this.number({
//              url: 'http://' + req.headers.host + '/' + xmlname,
//              method: 'GET'
//          }, number);

//      });

//      res.type('text/xml');
//      res.send(resp.toString());
//  });

// });

// router.get('/call/number/:number/room/:room', function(req, res) {

//  var number = req.params.number.replace(/[^0-9]+/, '');
//  var room = req.params.room.replace(/[^0-9]+/, '');

//  var xml = new twilio.TwimlResponse();
//  xml.say('You have an incoming call from room ' + room);

//  var xmlname = 'xml/screen-caller-' + uuid.v4() + '.xml';

//  utils.saveFile(xmlname, xml.toString(), function() {

//      var resp = new twilio.TwimlResponse();
//      resp.dial({
//          callerId: config.callerID
//      }, function() {

//          this.number({
//              url: 'http://' + req.headers.host + '/' + xmlname,
//              method: 'GET'
//          }, number);

//      });

//      res.type('text/xml');
//      res.send(resp.toString());
//  });

// });