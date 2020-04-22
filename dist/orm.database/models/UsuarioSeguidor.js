"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {// UsuarioSeguidorId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    // UsuarioId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    // },
    // SiguiendoAUsuarioId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    // },
  };
  objEntidad = (0, _utilitarios.agregarCamposBase)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var UsuarioSeguidor = sequelize.define('UsuarioSeguidor', CreateFieldObj(DataTypes), {
    /*options*/
<<<<<<< HEAD
    timestamps: false,
=======
    // timestamps: false
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    freezeTableName: true
  });

  UsuarioSeguidor.associate = function (models) {
    // associations can be defined here
    UsuarioSeguidor.belongsTo(models.Usuario, {
      as: 'UsuarioId'
    });
    UsuarioSeguidor.belongsTo(models.Usuario, {
      as: 'siguiendoAUsuarioId'
    });
  };

  return UsuarioSeguidor;
};

exports["default"] = _default;