import { agregarCamposBaseAuditoria, monthNamefromDate, formatAMPM, formatoPublicacion } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        titulo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
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
        valoracion: {
            type: _dataTypes.INTEGER,
            allowNull: true,
        },
        fechaPublicado: {
            type: _dataTypes.DATE,
            allowNull: true
        },
        fechaPublicadoStr: {
            type: _dataTypes.VIRTUAL,
            get() {
                let datePublicado = this.getDataValue('fechaPublicado');
                let datePublicadoStr = formatoPublicacion(datePublicado);
                return datePublicadoStr;
            }
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Top = sequelize.define(
        'Top'
        , CreateFieldObj(DataTypes)
        , {
            freezeTableName: true,
            getterMethods: {
                updatedAtString: function () {
                    let date = new Date(this.updatedAt);
                    let dateNow = new Date();
                    let dateStr = "";
                    let hourFormat = formatAMPM(date);
                    if (date) {
                        if (dateNow.getFullYear() === date.getFullYear())
                            dateStr = date.getDate() + ' ' + monthNamefromDate(date) + ' ' + hourFormat;
                        else dateStr = date.getDate() + ' ' + monthNamefromDate(date) + ' del ' + date.getFullYear() + ' ' + hourFormat;
                    }
                    return dateStr;
                }
            }
        });

    Top.associate = function (models) {
        // associations can be defined here
        // Top.hasMany(models.TopReaccion);
    };
    return Top;
};
