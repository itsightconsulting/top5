import { agregarCamposBase } from '../../utilitarios/utilitarios';
function CreateFieldObj(_dataTypes) {
    let objEntidad = {
        // UsuarioId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     comment: 'Identificador de la tabla usuario'
        // },
        nombreCompleto: {
            type: _dataTypes.STRING(200),
            allowNull: true,
        },
        correoElectronico: {
            type: _dataTypes.STRING(200),
            allowNull: true,
        },
        contrasenia: {
            type: _dataTypes.STRING(100),
            allowNull: true,
        },
        // tipoUsuarioId: {
        //     type: _dataTypes.INTEGER,
        //     allowNull: true,
        // },
        rutaImagenPerfil: {
            type: _dataTypes.STRING(180),
            allowNull: true,
        },
        // FlagActivo: {
        //     type: _dataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: true
        // },
        // FlagEliminado: {
        //     type: _dataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // },
        // FechaCreacion: {
        //     type: _dataTypes.DATE,
        //     allowNull: false,
        // },
        // FechaModificacion: {
        //     type: _dataTypes.DATE,
        //     allowNull: true,
        // }
    };
    objEntidad = agregarCamposBase(objEntidad, _dataTypes);
    return objEntidad;
}

export default (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        'Usuario'
        , CreateFieldObj(DataTypes)
        , { /*options*/
            // timestamps: false,
            freezeTableName: true,
        });
    Usuario.associate = (models) => {
        // Usuario.belongsTo(models.TipoUsuario);
        Usuario.hasMany(models.TopItemLike, {
            foreignKey: "UsuarioId"
        });
    };

    return Usuario;
};
