"use strict";

var _AuthService = _interopRequireDefault(require("../security/AuthService"));

var _usuario = _interopRequireDefault(require("../models/usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcrypt');

var saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, contrasenia, usuario;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, contrasenia = _req$body.contrasenia;
            _context.next = 4;
            return _usuario["default"].findOne({
              where: {
                username: username.toLowerCase()
              }
            });

          case 4:
            usuario = _context.sent;

            if (!(usuario == null)) {
              _context.next = 8;
              break;
            }

            res.send({
              ok: false,
              message: "Nombre de usuario incorrecto.",
              data: []
            });
            return _context.abrupt("return");

          case 8:
            bcrypt.compare(contrasenia, usuario.contrasenia, function (err, valid) {
              if (!valid) {
                return res.send({
                  ok: false,
                  message: 'Contraseña incorrecto.'
                });
              }

              var objToken = {
                username: usuario.Username,
                id: usuario.UsuarioId
              };

              var token = _AuthService["default"].generateToken(objToken);

              res.send({
                ok: true,
                data: user,
                token: token
              });
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Sucedio un error inesperado vuelva a intentar.',
              data: {}
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _login.apply(this, arguments);
}

function relogin(_x3, _x4) {
  return _relogin.apply(this, arguments);
}

function _relogin() {
  _relogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, id, objToken, newToken, rpta;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, username = _req$body2.username, id = _req$body2.id;
            objToken = {
              username: username,
              id: id
            };
            newToken = _AuthService["default"].generateToken(objToken);
            _context2.next = 6;
            return _usuario["default"].findOne({
              where: {
                usuarioId: id
              }
            });

          case 6:
            rpta = _context2.sent;
            if (rpta === null) res.send({
              ok: false,
              message: "No existe el usuario"
            });else res.send({
              ok: true,
              data: rpta,
              token: newToken
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Sucedio un error inesperado vuelva a intentar.',
              data: {}
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _relogin.apply(this, arguments);
}

function crearUsuario(_x5, _x6) {
  return _crearUsuario.apply(this, arguments);
}

function _crearUsuario() {
  _crearUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, NombreCompleto, CorreoElectronico, Username, Contrasenia, FlagActivo, FlagEliminado, FechaCreacion, salt, newUsuario;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // const { id, data, token } = req.body;
            // console.log(id, data, token);
            _req$body3 = req.body, NombreCompleto = _req$body3.NombreCompleto, CorreoElectronico = _req$body3.CorreoElectronico, Username = _req$body3.Username, Contrasenia = _req$body3.Contrasenia, FlagActivo = _req$body3.FlagActivo, FlagEliminado = _req$body3.FlagEliminado, FechaCreacion = _req$body3.FechaCreacion;
            _context3.prev = 1;
            _context3.next = 4;
            return bcrypt.genSalt(saltRounds);

          case 4:
            salt = _context3.sent;

            _readOnlyError("Contrasenia");

            _context3.next = 8;
            return bcrypt.hash(Contrasenia, salt);

          case 8:
            Contrasenia = _context3.sent;
            _context3.next = 11;
            return _usuario["default"].create({
              NombreCompleto: NombreCompleto,
              CorreoElectronico: CorreoElectronico,
              Username: Username,
              Contrasenia: Contrasenia,
              FlagActivo: FlagActivo,
              FlagEliminado: FlagEliminado,
              FechaCreacion: FechaCreacion
            }, {
              fields: ['NombreCompleto', 'CorreoElectronico', 'Username', 'Contrasenia', 'FlagActivo', 'FlagEliminado', 'FechaCreacion']
            });

          case 11:
            newUsuario = _context3.sent;

            if (!newUsuario) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", res.json({
              message: 'Usuario creado correctamente.',
              data: newUsuario
            }));

          case 14:
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.status(500).json({
              message: 'Sucedio un error inesperado vuelva a intentar.',
              data: {}
            });

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 16]]);
  }));
  return _crearUsuario.apply(this, arguments);
}

function getOneUsuario(_x7, _x8) {
  return _getOneUsuario.apply(this, arguments);
}

function _getOneUsuario() {
  _getOneUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, usuario;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _usuario["default"].findOne({
              where: {
                UsuarioId: id
              }
            });

          case 4:
            usuario = _context4.sent;
            res.status(200).json({
              data: usuario
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log("error: ", _context4.t0);
            res.status(500).json({
              message: 'Sucedio un error inesperado vuelva a intentar.',
              data: {}
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _getOneUsuario.apply(this, arguments);
}

function updateUsuario(_x9, _x10) {
  return _updateUsuario.apply(this, arguments);
}

function _updateUsuario() {
  _updateUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _req$body4, Nombres, Apellidos, CorreoElectronico, Username, Contrasenia, usuario, salt;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _req$body4 = req.body, Nombres = _req$body4.Nombres, Apellidos = _req$body4.Apellidos, CorreoElectronico = _req$body4.CorreoElectronico, Username = _req$body4.Username, Contrasenia = _req$body4.Contrasenia;
            _context5.next = 4;
            return _usuario["default"].findOne({
              attributter: ['Nombres', 'Apellidos', 'CorreoElectronico', 'Username', 'Contrasenia'],
              where: {
                UsuarioId: id
              }
            });

          case 4:
            usuario = _context5.sent;
            _context5.next = 7;
            return bcrypt.genSalt(saltRounds);

          case 7:
            salt = _context5.sent;

            _readOnlyError("Contrasenia");

            _context5.next = 11;
            return bcrypt.hash(Contrasenia, salt);

          case 11:
            Contrasenia = _context5.sent;

            if (!(usuario != null && usuario != undefined)) {
              _context5.next = 15;
              break;
            }

            _context5.next = 15;
            return usuario.update({
              Nombres: Nombres,
              Apellidos: Apellidos,
              CorreoElectronico: CorreoElectronico,
              Username: Username,
              Contrasenia: Contrasenia
            });

          case 15:
            return _context5.abrupt("return", res.json({
              message: 'Actualizado correctamente.',
              data: usuario
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateUsuario.apply(this, arguments);
}

module.exports = {
  login: login,
  relogin: relogin,
  crearUsuario: crearUsuario,
  getOneUsuario: getOneUsuario,
  updateUsuario: updateUsuario
};