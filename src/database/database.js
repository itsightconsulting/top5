import Sequelize from 'sequelize';
import { database } from './config';

const sequelize = new Sequelize(
    database.databaseName
    , database.user
    , database.password
    , {
        host: database.host,
        port: database.port,
        dialect: database.dialect,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false // mostrar en consola
    }
)

function AgregarCamposBase(_FIELD_TABLE) {

    _FIELD_TABLE.FlagActivo = {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    };
    _FIELD_TABLE.FlagEliminado = {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    };
    _FIELD_TABLE.CreadoPor = {
        type: Sequelize.STRING(100),
        allowNull: false,
    };
    _FIELD_TABLE.FechaCreacion = {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    };
    _FIELD_TABLE.ModificadoPor = {
        type: Sequelize.STRING(100),
        allowNull: true,
    };
    _FIELD_TABLE.FechaModificacion = {
        type: Sequelize.STRING(100),
        allowNull: true,
    };
    return _FIELD_TABLE;
}

const models = {
    Usuario: sequelize.import('../models/usuario'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;