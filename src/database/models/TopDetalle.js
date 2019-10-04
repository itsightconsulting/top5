import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        TopDetalleId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        TopId: {
            type: _dataTypes.INTEGER,
            allowNull: false
        },
        RutaImagen: {
            type: _dataTypes.STRING(180),
            allowNull: true,
        },
        FlagImagenDefaultTop: {
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
        , { /*options*/
            timestamps: false
        });

    return TopDetalle;
};
