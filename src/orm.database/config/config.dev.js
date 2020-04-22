<<<<<<< HEAD
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
=======

const development = {
    username: "",
    password: "",
    database: "",
    host: "",
    port: "",
    dialect: "",
    logging: false
};

const test = {
    username: "",
    password: "",
    database: "",
    host: "",
    port: "",
    dialect: "",
    logging: false
};

const production = {
    username: "",
    password: "",
    database: "",
    host: "",
    port: "",
    dialect: "",
    logging: false
};

var database = development;
if (process.env.NODE_ENV == "test") {
    database = test;
} else if (process.env.NODE_ENV == "production") {
    database = production;
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
}
module.exports = {
    database
}
<<<<<<< HEAD
=======
// export const database = test;
>>>>>>> 9146d82c96a3be7f6058b84a736c299879787d42
