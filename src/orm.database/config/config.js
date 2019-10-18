
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
    database: "top5_qa",
    host: "52.186.67.112",
    port: "5432",
    dialect: "postgres",
    logging: false
};

const production = {
    username: "postgres",
    password: "sql",
    database: "top5_qa",
    host: "52.186.67.112",
    port: "5432",
    dialect: "postgres",
    logging: false
};
export const database = production;
