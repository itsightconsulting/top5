import { agregarCamposBaseAuditoria, formatoFechaStr } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        titulo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        orderItems: {
            type: _dataTypes.STRING(200),
            allowNull: true
        },
        flagPublicado: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fechaPublicado: {
            type: _dataTypes.DATE,
            allowNull: true
        },
        fechaPublicadoStr: {
            type: _dataTypes.VIRTUAL,
            get() {
                let datePublicado = this.getDataValue('fechaPublicado');
                return formatoFechaStr(datePublicado);
            }
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
            timestamps: false,
            freezeTableName: true
        });

    Top.associate = function (models) {
        // associations can be defined here
        // Top.hasMany(models.TopReaccion);
        // Top.belongsTo(models.Categoria, { as: 'Categoria' });
        Top.belongsTo(models.Categoria, {
            as: "Categoria", foreignKey: "CategoriaId"
        });
        // Top.hasMany(models.TopItem);
        Top.hasMany(models.TopItem, {
            foreignKey: "TopId"
        });
    };
    return Top;
};
