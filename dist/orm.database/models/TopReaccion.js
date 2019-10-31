"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {// TopReaccionId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    // TopId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    // },
    // UsuarioId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    // }
  };
  objEntidad = (0, _utilitarios.agregarCamposBase)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var TopReaccion = sequelize.define('TopReaccion', CreateFieldObj(DataTypes), {
    /*options*/
    // timestamps: false
    freezeTableName: true
  });

  TopReaccion.associate = function (models) {// associations can be defined here
  };

  return TopReaccion;
};

exports["default"] = _default;