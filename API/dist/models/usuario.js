"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function FieldTableDeclare(_Sequelize) {
  var FIELD_TABLE = {
    UsuarioId: {
      type: _Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Identificador de la tabla usuario'
    },
    NombreCompleto: {
      type: _Sequelize.STRING(200),
      allowNull: false
    },
    CorreoElectronico: {
      type: _Sequelize.STRING(200),
      allowNull: false
    },
    Username: {
      type: _Sequelize.STRING(60),
      allowNull: false
    },
    Contrasenia: {
      type: _Sequelize.STRING(60),
      allowNull: false
    },
    FlagActivo: {
      type: _Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    FlagEliminado: {
      type: _Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    FechaCreacion: {
      type: _sequelize["default"].DATE,
      allowNull: false
    },
    FechaModificacion: {
      type: _sequelize["default"].DATE,
      allowNull: true
    }
  };
  return FIELD_TABLE;
}

var Usuario = _database.sequelize.define('Usuario', FieldTableDeclare(_sequelize["default"]), {
  /*options*/
  timestamps: false
});

var _default = Usuario;
exports["default"] = _default;