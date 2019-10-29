
const development = {
    username: "postgres",
    password: "postgresql",
    database: "top5_desa",
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    logging: false
};

const test = {
    username: "postgres",
    password: "sql",
    database: "top5_desa",
    host: "52.186.67.112",
    port: "5432",
    dialect: "postgres",
    logging: false
};

const production = {
    username: "postgres",
    password: "postgreSql",
    database: "top5_prod",
    host: "database-top5.csq4bi7avmow.us-east-2.rds.amazonaws.com",
    port: "5432",
    dialect: "postgres",
    logging: false
};

var database = development;
if (process.env.NODE_ENV == "test") {
    database = test;
} else if (process.env.NODE_ENV == "production") {
    database = production;
}
export default database;
// export const database = test;
