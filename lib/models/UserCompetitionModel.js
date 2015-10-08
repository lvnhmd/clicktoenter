/*jslint node: true */
'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserCompetition = sequelize.define('UserCompetition', {
    user_id: {
      type: DataTypes.INTEGER,
      unique: 'oneEntryPerUserConstraint'
    },
    competition_id: {
      type: DataTypes.INTEGER,
      unique: 'oneEntryPerUserConstraint'
    }
  }, {
    // Table name
    tableName: 'user_competition',
    freezeTableName: true
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserCompetition;
};