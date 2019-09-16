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

const models = {
    Usuario: sequelize.import('../models/Usuario'),
    TipoUsuario: sequelize.import('../models/TipoUsuario')
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;