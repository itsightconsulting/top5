import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        rutaImagen: {
            type: _dataTypes.STRING(500),
            allowNull: true,
        },
        flagImagenDefaultTop: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TopDetalle = sequelize.define(
        'TopDetalle'
        , CreateFieldObj(DataTypes)
        , {
            freezeTableName: true,
        });

    TopDetalle.associate = function (models) {
        // associations can be defined here
        TopDetalle.belongsTo(models.Top);
    };
    return TopDetalle;
};
