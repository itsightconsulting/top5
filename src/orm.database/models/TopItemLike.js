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
            freezeTableName: true
        });

    TopItemLike.associate = function (models) {
        // associations can be defined here
        // TopItemLike.belongsTo(models.TopIem, {
        //     foreignKey: "TopItemId"
        // });
    };
    return TopItemLike;
};
