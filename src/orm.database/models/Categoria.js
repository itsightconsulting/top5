import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        CategoriaId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        RutaImagenPrincipal: {
            type: _dataTypes.STRING(180),
            allowNull: true,
        },

    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        'Categoria'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });

    Categoria.associate = function (models) {
        // associations can be defined here
    };

    return Categoria;
};
