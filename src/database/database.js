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
    Categoria: sequelize.import('./models/Categoria'),
    Lugar: sequelize.import('./models/Lugar'),
    Parametro: sequelize.import('./models/Parametro'),
    TipoUsuario: sequelize.import('./models/TipoUsuario'),
    Top: sequelize.import('./models/Top'),
    TopDetalle: sequelize.import('./models/TopDetalle'),
    Usuario: sequelize.import('./models/Usuario'),
    UsuarioSeguidor: sequelize.import('./models/UsuarioSeguidor'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;