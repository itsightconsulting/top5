
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
}
module.exports = {
    database
}
// export const database = test;
