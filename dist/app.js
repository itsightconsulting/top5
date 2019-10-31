"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

<<<<<<< HEAD
var _usuario = _interopRequireDefault(require("./routes/usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// exportar modulos
// importing routes
=======
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var fileUpload = require('express-fileupload'); // var express = require('express');


>>>>>>> 0d766ade1273b645a073fa0b0e856cfb9edd9a5a
var app = (0, _express["default"])(); // configurar mirawares

app.use((0, _morgan["default"])('dev')); //

app.use((0, _express.json)()); // cuando el cliente envie un json el servidor pueda entender
<<<<<<< HEAD
// routes

app.use('/api/usuario', _usuario["default"]); // cada que visiten, solo con prefijo, => api

=======

app.use(fileUpload({
  limits: {
    fileSize: 50 * 1024 * 1024
  }
})); // routes

app.use('/api/usuario', require('./routes/usuario')); // cada que visiten, solo con prefijo, => api

app.use('/api/categoria', require('./routes/categoria'));
app.use('/api/top', require('./routes/top'));
app.use('/api/lugares', require('./routes/lugares'));
>>>>>>> 0d766ade1273b645a073fa0b0e856cfb9edd9a5a
var _default = app;
exports["default"] = _default;