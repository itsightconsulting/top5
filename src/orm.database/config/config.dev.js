const enviroment = {
    development: {
        username: "postgres",
        password: "postgresql",
        database: "top5_desa",
        host: "localhost",
        port: "5432",
        dialect: "postgres",
        logging: false
    },
    test: {
        username: "postgres",
        password: "postgreSql",
        database: "top5_qa",
        host: "dev.csq4bi7avmow.us-east-2.rds.amazonaws.com",
        port: "5432",
        dialect: "postgres",
        logging: false
    },
    production: {
        username: "postgres",
        password: "postgreSql",
        database: "top5_prod",
        host: "dev.csq4bi7avmow.us-east-2.rds.amazonaws.com",
        port: "5432",
        dialect: "postgres",
        logging: false
    }
}

var database = enviroment.development;
if (process.env.NODE_ENV == "test") {
    database = enviroment.test;
} else if (process.env.NODE_ENV == "production") {
    database = enviroment.production;
}
module.exports = {
    database
}
