'use strict';

var _config = require("../config/config.js");

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename); // const env = process.env.NODE_ENV || 'test';
// const config = require(__dirname + '/../config/config.json')[env];

var config = _config.database;
var db = {}; // let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {

var sequelize = new Sequelize(config.database, config.username, config.password, config); //   pool: { max: 5, min: 0, require: 30000, idle: 10000 },
// }

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize; // db.Op = Sequelize.Op;

module.exports = db;