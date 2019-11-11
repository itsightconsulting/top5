"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    rutaImagen: {
      type: _dataTypes.STRING(500),
      allowNull: true
    },
    flagImagenDefaultTop: {
      type: _dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  };
  objEntidad = (0, _utilitarios.agregarCamposBase)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var TopItemDetalle = sequelize.define('TopItemDetalle', CreateFieldObj(DataTypes), {
    /*options*/
    timestamps: false,
    freezeTableName: true
  });

  TopItemDetalle.associate = function (models) {// associations can be defined here
    // TopDetalle.belongsTo(models.Top);
  };

  return TopItemDetalle;
};

exports["default"] = _default;