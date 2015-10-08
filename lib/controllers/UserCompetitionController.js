/*jslint node: true */
'use strict';

require('colors');
var Path = require('path');
var UserCompetition = require('../models').UserCompetition;

module.exports.enter = {
	description: 'Enter competition',
	handler: function(request, reply) {

		var paramUserId = encodeURIComponent(request.params.userId);
		var paramCompId = encodeURIComponent(request.params.compId);

		UserCompetition.saveUserCompetition(paramUserId, paramCompId);

		return reply();

	}
};