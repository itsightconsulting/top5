"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilitarios = require("../../utilitarios/utilitarios");

function CreateFieldObj(_dataTypes) {
  var objEntidad = {
    // lugarId: {
    //     type: _dataTypes.INTEGER,
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    name: {
      type: _dataTypes.STRING(200),
      allowNull: false
    },
    // latitude: {
    //     type: _dataTypes.FLOAT(9, 10),
    //     allowNull: false,
    // },
    // longitude: {
    //     type: _dataTypes.FLOAT(9, 10),
    //     allowNull: false,
    // },
    latitude: {
      type: _dataTypes.STRING(80),
      allowNull: false
    },
    longitude: {
      type: _dataTypes.STRING(80),
      allowNull: false
    },
    address: {
      type: _dataTypes.STRING(250),
      allowNull: false
    },
    latitudeFormat: {
      type: _dataTypes.VIRTUAL,
      get: function get() {
        var latitude = this.getDataValue('latitude');
        var latitudeNumber = "";

        if (latitude) {
          latitudeNumber = Number(latitude);
        }

        return latitudeNumber;
      }
    },
    longitudeFormat: {
      type: _dataTypes.VIRTUAL,
      get: function get() {
        var longitude = this.getDataValue('longitude');
        var longitudeNumber = "";

        if (longitude) {
          longitudeNumber = Number(longitude);
        }

        return longitudeNumber;
      }
    } // tipo: {
    //     type: _dataTypes.STRING(200),
    //     allowNull: false,
    // },
    // flagNuevoEnGoogleMaps: {
    //     type: _dataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: false
    // }

  };
  objEntidad = (0, _utilitarios.agregarCamposBaseAuditoria)(objEntidad, _dataTypes);
  return objEntidad;
}

var _default = function _default(sequelize, DataTypes) {
  var Lugar = sequelize.define('Lugar', CreateFieldObj(DataTypes), {
    /*options*/
    // timestamps: false
    freezeTableName: true
  });

  Lugar.associate = function (models) {
    // associations can be defined here
    // Lugar.hasMany(models.TopItem);
    Lugar.hasMany(models.TopItem, {
      foreignKey: "LugarId"
    });
  };

  return Lugar;
};

exports["default"] = _default;