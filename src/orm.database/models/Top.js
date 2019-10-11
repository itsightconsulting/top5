import { agregarCamposBaseAuditoria, monthNamefromDate } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        titulo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Top = sequelize.define(
        'Top'
        , CreateFieldObj(DataTypes)
        , {
            freezeTableName: true,
            getterMethods: {
                updatedAtString() {
                    let date = new Date(this.updatedAt);
                    console.log("updatedAtString", date);
                    return date.getDate() + ' de ' + monthNamefromDate(date) + ' del ' + date.getFullYear();
                }
            }
        });

    Top.associate = function (models) {
        // associations can be defined here
        Top.belongsTo(models.Categoria, { as: 'categoria' });
        // Top.hasMany(models.TopReaccion);
    };
    return Top;
};
