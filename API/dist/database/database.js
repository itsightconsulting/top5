"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgregarCamposBase = AgregarCamposBase;
exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize["default"](_config.database.databaseName, _config.database.user, _config.database.password, {
  host: _config.database.host,
  port: _config.database.port,
  dialect: _config.database.dialect,
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  },
  logging: false // mostrar en consola

});
exports.sequelize = sequelize;

function AgregarCamposBase(_FIELD_TABLE) {
  _FIELD_TABLE.FlagActivo = {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  };
  _FIELD_TABLE.FlagEliminado = {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  };
  _FIELD_TABLE.CreadoPor = {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  };
  _FIELD_TABLE.FechaCreacion = {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false
  };
  _FIELD_TABLE.ModificadoPor = {
    type: _sequelize["default"].STRING(100),
    allowNull: true
  };
  _FIELD_TABLE.FechaModificacion = {
    type: _sequelize["default"].STRING(100),
    allowNull: true
  };
  return _FIELD_TABLE;
}