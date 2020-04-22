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
      allowNull: true
    },
    valoracion: {
      type: _dataTypes.INTEGER,
      allowNull: true
    } // flagPublicado: {
    //     type: _dataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: false
    // },
    // fechaPublicado: {
    //     type: _dataTypes.DATE,
    //     allowNull: true
    // }

  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var TopItem = sequelize.define('TopItem', CreateFieldObj(DataTypes), {
<<<<<<< HEAD
    timestamps: false,
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
    freezeTableName: true
  });

  TopItem.associate = function (models) {
    // associations can be defined here
    TopItem.hasMany(models.TopItemDetalle);
    TopItem.hasMany(models.TopItemLike); // TopItem.belongsTo(models.Top);

    TopItem.belongsTo(models.Top, {
      foreignKey: "TopId"
    }); // TopItem.belongsTo(models.Lugar, { as: 'Lugar' });

    TopItem.belongsTo(models.Lugar, {
      foreignKey: "LugarId"
    });
  };

  return TopItem;
};

exports["default"] = _default;