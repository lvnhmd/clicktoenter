'use strict';
module.exports = function(sequelize, DataTypes) {
  var Competition = sequelize.define('Competition', {
    key: DataTypes.STRING,
    json: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      saveCompetition: function(paramkey, paramjson) {
        Competition.create({
          key: paramkey,
          json: paramjson
        }).then(function(competition) {
          // let's assume the default of isAdmin is false:
          console.log(competition.get({
            plain: true
          }))
        })
      },
    }
  });
  return Competition;
};