import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // TopDetalleId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        // topId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false
        // },
        rutaImagen: {
            type: _dataTypes.STRING(180),
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
        , { /*options*/
            // timestamps: false
            freezeTableName: true,
        });

    TopDetalle.associate = function (models) {
        // associations can be defined here
        // TopDetalle.belongsTo(models.Top);
    };
    return TopDetalle;
};
