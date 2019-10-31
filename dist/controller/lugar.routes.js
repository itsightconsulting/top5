"use strict";

var _lugar = _interopRequireDefault(require("../controller/lugar.controller"));

var _common = require("../controller/common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createdOrUpdatedLugar(_x, _x2) {
  return _createdOrUpdatedLugar.apply(this, arguments);
}

function _createdOrUpdatedLugar() {
  _createdOrUpdatedLugar = _asyncToGenerator(
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
            return _lugar["default"].createdOrUpdatedLugar(req.body.data);

          case 4:
            response = _context.sent;
            return _context.abrupt("return", res.status(200).send(response));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            (0, _common.controlError)("crearLugar", _context.t0);
            res.status(500).send((0, _common.buildContainer)(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _createdOrUpdatedLugar.apply(this, arguments);
}

function obtenerLugar(_x3, _x4) {
  return _obtenerLugar.apply(this, arguments);
}

function _obtenerLugar() {
  _obtenerLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, createdBy, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            (0, _common.existeJsonData)(req, res);
            id = req.params.id;
            createdBy = req.body.data.createdBy;
            _context2.next = 6;
            return _lugar["default"].obtenerLugar(id, createdBy);

          case 6:
            response = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(response));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            (0, _common.controlError)("obtenerLugar", _context2.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context2.t0.message, null, null));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _obtenerLugar.apply(this, arguments);
}

function listarLugares(_x5, _x6) {
  return _listarLugares.apply(this, arguments);
}

function _listarLugares() {
  _listarLugares = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _context3.next = 4;
            return _lugar["default"].listarLugares(req.body.data.createdBy);

          case 4:
            response = _context3.sent;
            return _context3.abrupt("return", res.status(200).send(response));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            (0, _common.controlError)("listarLugares", _context3.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context3.t0.message, null, null));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _listarLugares.apply(this, arguments);
}

function eliminarLugar(_x7, _x8) {
  return _eliminarLugar.apply(this, arguments);
}

function _eliminarLugar() {
  _eliminarLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body$data, id, modificadoPor, response;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            (0, _common.existeJsonData)(req, res); // const { id } = req.params;

            _req$body$data = req.body.data, id = _req$body$data.id, modificadoPor = _req$body$data.modificadoPor;
            _context4.next = 5;
            return _lugar["default"].eliminarLugar(id, modificadoPor);

          case 5:
            response = _context4.sent;
            return _context4.abrupt("return", res.status(200).send(response));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            (0, _common.controlError)("eliminarLugar", _context4.t0);
            res.status(500).send((0, _common.buildContainer)(false, 'Sucedio un error inesperado vuelva a intentar.', null, null));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return _eliminarLugar.apply(this, arguments);
}

module.exports = {
  createdOrUpdatedLugar: createdOrUpdatedLugar,
  obtenerLugar: obtenerLugar,
  listarLugares: listarLugares,
  eliminarLugar: eliminarLugar
};