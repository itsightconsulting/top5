import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        TipoUsuarioId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        }
    };

    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define(
        'TipoUsuario'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });
    /*
        TipoUsuario.associate = (models) => {
            TipoUsuario.belongsToMany(models.Usuario, {
                through: 'member',
                foreignKey: 'TipoUsuarioId',
            });
        };
    */
    return TipoUsuario;
};
