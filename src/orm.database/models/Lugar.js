import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // lugarId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: _dataTypes.STRING(200),
            allowNull: false,
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
            allowNull: false,
        },
        longitude: {
            type: _dataTypes.STRING(80),
            allowNull: false,
        },
        address: {
            type: _dataTypes.STRING(250),
            allowNull: false,
        },

        latitudeFormat: {
            type: _dataTypes.VIRTUAL,
            get() {
                let latitude = this.getDataValue('latitude');
                let latitudeNumber = "";
                if (latitude) {
                    latitudeNumber = Number(latitude);
                }
                return latitudeNumber;
            }
        },
        longitudeFormat: {
            type: _dataTypes.VIRTUAL,
            get() {
                let longitude = this.getDataValue('longitude');
                let longitudeNumber = "";
                if (longitude) {
                    longitudeNumber = Number(longitude);
                }
                return longitudeNumber;
            }
        }
        // tipo: {
        //     type: _dataTypes.STRING(200),
        //     allowNull: false,
        // },
        // flagNuevoEnGoogleMaps: {
        //     type: _dataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Lugar = sequelize.define(
        'Lugar'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false
            freezeTableName: true,
        });

    Lugar.associate = function (models) {
        // associations can be defined here
        // Lugar.hasMany(models.TopItem);
    };
    return Lugar;
};
