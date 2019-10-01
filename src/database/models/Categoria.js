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
        }
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

    return Categoria;
};
