"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    // ParametroId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    code: {
      type: _dataTypes.STRING(500),
      allowNull: false
    },
    value: {
      type: _dataTypes.STRING(500),
      allowNull: false
    }
  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var Parametro = sequelize.define('Parametro', CreateFieldObj(DataTypes), {
    /*options*/
    timestamps: false,
    freezeTableName: true
  });

  Parametro.associate = function (models) {// associations can be defined here
  };

  return Parametro;
};

exports["default"] = _default;