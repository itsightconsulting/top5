import { agregarCamposBaseAuditoria, formatoPublicacion } from '../../utilitarios/utilitarios';
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
            get() {
                let datePublicado = this.getDataValue('fechaPublicado');
                let datePublicadoStr = "";
                if (datePublicado) {
                    datePublicadoStr = formatoPublicacion(datePublicado);
                }
                // console.log("datePublicadoStr", datePublicadoStr);
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
            freezeTableName: true
        });

    Top.associate = function (models) {
        // associations can be defined here
        // Top.hasMany(models.TopReaccion);
        Top.belongsTo(models.Categoria, { as: 'Categoria' });

        // Top.hasMany(models.TopItem);
        Top.hasMany(models.TopItem, {
            foreignKey: "TopId"
        });
    };
    return Top;
};
