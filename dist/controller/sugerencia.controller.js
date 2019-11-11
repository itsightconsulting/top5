"use strict";

var _index = _interopRequireDefault(require("../orm.database/models/index"));

var _common = require("./common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SugerenciaDTO = _index["default"].Sugerencia;

function createdOrUpdatedSugerencia(_x) {
  return _createdOrUpdatedSugerencia.apply(this, arguments);
}

function _createdOrUpdatedSugerencia() {
  _createdOrUpdatedSugerencia = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(objSugerencia) {
    var queryObject, dataValues, _ref;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            queryObject = {
              descripcion: objSugerencia.descripcion,
              flagActive: true,
              flagEliminate: false,
              updatedAt: objSugerencia.updatedAt
            };

            if (!objSugerencia.id) {
              _context.next = 9;
              break;
            }

            queryObject.updatedBy = objSugerencia.createdBy;
            _context.next = 6;
            return SugerenciaDTO.update(queryObject, {
              where: {
                id: objSugerencia.id
              }
            });

          case 6:
            dataValues = objSugerencia;
            _context.next = 15;
            break;

          case 9:
            queryObject.createdBy = objSugerencia.createdBy;
            queryObject.createdAt = objSugerencia.createdAt;
            _context.next = 13;
            return SugerenciaDTO.create(queryObject, {
              fields: ['descripcion', 'flagActive', 'flagEliminate', 'updatedAt', 'createdBy', 'createdAt']
            });

          case 13:
            _ref = _context.sent;
            dataValues = _ref.dataValues;

          case 15:
            return _context.abrupt("return", (0, _common.buildContainer)(true, '', dataValues, null));

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));
  return _createdOrUpdatedSugerencia.apply(this, arguments);
}

module.exports = {
  createdOrUpdatedSugerencia: createdOrUpdatedSugerencia
};