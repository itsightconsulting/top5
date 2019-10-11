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
        flagPublicado: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fechaPublicado: {
            type: _dataTypes.DATE,
            allowNull: true
        }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TopItem = sequelize.define(
        'TopItem'
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

    TopItem.associate = function (models) {
        // associations can be defined here
        TopItem.hasMany(models.TopItemDetalle);
        TopItem.hasMany(models.TopReaccion);
    };
    return TopItem;
};
