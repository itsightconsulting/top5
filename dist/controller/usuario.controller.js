"use strict";

var _index = _interopRequireDefault(require("../orm.database/models/index"));

var _AuthService = _interopRequireDefault(require("../security/AuthService"));

var _utilitarios = _interopRequireDefault(require("../utilitarios/utilitarios"));

var _constants = require("../utilitarios/constants");

var _common = require("./common.controller");

var _parametro = require("../controller/parametro.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcrypt');

var saltRounds = 10;
var UsuarioDTO = _index["default"].Usuario;

function validarEmail(_x) {
  return _validarEmail.apply(this, arguments);
}

function _validarEmail() {
  _validarEmail = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(correoElectronico) {
    var usuario, estadoExiste;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return UsuarioDTO.findOne({
              where: {
                correoElectronico: correoElectronico.toLowerCase(),
                flagActive: true
              },
              attributes: ['correoElectronico']
            });

          case 3:
            usuario = _context.sent;
            estadoExiste = usuario != null;
            return _context.abrupt("return", (0, _common.buildContainer)(true, null, estadoExiste, null));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _validarEmail.apply(this, arguments);
}

function login(_x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(data) {
    var usuario, passwordIsValid, objToken, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return UsuarioDTO.findOne({
              where: {
                correoElectronico: data.correoElectronico.toLowerCase(),
                TipoUsuarioId: data.TipoUsuarioId
              },
              attributes: ['id', 'contrasenia', 'nombreCompleto', 'createdAt', 'rutaImagenPerfil']
            });

          case 3:
            usuario = _context2.sent;

            if (!(usuario === null)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", (0, _common.buildContainer)(false, 'Email no existe.', null, null));

          case 6:
            passwordIsValid = bcrypt.compareSync(data.contrasenia, usuario.contrasenia);

            if (passwordIsValid) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", (0, _common.buildContainer)(false, 'Contraseña incorrecto.', null, null));

          case 9:
            objToken = ObjectToken(usuario);
            _context2.next = 12;
            return _AuthService["default"].generateToken(objToken);

          case 12:
            token = _context2.sent;
            usuario.contrasenia = '';
            return _context2.abrupt("return", (0, _common.buildContainer)(true, '', usuario, token));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return _login.apply(this, arguments);
}

function ObjectToken(usuario) {
  return {
    email: usuario.correoElectronico,
    id: usuario.id
  };
}

function relogin(_x3) {
  return _relogin.apply(this, arguments);
}

function _relogin() {
  _relogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(data) {
    var usuario, objToken, token;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return UsuarioDTO.findOne({
              where: {
                correoElectronico: data.correoElectronico.toLowerCase(),
                TipoUsuarioId: data.TipoUsuarioId,
                id: data.id,
                // createdAt: data.createdAt,
                flagActive: true,
                flagEliminate: false
              },
              attributes: ['id', 'correoElectronico']
            });

          case 3:
            usuario = _context3.sent;
            objToken = ObjectToken({
              correoElectronico: usuario.correoElectronico,
              id: usuario.id
            });
            _context3.next = 7;
            return _AuthService["default"].generateToken(objToken);

          case 7:
            token = _context3.sent;
            return _context3.abrupt("return", (0, _common.buildContainer)(true, '', null, token));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return _relogin.apply(this, arguments);
}

function crearUsuario(_x4) {
  return _crearUsuario.apply(this, arguments);
}

function _crearUsuario() {
  _crearUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(data) {
    var nombreCompleto, correoElectronico, contrasenia, TipoUsuarioId, createdAt, updatedAt, salt, contraseniaEncrypt, newUsuario, objToken, token;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            nombreCompleto = data.nombreCompleto, correoElectronico = data.correoElectronico, contrasenia = data.contrasenia, TipoUsuarioId = data.TipoUsuarioId, createdAt = data.createdAt, updatedAt = data.updatedAt;
            _context4.next = 4;
            return bcrypt.genSalt(saltRounds);

          case 4:
            salt = _context4.sent;
            _context4.next = 7;
            return bcrypt.hash(contrasenia, salt);

          case 7:
            contraseniaEncrypt = _context4.sent;
            correoElectronico = correoElectronico.toLowerCase();
            _context4.next = 11;
            return UsuarioDTO.create({
              nombreCompleto: nombreCompleto,
              contrasenia: contraseniaEncrypt,
              correoElectronico: correoElectronico,
              TipoUsuarioId: TipoUsuarioId,
              flagActive: true,
              flagEliminate: false,
              createdAt: createdAt,
              updatedAt: updatedAt
            }, {
              fields: ['nombreCompleto', 'correoElectronico', 'contrasenia', 'TipoUsuarioId', 'flagActive', 'flagEliminate', 'createdAt', 'updatedAt']
            });

          case 11:
            newUsuario = _context4.sent;

            if (!newUsuario) {
              _context4.next = 20;
              break;
            }

            objToken = ObjectToken({
              correoElectronico: newUsuario.correoElectronico,
              id: newUsuario.id
            });
            _context4.next = 16;
            return _AuthService["default"].generateToken(objToken);

          case 16:
            token = _context4.sent;
            return _context4.abrupt("return", (0, _common.buildContainer)(true, 'Usuario creado correctamente.', null, token));

          case 20:
            throw new Error('No se pudo crear usuario');

          case 21:
            _context4.next = 26;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return _crearUsuario.apply(this, arguments);
}

function loginFacebook(_x5) {
  return _loginFacebook.apply(this, arguments);
}

function _loginFacebook() {
  _loginFacebook = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(data) {
    var nombreCompleto, correoElectronico, TipoUsuarioId, rutaImagenPerfil, createdAt, updatedAt, usuario, objToken, flagExisteTipoUsuario, flagUpdate, flagCambiarRuta, newUsuario, token;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            nombreCompleto = data.nombreCompleto, correoElectronico = data.correoElectronico, TipoUsuarioId = data.TipoUsuarioId, rutaImagenPerfil = data.rutaImagenPerfil, createdAt = data.createdAt, updatedAt = data.updatedAt;
            _context5.next = 4;
            return UsuarioDTO.findOne({
              where: {
                correoElectronico: correoElectronico,
                flagActive: true
              },
              attributes: ['correoElectronico', 'id', 'TipoUsuarioId', 'rutaImagenPerfil']
            });

          case 4:
            usuario = _context5.sent;
            // usuario = usuario || null;
            objToken = {};

            if (!(usuario != null)) {
              _context5.next = 23;
              break;
            }

            flagExisteTipoUsuario = TipoUsuarioId === usuario.TipoUsuarioId;

            if (!flagExisteTipoUsuario) {
              _context5.next = 20;
              break;
            }

            flagUpdate = usuario.nombreCompleto !== nombreCompleto;

            if (!flagUpdate) {
              _context5.next = 13;
              break;
            }

            _context5.next = 13;
            return UsuarioDTO.update({
              nombreCompleto: nombreCompleto,
              updatedAt: updatedAt
            }, {
              where: {
                id: usuario.id
              }
            });

          case 13:
            // updateRutaImagen
            flagCambiarRuta = usuario.rutaImagenPerfil !== rutaImagenPerfil;

            if (!flagCambiarRuta) {
              _context5.next = 17;
              break;
            }

            _context5.next = 17;
            return updaterutaImagenPerfil(usuario.id, rutaImagenPerfil);

          case 17:
            objToken = ObjectToken({
              correoElectronico: usuario.correoElectronico,
              id: usuario.id
            });
            _context5.next = 21;
            break;

          case 20:
            return _context5.abrupt("return", (0, _common.buildContainer)(false, 'Email ya se encuentra registrado', null, null));

          case 21:
            _context5.next = 29;
            break;

          case 23:
            correoElectronico = correoElectronico.toLower();
            _context5.next = 26;
            return UsuarioDTO.create({
              nombreCompleto: nombreCompleto,
              correoElectronico: correoElectronico,
              TipoUsuarioId: TipoUsuarioId,
              flagActive: true,
              flagEliminate: false,
              createdAt: createdAt,
              updatedAt: updatedAt,
              rutaImagenPerfil: rutaImagenPerfil
            }, {
              fields: ['nombreCompleto', 'correoElectronico', 'TipoUsuarioId', 'flagActive', 'flagEliminate', 'createdAt', 'updatedAt', 'rutaImagenPerfil']
            });

          case 26:
            newUsuario = _context5.sent;

            if (newUsuario) {
              objToken = ObjectToken({
                correoElectronico: newUsuario.correoElectronico,
                id: newUsuario.id
              });
            }

            usuario = newUsuario;

          case 29:
            if (objToken) {
              _context5.next = 31;
              break;
            }

            throw new Error('objToken no se ha creado correctamente');

          case 31:
            _context5.next = 33;
            return _AuthService["default"].generateToken(objToken);

          case 33:
            token = _context5.sent;
            return _context5.abrupt("return", (0, _common.buildContainer)(true, '', usuario, token));

          case 37:
            _context5.prev = 37;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 37]]);
  }));
  return _loginFacebook.apply(this, arguments);
}

function getOneUsuario(_x6) {
  return _getOneUsuario.apply(this, arguments);
}

function _getOneUsuario() {
  _getOneUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(id) {
    var usuario;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return UsuarioDTO.findOne({
              where: {
                id: id
              }
            });

          case 3:
            usuario = _context6.sent;
            usuario.contrasenia = '';
            return _context6.abrupt("return", (0, _common.buildContainer)(true, '', usuario, null));

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            console.log("getOneUsuario error: ", _context6.t0);
            res.status(500).send((0, _common.buildContainer)(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _getOneUsuario.apply(this, arguments);
}

function updateUsuario(_x7, _x8, _x9) {
  return _updateUsuario.apply(this, arguments);
}

function _updateUsuario() {
  _updateUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(data, path, files) {
    var id, correoElectronico, nombreCompleto, updatedAt;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = data.id, correoElectronico = data.correoElectronico, nombreCompleto = data.nombreCompleto, updatedAt = data.updatedAt; // if (!id || !correoElectronico || !nombreCompleto) {
            //     throw new Error("No puede enviar data vacio");
            // }
            // if (files) {
            //     console.log("files", files.length);
            //     await uploadFile(id, path, files);
            // }

            _context7.next = 4;
            return UsuarioDTO.update({
              nombreCompleto: nombreCompleto,
              correoElectronico: correoElectronico,
              updatedAt: updatedAt
            }, {
              where: {
                id: id
              }
            });

          case 4:
            return _context7.abrupt("return", (0, _common.buildContainer)(true, '', null, null));

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            throw _context7.t0;

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _updateUsuario.apply(this, arguments);
}

function getTerminoyCondiciones() {
  return _getTerminoyCondiciones.apply(this, arguments);
}

function _getTerminoyCondiciones() {
  _getTerminoyCondiciones = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var terminosyC, avisoPyP, data;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _parametro.obtenerParametro)(_constants.TERMINOS_Y_CONDICIONES);

          case 3:
            terminosyC = _context8.sent;
            _context8.next = 6;
            return (0, _parametro.obtenerParametro)(_constants.AVISO_POLITICA_Y_PRIVACIDAD);

          case 6:
            avisoPyP = _context8.sent;

            if (!(!terminosyC || !avisoPyP)) {
              _context8.next = 9;
              break;
            }

            throw new Error("par\xE1metro ".concat(_constants.TERMINOS_Y_CONDICIONES, " y/\xF3 ").concat(_constants.AVISO_POLITICA_Y_PRIVACIDAD, " no existen"));

          case 9:
            data = {
              terminosyC: terminosyC.value,
              avisoPyP: avisoPyP.value
            };
            return _context8.abrupt("return", (0, _common.buildContainer)(true, '', data, null));

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 13]]);
  }));
  return _getTerminoyCondiciones.apply(this, arguments);
}

function updaterutaImagenPerfil(_x10, _x11) {
  return _updaterutaImagenPerfil.apply(this, arguments);
}

function _updaterutaImagenPerfil() {
  _updaterutaImagenPerfil = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(id, ruta) {
    var usuario;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return UsuarioDTO.findOne({
              attributes: ['id', 'rutaImagenPerfil'],
              where: {
                id: id
              }
            });

          case 3:
            usuario = _context9.sent;

            if (!(usuario === null)) {
              _context9.next = 6;
              break;
            }

            throw new Error('Usuario no existe');

          case 6:
            _context9.next = 8;
            return usuario.update({
              rutaImagenPerfil: ruta
            });

          case 8:
            return _context9.abrupt("return", usuario);

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 11]]);
  }));
  return _updaterutaImagenPerfil.apply(this, arguments);
}

function uploadFile(_x12, _x13, _x14) {
  return _uploadFile.apply(this, arguments);
}

function _uploadFile() {
  _uploadFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(id, path, files) {
    var bucketName, rutaImagenPerfil, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, name, size, mimetype, key, _ref, Location;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            bucketName = "its-top5-bucket-client"; // let bucketName = "itsight-top5-bucket-user";

            if (!files) {
              _context10.next = 39;
              break;
            }

            console.log('files cant', files.length);
            rutaImagenPerfil = '';
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context10.prev = 8;
            _iterator = files[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context10.next = 24;
              break;
            }

            file = _step.value;
            name = file.name, size = file.size, mimetype = file.mimetype;
            key = "user/".concat(id, "/").concat(path, "/").concat(name);
            _context10.next = 16;
            return (0, _common.uploadToS3)(file, bucketName, key);

          case 16:
            _ref = _context10.sent;
            Location = _ref.Location;
            _context10.next = 20;
            return updaterutaImagenPerfil(id, Location);

          case 20:
            rutaImagenPerfil = _context10.sent;

          case 21:
            _iteratorNormalCompletion = true;
            _context10.next = 10;
            break;

          case 24:
            _context10.next = 30;
            break;

          case 26:
            _context10.prev = 26;
            _context10.t0 = _context10["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context10.t0;

          case 30:
            _context10.prev = 30;
            _context10.prev = 31;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 33:
            _context10.prev = 33;

            if (!_didIteratorError) {
              _context10.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context10.finish(33);

          case 37:
            return _context10.finish(30);

          case 38:
            return _context10.abrupt("return", (0, _common.buildContainer)(true, '', rutaImagenPerfil, null));

          case 39:
            _context10.next = 44;
            break;

          case 41:
            _context10.prev = 41;
            _context10.t1 = _context10["catch"](0);
            throw _context10.t1;

          case 44:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 41], [8, 26, 30, 38], [31,, 33, 37]]);
  }));
  return _uploadFile.apply(this, arguments);
}

function downloadFile(_x15, _x16) {
  return _downloadFile.apply(this, arguments);
}

function _downloadFile() {
  _downloadFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(id, filePath) {
    var bucketName, key, data;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            // let bucketName = "itsight-top5-bucket-user";
            bucketName = "its-top5-bucket-client";
            key = "user/".concat(id, "/").concat(filePath);
            console.log("key", key);
            _context11.next = 6;
            return (0, _common.downloadFromS3)(bucketName, key);

          case 6:
            data = _context11.sent;
            return _context11.abrupt("return", (0, _common.buildContainer)(true, 'Descarga de archivo concluido', data, null));

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            throw _context11.t0;

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return _downloadFile.apply(this, arguments);
}

module.exports = {
  login: login,
  crearUsuario: crearUsuario,
  getOneUsuario: getOneUsuario,
  validarEmail: validarEmail,
  loginFacebook: loginFacebook,
  uploadFile: uploadFile,
  downloadFile: downloadFile,
  updateUsuario: updateUsuario,
  getTerminoyCondiciones: getTerminoyCondiciones,
  relogin: relogin
};