function FieldTableDeclare(_dataTypes) {
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
            allowNull: false,
        },
        CorreoElectronico: {
            type: _dataTypes.STRING(200),
            allowNull: false,
        },
        Username: {
            type: _dataTypes.STRING(60),
            allowNull: false,
        },
        Contrasenia: {
            type: _dataTypes.STRING(60),
            allowNull: false,
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
        , FieldTableDeclare(DataTypes)
        , { /*options*/
            timestamps: false
        });
    return Usuario;
};
