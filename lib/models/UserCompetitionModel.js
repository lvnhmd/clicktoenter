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
  }, 
  {
    tableName: 'user_competition',
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      saveUserCompetition: function(paramUserId, paramCompId) {
        UserCompetition.create({
          user_id: paramUserId,
          competition_id: paramCompId
        }).then(function(competition) {
          // let's assume the default of isAdmin is false:
          console.log(competition.get({
            plain: true
          }));
        });
      }
    }
  });
  return UserCompetition;
};