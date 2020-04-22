import { agregarCamposBaseAuditoria, monthNamefromDate } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        descripcion: {
            type: _dataTypes.STRING(500),
            allowNull: true,
        },
        valoracion: {
            type: _dataTypes.INTEGER,
            allowNull: true,
        },
        // flagPublicado: {
        //     type: _dataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // },
        // fechaPublicado: {
        //     type: _dataTypes.DATE,
        //     allowNull: true
        // }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TopItem = sequelize.define(
        'TopItem'
        , CreateFieldObj(DataTypes)
        , {
<<<<<<< HEAD
            timestamps: false,
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            freezeTableName: true
        });

    TopItem.associate = function (models) {
        // associations can be defined here
        TopItem.hasMany(models.TopItemDetalle);

        TopItem.hasMany(models.TopItemLike);
        // TopItem.belongsTo(models.Top);
        TopItem.belongsTo(models.Top, {
            foreignKey: "TopId"
        });

        // TopItem.belongsTo(models.Lugar, { as: 'Lugar' });
        TopItem.belongsTo(models.Lugar, {
            foreignKey: "LugarId"
        });
    };
    return TopItem;
};
