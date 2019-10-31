"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    titulo: {
      type: _dataTypes.STRING(200),
      allowNull: false
    },
    // rutaImagen: {
    //     type: _dataTypes.STRING(500),
    //     allowNull: true,
    // },
    flagPublicado: {
      type: _dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // valoracion: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: true,
    // },
    fechaPublicado: {
      type: _dataTypes.DATE,
      allowNull: true
    },
    fechaPublicadoStr: {
      type: _dataTypes.VIRTUAL,
      get: function get() {
        var datePublicado = this.getDataValue('fechaPublicado');
        var datePublicadoStr = "";

        if (datePublicado) {
          datePublicadoStr = (0, _utilitarios.formatoPublicacion)(datePublicado);
        } // console.log("datePublicadoStr", datePublicadoStr);


        return datePublicadoStr;
      }
    }
  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var Top = sequelize.define('Top', CreateFieldObj(DataTypes), {
    freezeTableName: true
  });

  Top.associate = function (models) {
    // associations can be defined here
    // Top.hasMany(models.TopReaccion);
    // Top.belongsTo(models.Categoria, { as: 'Categoria' });
    Top.belongsTo(models.Categoria, {
      as: "Categoria",
      foreignKey: "CategoriaId"
    }); // Top.hasMany(models.TopItem);

    Top.hasMany(models.TopItem, {
      foreignKey: "TopId"
    });
  };

  return Top;
};

exports["default"] = _default;