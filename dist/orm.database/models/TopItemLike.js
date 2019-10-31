"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {};
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var TopItemLike = sequelize.define('TopItemLike', CreateFieldObj(DataTypes), {
    freezeTableName: true
  });

  TopItemLike.associate = function (models) {
    // associations can be defined here
    TopItemLike.belongsTo(models.Usuario, {
      foreignKey: "UsuarioId"
    });
    TopItemLike.belongsTo(models.TopItem, {
      foreignKey: "TopItemId"
    });
  };

  return TopItemLike;
};

exports["default"] = _default;