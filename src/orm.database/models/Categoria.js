import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // CategoriaId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        rutaImagenPrincipal: {
            type: _dataTypes.STRING(180),
            allowNull: true,
        },
        nroOrden: {
            type: _dataTypes.INTEGER,
            allowNull: true
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        'Categoria'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false,
            freezeTableName: true,
        });

    Categoria.associate = function (models) {
        // associations can be defined here
        // Categoria.hasMany(models.Top);
        Categoria.hasMany(models.Top, {
            as: "Categoria", foreignKey: "CategoriaId"
        });
    };

    return Categoria;
};
