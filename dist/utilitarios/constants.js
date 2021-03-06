"use strict";

var ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
var SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
var aws_config_s3 = {
  ACCESS_KEY_ID: ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: SECRET_ACCESS_KEY
};
var SECRET_KEY_JWT = process.env.jwtsecret || "dev_s3cr3t";
var SECRET_KEY_ENCRYPT = process.env.cryptsecret || "dev_s3cr3t";
var TERMINOS_Y_CONDICIONES = "TERMINOS_Y_CONDICIONES";
var AVISO_POLITICA_Y_PRIVACIDAD = "AVISO_POLITICA_Y_PRIVACIDAD";
module.exports = {
  aws_config_s3: aws_config_s3,
  SECRET_KEY_JWT: SECRET_KEY_JWT,
  SECRET_KEY_ENCRYPT: SECRET_KEY_ENCRYPT,
  TERMINOS_Y_CONDICIONES: TERMINOS_Y_CONDICIONES,
  AVISO_POLITICA_Y_PRIVACIDAD: AVISO_POLITICA_Y_PRIVACIDAD
};