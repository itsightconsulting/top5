"use strict";

var _usuario = _interopRequireDefault(require("../controller/usuario.controller"));

var _common = require("../controller/common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function crearUsuario(_x, _x2) {
  return _crearUsuario.apply(this, arguments);
}

function _crearUsuario() {
  _crearUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _context.next = 4;
            return _usuario["default"].crearUsuario(req.body.data);

          case 4:
            response = _context.sent;
            return _context.abrupt("return", res.status(200).send(response));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            (0, _common.controlError)("crearUsuario", _context.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context.t0.message, null, null));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _crearUsuario.apply(this, arguments);
}

function loginFacebook(_x3, _x4) {
  return _loginFacebook.apply(this, arguments);
}

function _loginFacebook() {
  _loginFacebook = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var response, statusCode;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _context2.next = 4;
            return _usuario["default"].loginFacebook(req.body.data);

          case 4:
            response = _context2.sent;
            statusCode = response.ok ? 200 : 401;
            res.status(statusCode).send(response);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            (0, _common.controlError)("loginFacebook", _context2.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context2.t0.message, null, null));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _loginFacebook.apply(this, arguments);
}

function login(_x5, _x6) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var data, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            (0, _common.existeJsonData)(req, res);
            data = req.body.data;
            _context3.next = 5;
            return _usuario["default"].login(data);

          case 5:
            response = _context3.sent;

            if (response.ok) {
              res.status(200).send(response);
            } else {
              res.status(401).send(response);
            }

            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            (0, _common.controlError)("login", _context3.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context3.t0.message, null, null));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _login.apply(this, arguments);
}

function relogin(_x7, _x8) {
  return _relogin.apply(this, arguments);
}

function _relogin() {
  _relogin = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var data, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            (0, _common.existeJsonData)(req, res);
            data = req.body.data;
            _context4.next = 5;
            return _usuario["default"].relogin(data);

          case 5:
            response = _context4.sent;

            if (response.ok) {
              res.status(200).send(response);
            } else {
              res.status(403).send(response);
            }

            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            (0, _common.controlError)("relogin", _context4.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context4.t0.message, null, null));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return _relogin.apply(this, arguments);
}

function validarEmail(_x9, _x10) {
  return _validarEmail.apply(this, arguments);
}

function _validarEmail() {
  _validarEmail = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body$data, correoElectronico, id, response;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            (0, _common.existeJsonData)(req, res); // let { data } = req.body;

            _req$body$data = req.body.data, correoElectronico = _req$body$data.correoElectronico, id = _req$body$data.id;
            _context5.next = 5;
            return _usuario["default"].validarEmail(correoElectronico, id);

          case 5:
            response = _context5.sent;
            res.status(200).send(response);
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            (0, _common.controlError)("validarEmail", _context5.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context5.t0.message, null, null));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return _validarEmail.apply(this, arguments);
}

function getOneUsuario(_x11, _x12) {
  return _getOneUsuario.apply(this, arguments);
}

function _getOneUsuario() {
  _getOneUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _usuario["default"].getOneUsuario(id);

          case 4:
            response = _context6.sent;
            res.send(response);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            (0, _common.controlError)("getOneUsuario", _context6.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context6.t0.message, null, null));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _getOneUsuario.apply(this, arguments);
}

function uploadFile(_x13, _x14) {
  return _uploadFile.apply(this, arguments);
}

function _uploadFile() {
  _uploadFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var files, _req$body, id, path, response;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            files = req.files.image;
            _req$body = req.body, id = _req$body.id, path = _req$body.path;
            files = [].concat(files);
            _context7.next = 6;
            return _usuario["default"].uploadFile(id, path, files);

          case 6:
            response = _context7.sent;
            res.status(200).send(response);
            _context7.next = 14;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            (0, _common.controlError)("uploadFile", _context7.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context7.t0.message, null, null));

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return _uploadFile.apply(this, arguments);
}

function updateUsuario(_x15, _x16) {
  return _updateUsuario.apply(this, arguments);
}

function _updateUsuario() {
  _updateUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var id, _req$body$data2, correoElectronico, nombreCompleto, response;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            (0, _common.existeJsonData)(req, res);
            _req$body$data2 = req.body.data, correoElectronico = _req$body$data2.correoElectronico, nombreCompleto = _req$body$data2.nombreCompleto; // let data = { id, correoElectronico: req.body.data.correoElectronico, nombreCompleto: req.body.data.nombreCompleto }
            // let files = [];
            // if (req.files) {
            //     files = [].concat(req.files.image);
            // }

            _context8.next = 6;
            return _usuario["default"].updateUsuario({
              id: id,
              correoElectronico: correoElectronico,
              nombreCompleto: nombreCompleto
            });

          case 6:
            response = _context8.sent;
            res.status(200).send(response);
            _context8.next = 14;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            (0, _common.controlError)("updateUsuario", _context8.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context8.t0.message, null, null));

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return _updateUsuario.apply(this, arguments);
}

function downloadFile(_x17, _x18) {
  return _downloadFile.apply(this, arguments);
}

function _downloadFile() {
  _downloadFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var id, filePath, response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            (0, _common.existeJsonData)(req, res);
            id = req.params.id;
            filePath = req.body.data.filePath;
            _context9.next = 6;
            return _usuario["default"].downloadFile(id, filePath);

          case 6:
            response = _context9.sent;
            res.status(200).send(response);
            _context9.next = 14;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            (0, _common.controlError)("downloadFile", _context9.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context9.t0.message, null, null));

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return _downloadFile.apply(this, arguments);
}

function getTerminoyCondiciones(_x19, _x20) {
  return _getTerminoyCondiciones.apply(this, arguments);
}

function _getTerminoyCondiciones() {
  _getTerminoyCondiciones = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _usuario["default"].getTerminoyCondiciones();

          case 3:
            response = _context10.sent;
            res.status(200).send(response);
            _context10.next = 11;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            (0, _common.controlError)("getTerminoyCondiciones", _context10.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context10.t0.message, null, null));

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return _getTerminoyCondiciones.apply(this, arguments);
}

module.exports = {
  crearUsuario: crearUsuario,
  loginFacebook: loginFacebook,
  login: login,
  relogin: relogin,
  validarEmail: validarEmail,
  getOneUsuario: getOneUsuario,
  uploadFile: uploadFile,
  downloadFile: downloadFile,
  updateUsuario: updateUsuario,
  getTerminoyCondiciones: getTerminoyCondiciones
};