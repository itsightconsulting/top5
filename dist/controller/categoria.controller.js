"use strict";

var _index = _interopRequireDefault(require("../orm.database/models/index"));

var _common = require("./common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CategoriaDTO = _index["default"].Categoria;

function listarCategoria() {
  return _listarCategoria.apply(this, arguments);
}

function _listarCategoria() {
  _listarCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var response, categoriaBDList, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            response = null;
            _context.next = 4;
            return CategoriaDTO.findAll({
              where: {
                flagActive: true,
                flagEliminate: false
              },
              attributes: ['id', 'name', 'rutaImagenPrincipal'],
              order: [['nroOrden', 'ASC']]
            });

          case 4:
            categoriaBDList = _context.sent;
            data = {
              total: categoriaBDList.length,
              datos: categoriaBDList
            };
            response = (0, _common.buildContainer)(true, null, data, null);
            return _context.abrupt("return", response);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _listarCategoria.apply(this, arguments);
}

module.exports = {
  listarCategoria: listarCategoria
};