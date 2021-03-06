"use strict";

var _categoria = _interopRequireDefault(require("../controller/categoria.controller"));

var _common = require("../controller/common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function listarCategoria(_x, _x2) {
  return _listarCategoria.apply(this, arguments);
}

function _listarCategoria() {
  _listarCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _categoria["default"].listarCategoria();

          case 3:
            response = _context.sent;
            return _context.abrupt("return", res.status(200).send(response));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            (0, _common.controlError)("listarCategoria", _context.t0);
            res.status(500).send((0, _common.buildContainer)(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _listarCategoria.apply(this, arguments);
}

module.exports = {
  listarCategoria: listarCategoria
};