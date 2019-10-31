"use strict";

var _index = _interopRequireDefault(require("../orm.database/models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ParametroDTO = _index["default"].Parametro;

function obtenerParametro(_x) {
  return _obtenerParametro.apply(this, arguments);
}

function _obtenerParametro() {
  _obtenerParametro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(codigo) {
    var parametro;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return ParametroDTO.findOne({
              where: {
                code: codigo,
                flagActive: true
              },
              attributes: ['value']
            });

          case 3:
            parametro = _context.sent;
            return _context.abrupt("return", parametro);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error("obtenerParametro(error) " + _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _obtenerParametro.apply(this, arguments);
}

module.exports = {
  obtenerParametro: obtenerParametro
};