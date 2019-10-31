"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    // CategoriaId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    name: {
      type: _dataTypes.STRING(200),
      allowNull: false
    },
    rutaImagenPrincipal: {
      type: _dataTypes.STRING(180),
      allowNull: true
    },
    nroOrden: {
      type: _dataTypes.INTEGER,
      allowNull: true
    }
  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var Categoria = sequelize.define('Categoria', CreateFieldObj(DataTypes), {
    /*options*/
    // timestamps: false
    freezeTableName: true
  });

  Categoria.associate = function (models) {
    // associations can be defined here
    // Categoria.hasMany(models.Top);
    Categoria.hasMany(models.Top, {
      as: "Categoria",
      foreignKey: "CategoriaId"
    });
  };

  return Categoria;
};

exports["default"] = _default;