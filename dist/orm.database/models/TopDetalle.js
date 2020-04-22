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
  var TopDetalle = sequelize.define('TopDetalle', CreateFieldObj(DataTypes), {
    freezeTableName: true
  });

  TopDetalle.associate = function (models) {
    // associations can be defined here
    TopDetalle.belongsTo(models.Top);
  };

  return TopDetalle;
};

exports["default"] = _default;