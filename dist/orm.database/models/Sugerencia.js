"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    descripcion: {
      type: _dataTypes.STRING(500),
      allowNull: false
    }
  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var Sugerencia = sequelize.define('Sugerencia', CreateFieldObj(DataTypes), {
    /*options*/
    // timestamps: false,
    freezeTableName: true
  });

  Sugerencia.associate = function (models) {// associations can be defined here
  };

  return Sugerencia;
};

exports["default"] = _default;