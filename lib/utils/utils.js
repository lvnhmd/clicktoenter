/*jslint node: true */
'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var urlParse = require('url').parse;
var slug = require('slug');
var rimraf = require('rimraf');

module.exports.saveFile = function saveFile(filename, contents, callback) {
    mkdirp(path.dirname(filename), function(err) {
        if (err) {
            return callback(err);
        }
        fs.writeFile(filename, contents, callback);
    });
};

// remove temp directory 
module.exports.cleanUp = function cleanUp(dirname, callback) {
    rimraf(dirname, function(err) {
        if (err) {
            return callback(err);
        }
    });
};

module.exports.urlToFilename = function urlToFilename(url) {
    var parsedUrl = urlParse(url);
    var urlPath = parsedUrl.path.split('/')
        .filter(function(component) {
            return !!component;
        })
        .map(function(component) {
            return slug(component);
        })
        .join('/');
    var filename = path.join(parsedUrl.hostname, urlPath);
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html';
    }
    return filename;
};

module.exports.removeFilesFrom = function removeFilesFrom(path, callback) {
    rmdir(path, function(err, dirs, files) {
        console.log(dirs);
        console.log(files);
        console.log('all files are removed');
    });
};