"use strict";

var development = {
  username: "",
  password: "",
  database: "",
  host: "",
  port: "",
  dialect: "",
  logging: false
};
var test = {
  username: "",
  password: "",
  database: "",
  host: "",
  port: "",
  dialect: "",
  logging: false
};
var production = {
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
  database: database
}; // export const database = test;