"use strict";

var development = {
  username: "postgres",
  password: "postgresql",
  database: "top5_desa",
  host: "localhost",
  port: "5432",
  dialect: "postgres",
  logging: false
};
var test = {
  username: "postgres",
  password: "postgreSql",
  database: "top5_qa",
  host: "dev.csq4bi7avmow.us-east-2.rds.amazonaws.com",
  port: "5432",
  dialect: "postgres",
  logging: false
};
var production = {
  username: "postgres",
  password: "postgreSql",
  database: "top5_prod",
  host: "dev.csq4bi7avmow.us-east-2.rds.amazonaws.com",
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

module.exports = {
  database: database
}; // export const database = test;