'use strict';
module.exports = function(sequelize, DataTypes) {
  var Competition = sequelize.define('Competition', {
    key: DataTypes.STRING,
    json: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Competition;
};