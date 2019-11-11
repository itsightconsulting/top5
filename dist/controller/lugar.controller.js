"use strict";

var _index = _interopRequireDefault(require("../orm.database/models/index"));

var _utilitarios = _interopRequireDefault(require("../utilitarios/utilitarios"));

var _common = require("./common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var LugarDTO = _index["default"].Lugar;
var Op = _index["default"].Sequelize.Op;

function createdOrUpdatedLugar(_x) {
  return _createdOrUpdatedLugar.apply(this, arguments);
}

function _createdOrUpdatedLugar() {
  _createdOrUpdatedLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(objLugar) {
    var queryObject, dataValues, _ref;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            queryObject = {
              name: objLugar.name,
              latitude: objLugar.latitude,
              longitude: objLugar.longitude,
              address: objLugar.address,
              flagActive: true,
              flagEliminate: false,
              updatedAt: objLugar.updatedAt
            };

            if (!objLugar.id) {
              _context.next = 9;
              break;
            }

            queryObject.updatedBy = objLugar.createdBy;
            _context.next = 6;
            return LugarDTO.update(queryObject, {
              where: {
                id: objLugar.id
              }
            });

          case 6:
            dataValues = objLugar;
            _context.next = 15;
            break;

          case 9:
            queryObject.createdBy = objLugar.createdBy;
            queryObject.createdAt = objLugar.createdAt;
            _context.next = 13;
            return LugarDTO.create(queryObject, {
              fields: ['name', 'latitude', 'longitude', 'address', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
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
  return _createdOrUpdatedLugar.apply(this, arguments);
}

function obtenerLugar(_x2, _x3) {
  return _obtenerLugar.apply(this, arguments);
}

function _obtenerLugar() {
  _obtenerLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id, createdBy) {
    var conditionObject, _ref2, dataValues, response;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            conditionObject = {
              id: id
            };
            if (createdBy) conditionObject.createdBy = createdBy;
            _context2.next = 5;
            return LugarDTO.findOne({
              where: conditionObject,
              attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedAt', 'updatedAtStr']
            });

          case 5:
            _ref2 = _context2.sent;
            dataValues = _ref2.dataValues;
            response = (0, _common.buildContainer)(true, '', dataValues, null);
            return _context2.abrupt("return", response);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _obtenerLugar.apply(this, arguments);
}

function listarLugares(_x4) {
  return _listarLugares.apply(this, arguments);
}

function _listarLugares() {
  _listarLugares = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(createdBy) {
    var response, conditionObject, lugarBDList, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            response = null;
            conditionObject = {
              flagActive: true,
              flagEliminate: false,
              TopId: _defineProperty({}, Op.ne, null)
            };
            if (createdBy) conditionObject.createdBy = createdBy;
            _context3.next = 6;
            return LugarDTO.findAll({
              where: {
                flagActive: true
              },
              attributes: ['id', 'name', 'latitude', 'longitude', 'address', 'updatedAt', 'updatedAtStr', [_index["default"].Sequelize.fn("COUNT", _index["default"].Sequelize.col("TopItems.id")), "CountTop"]],
              include: [{
                model: _index["default"].TopItem,
                where: conditionObject,
                attributes: [],
                include: [{
                  model: _index["default"].Top,
                  where: {
                    flagActive: true,
                    flagPublicado: true
                  },
                  attributes: [],
                  required: true
                }]
              }],
              group: ['Lugar.id', 'Lugar.name', 'Lugar.latitude', 'Lugar.longitude', 'Lugar.address', 'Lugar.updatedAt'],
              order: [['updatedAt', 'DESC']]
            });

          case 6:
            lugarBDList = _context3.sent;
            data = {
              total: lugarBDList.length,
              datos: lugarBDList
            };
            response = (0, _common.buildContainer)(true, null, data, null);
            return _context3.abrupt("return", response);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _listarLugares.apply(this, arguments);
}

function eliminarLugar(_x5, _x6) {
  return _eliminarLugar.apply(this, arguments);
}

function _eliminarLugar() {
  _eliminarLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id, updatedAt) {
    var response, lugarBd;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            response = null;
            lugarBd = null;

            if (!id) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return lugarBd.update({
              flagActive: false,
              flagEliminate: true,
              updatedAt: updatedAt
            });

          case 6:
            response = (0, _common.buildContainer)(true, 'Eliminado correctamente.', null, null); // }

          case 7:
            if (!(response === null)) {
              _context4.next = 9;
              break;
            }

            throw new Error('No se pudo eliminar lugar');

          case 9:
            return _context4.abrupt("return", response);

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return _eliminarLugar.apply(this, arguments);
}

function obtenerLugarPorUbicacion(_x7, _x8) {
  return _obtenerLugarPorUbicacion.apply(this, arguments);
}

function _obtenerLugarPorUbicacion() {
  _obtenerLugarPorUbicacion = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(latitude, longitude) {
    var response, lugarBdListado, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            response = null;
            _context5.next = 4;
            return LugarDTO.findAll({
              where: {
                latitude: latitude,
                longitude: longitude,
                flagActive: true
              },
              order: [['updatedAt', 'DESC']]
            });

          case 4:
            lugarBdListado = _context5.sent;
            data = {
              total: lugarBdListado.length,
              datos: lugarBdListado
            };
            response = (0, _common.buildContainer)(true, null, data, null);
            return _context5.abrupt("return", response);

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return _obtenerLugarPorUbicacion.apply(this, arguments);
}

module.exports = {
  createdOrUpdatedLugar: createdOrUpdatedLugar,
  obtenerLugar: obtenerLugar,
  listarLugares: listarLugares,
  eliminarLugar: eliminarLugar,
  obtenerLugarPorUbicacion: obtenerLugarPorUbicacion
};