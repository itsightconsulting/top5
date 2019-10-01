import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        TopId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Titulo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        Descripcion: {
            type: _dataTypes.STRING(500),
            allowNull: false,
        },
        Valoracion: {
            type: _dataTypes.INTEGER,
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Top = sequelize.define(
        'Top'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });

    return Top;
};
