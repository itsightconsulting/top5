import Sequelize from 'sequelize';
import { sequelize } from '../database/database';


function FieldTableDeclare(_Sequelize) {
    let FIELD_TABLE = {
        UsuarioId: {
            type: _Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Identificador de la tabla usuario'
        },
        Nombres: {
            type: _Sequelize.STRING(200),
            allowNull: false,
        },
        Apellidos: {
            type: _Sequelize.STRING(200),
            allowNull: false,
        },
        CorreoElectronico: {
            type: _Sequelize.STRING(200),
            allowNull: false,
        },
        Username: {
            type: _Sequelize.STRING(60),
            allowNull: false,
        },
        Contrasenia: {
            type: _Sequelize.STRING(60),
            allowNull: false,
        },
        FlagActivo: {
            type: _Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        FlagEliminado: {
            type: _Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        FechaCreacion: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        FechaModificacion: {
            type: Sequelize.STRING(100),
            allowNull: true,
        }
    };
    return FIELD_TABLE;
}

const Usuario = sequelize.define('Usuario'
    , FieldTableDeclare(Sequelize)
    , { /*options*/
        timestamps: false
        , getterMethods: {
            fullName() {
                return this.Apellidos + ', ' + this.Nombres;
            }
        }
    });

export default Usuario;