function CreateFieldObj(_dataTypes) {
    let FIELD_TABLE = {
        UsuarioId: {
            type: _dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador de la tabla usuario'
        },
        NombreCompleto: {
            type: _dataTypes.STRING(200),
            allowNull: true,
        },
        CorreoElectronico: {
            type: _dataTypes.STRING(200),
            allowNull: true,
        },
        Contrasenia: {
            type: _dataTypes.STRING(60),
            allowNull: true,
        },
        TipoUsuarioId:{
            type: _dataTypes.INTEGER,
            allowNull: true,
        },
        FlagActivo: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        FlagEliminado: {
            type: _dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        FechaCreacion: {
            type: _dataTypes.DATE,
            allowNull: false,
        },
        FechaModificacion: {
            type: _dataTypes.DATE,
            allowNull: true,
        }
    };
    return FIELD_TABLE;
}

export default (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        'Usuario'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            timestamps: false
        });

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.TipoUsuario, {
            foreignKey: 'TipoUsuarioId',
        });
    };

    return Usuario;
};
