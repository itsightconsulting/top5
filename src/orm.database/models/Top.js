import { agregarCamposBaseAuditoria } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // TopId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        titulo: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        descripcion: {
            type: _dataTypes.STRING(500),
            allowNull: true,
        },
        // CategoriaId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        // },
        valoracion: {
            type: _dataTypes.INTEGER,
            allowNull: true,
        },
        flagPublicado: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        // LugarId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: true,
        // }
    };

    objEntidad = agregarCamposBaseAuditoria(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Top = sequelize.define(
        'Top'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false
            freezeTableName: true,
        });

    Top.associate = function (models) {
        // associations can be defined here
        Top.belongsTo(models.Categoria, { as: 'categoria' });
        // Top.belongsTo(models.Lugar);
        Top.hasMany(models.TopDetalle);
        Top.hasMany(models.TopReaccion);
    };
    return Top;
};
