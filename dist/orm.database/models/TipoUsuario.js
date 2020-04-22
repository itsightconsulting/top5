"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    // tipoUsuarioId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    name: {
      type: _dataTypes.STRING(200),
      allowNull: false
    }
  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var TipoUsuario = sequelize.define('TipoUsuario', CreateFieldObj(DataTypes), {
    /*options*/
<<<<<<< HEAD
    timestamps: false,
=======
    // timestamps: false
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    freezeTableName: true
  });

  TipoUsuario.associate = function (models) {
    // associations can be defined here
    TipoUsuario.hasMany(models.Usuario);
  };

  return TipoUsuario;
};

exports["default"] = _default;