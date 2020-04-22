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
<<<<<<< HEAD
        // rutaImagen: {
        //     type: _dataTypes.STRING(500),
        //     allowNull: true,
        // },
=======
=======
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
        orderItems: {
            type: _dataTypes.STRING(200),
            allowNull: true
        },
<<<<<<< HEAD
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
=======
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
        flagPublicado: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
<<<<<<< HEAD
<<<<<<< HEAD
        // valoracion: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: true,
        // },
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
=======
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
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
