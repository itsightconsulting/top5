"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _usuario = _interopRequireDefault(require("./routes/usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// exportar modulos
// importing routes
var app = (0, _express["default"])(); // configurar mirawares

app.use((0, _morgan["default"])('dev')); //

app.use((0, _express.json)()); // cuando el cliente envie un json el servidor pueda entender
// routes

app.use('/api/usuario', _usuario["default"]); // cada que visiten, colo quen prefijo, => api

var _default = app;
exports["default"] = _default;