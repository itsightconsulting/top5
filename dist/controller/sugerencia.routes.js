"use strict";

var _sugerencia = _interopRequireDefault(require("../controller/sugerencia.controller"));

var _common = require("../controller/common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createdOrUpdatedSugerencia(_x, _x2) {
  return _createdOrUpdatedSugerencia.apply(this, arguments);
}

function _createdOrUpdatedSugerencia() {
  _createdOrUpdatedSugerencia = _asyncToGenerator(
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
            return _sugerencia["default"].createdOrUpdatedSugerencia(req.body.data);

          case 4:
            response = _context.sent;
            return _context.abrupt("return", res.status(200).send(response));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            (0, _common.controlError)("Crear sugerencia", _context.t0);
            res.status(500).send((0, _common.buildContainer)(false, 'Sucedio un error inesperado vuelva a intentar.', _context.t0, null));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _createdOrUpdatedSugerencia.apply(this, arguments);
}

module.exports = {
  createdOrUpdatedSugerencia: createdOrUpdatedSugerencia
};