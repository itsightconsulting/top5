<<<<<<< HEAD
import { agregarCamposBaseAuditoria, formatoFechaStr } from '../../utilitarios/utilitarios';
=======
import { agregarCamposBaseAuditoria, formatoPublicacion, formatoFechaStr } from '../../utilitarios/utilitarios';
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        titulo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
<<<<<<< HEAD
        // rutaImagen: {
        //     type: _dataTypes.STRING(500),
        //     allowNull: true,
        // },
=======
        orderItems: {
            type: _dataTypes.STRING(200),
            allowNull: true
        },
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        flagPublicado: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
<<<<<<< HEAD
        // valoracion: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: true,
        // },
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
        fechaPublicado: {
            type: _dataTypes.DATE,
            allowNull: true
        },
        fechaPublicadoStr: {
            type: _dataTypes.VIRTUAL,
            get() {
                let datePublicado = this.getDataValue('fechaPublicado');
                return formatoFechaStr(datePublicado);
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
<<<<<<< HEAD
            timestamps: false,
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            freezeTableName: true
        });

    Top.associate = function (models) {
        // associations can be defined here
        // Top.hasMany(models.TopReaccion);
        // Top.belongsTo(models.Categoria, { as: 'Categoria' });
        Top.belongsTo(models.Categoria, {
            as: "Categoria", foreignKey: "CategoriaId"
        });
        // Top.hasMany(models.TopItem);
        Top.hasMany(models.TopItem, {
            foreignKey: "TopId"
        });
    };
    return Top;
};
