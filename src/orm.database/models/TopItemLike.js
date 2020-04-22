import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {

    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TopItemLike = sequelize.define(
        'TopItemLike'
        , CreateFieldObj(DataTypes)
        , {
<<<<<<< HEAD
            timestamps: false,
=======
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            freezeTableName: true
        });

    TopItemLike.associate = function (models) {
        // associations can be defined here
        TopItemLike.belongsTo(models.Usuario, {
            foreignKey: "UsuarioId"
        });
        TopItemLike.belongsTo(models.TopItem, {
            foreignKey: "TopItemId"
        });
    };
    return TopItemLike;
};
