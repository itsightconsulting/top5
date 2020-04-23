"use strict";

var _index = _interopRequireDefault(require("../orm.database/models/index"));

var _utilitarios = _interopRequireDefault(require("../utilitarios/utilitarios"));

var _common = require("./common.controller");

var _lugar = require("./lugar.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var TopDTO = _index["default"].Top;
var TopItemDTO = _index["default"].TopItem;
var TopItemDetalleDTO = _index["default"].TopItemDetalle;
var TopItemLikeDTO = _index["default"].TopItemLike;
var Op = _index["default"].Sequelize.Op;
/* TOP */

function createOrUpdateTop(_x) {
  return _createOrUpdateTop.apply(this, arguments);
}

function _createOrUpdateTop() {
  _createOrUpdateTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(objTop) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            response = null;
            topBD = null; // console.log(objTop.updatedDate);

            if (!objTop.id) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return TopDTO.update({
              titulo: objTop.titulo,
              flagPublicado: objTop.flagPublicado,
              CategoriaId: objTop.CategoriaId,
              flagActive: true,
              flagEliminate: false,
              updatedBy: objTop.createdBy,
              updatedDate: objTop.updatedDate
            }, {
              where: {
                id: objTop.id
              }
            });

          case 6:
            topBD = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return TopDTO.create({
              titulo: objTop.titulo,
              CategoriaId: objTop.CategoriaId,
              flagActive: true,
              flagEliminate: false,
              createdBy: objTop.createdBy,
              createdDate: objTop.createdDate,
              updatedDate: objTop.updatedDate
            }, {
              fields: ['titulo', 'CategoriaId', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate']
            });

          case 11:
            topBD = _context.sent;

          case 12:
            if (topBD) {
              response = (0, _common.buildContainer)(true, '', topBD, null);
            }

            if (!(response === null)) {
              _context.next = 15;
              break;
            }

            throw new Error('No se pudo crear top');

          case 15:
            return _context.abrupt("return", response);

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
  return _createOrUpdateTop.apply(this, arguments);
}

function updateOrderItems(_x2) {
  return _updateOrderItems.apply(this, arguments);
}

function _updateOrderItems() {
  _updateOrderItems = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(objTop) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            response = null;
            topBD = null;

            if (!objTop.id) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return TopDTO.update({
              orderItems: objTop.orderItems,
              updatedBy: objTop.updatedBy,
              updatedDate: objTop.updatedDate
            }, {
              where: {
                id: objTop.id
              }
            });

          case 6:
            topBD = _context2.sent;

          case 7:
            if (topBD) {
              response = (0, _common.buildContainer)(true, '', topBD, null);
            }

            if (!(response === null)) {
              _context2.next = 10;
              break;
            }

            throw new Error('No se pudo actualizar el orden de items del top');

          case 10:
            return _context2.abrupt("return", response);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _updateOrderItems.apply(this, arguments);
}

function listarTopPorUsuario(_x3) {
  return _listarTopPorUsuario.apply(this, arguments);
}

function _listarTopPorUsuario() {
  _listarTopPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(objParams) {
    var response, topBD, createdBy, pageNumber, pageSize, CategoriaId, flagPublicado, whereConditions, queryObject, totalRows, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            response = null;
            topBD = null;
            createdBy = objParams.createdBy, pageNumber = objParams.pageNumber, pageSize = objParams.pageSize, CategoriaId = objParams.CategoriaId, flagPublicado = objParams.flagPublicado;
            whereConditions = {
              createdBy: createdBy,
              flagActive: true
            };

            if (flagPublicado) {
              whereConditions.flagPublicado = true; // whereConditions.createdBy = { [Op.notIn]: [createdBy] }
            }

            if (CategoriaId) whereConditions.CategoriaId = CategoriaId;
            queryObject = {
              where: whereConditions,
              attributes: ['id', 'titulo', 'CategoriaId', 'createdBy', 'updatedDate', 'updatedDateStr', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr', 'orderItems'],
              include: [{
                model: _index["default"].Categoria,
                as: 'Categoria',
                where: {
                  flagActive: true
                },
                attributes: ['name', 'nroOrden']
              }],
              order: [['fechaPublicado', 'DESC'], ['updatedDate', 'DESC']]
            };

            if (pageNumber && pageSize) {
              queryObject.offset = (pageNumber - 1) * pageSize;
              queryObject.limit = pageSize;
            }

            _context3.next = 11;
            return TopDTO.findAll(queryObject);

          case 11:
            topBD = _context3.sent;
            totalRows = topBD.length || 0;

            if (!totalRows) {
              _context3.next = 47;
              break;
            }

            if (!flagPublicado) {
              _context3.next = 44;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 18;
            _iterator = topBD[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 30;
              break;
            }

            element = _step.value;
            top = element.dataValues;
            _context3.next = 25;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 25:
            UsuarioBd = _context3.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 27:
            _iteratorNormalCompletion = true;
            _context3.next = 20;
            break;

          case 30:
            _context3.next = 36;
            break;

          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](18);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 36:
            _context3.prev = 36;
            _context3.prev = 37;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 39:
            _context3.prev = 39;

            if (!_didIteratorError) {
              _context3.next = 42;
              break;
            }

            throw _iteratorError;

          case 42:
            return _context3.finish(39);

          case 43:
            return _context3.finish(36);

          case 44:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topBD,
              totalRows: totalRows
            }, null);
            _context3.next = 48;
            break;

          case 47:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 48:
            return _context3.abrupt("return", response);

          case 51:
            _context3.prev = 51;
            _context3.t1 = _context3["catch"](0);
            throw _context3.t1;

          case 54:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 51], [18, 32, 36, 44], [37,, 39, 43]]);
  }));
  return _listarTopPorUsuario.apply(this, arguments);
}

function publicarTop(_x4, _x5, _x6, _x7) {
  return _publicarTop.apply(this, arguments);
}

function _publicarTop() {
  _publicarTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id, updatedDate, createdBy, flagPublicado) {
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            response = null;

            if (!id) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return TopDTO.update({
              flagPublicado: flagPublicado,
              fechaPublicado: updatedDate,
              updatedDate: updatedDate
            }, {
              where: {
                id: id,
                createdBy: createdBy
              }
            });

          case 5:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 6:
            if (!(response === null)) {
              _context4.next = 8;
              break;
            }

            throw new Error('No se pudo publicar top');

          case 8:
            return _context4.abrupt("return", response);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _publicarTop.apply(this, arguments);
}

function eliminarTop(_x8, _x9, _x10) {
  return _eliminarTop.apply(this, arguments);
}
/* TOP ITEM  */


function _eliminarTop() {
  _eliminarTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(id, updatedDate, createdBy) {
    var response, topBd;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            response = null;

            if (!id) {
              _context5.next = 7;
              break;
            }

            _context5.next = 5;
            return TopDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedDate: updatedDate,
              updatedBy: createdBy
            }, {
              where: {
                id: id,
                createdBy: createdBy
              }
            });

          case 5:
            topBd = _context5.sent;

            if (topBd) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

          case 7:
            if (!(response === null)) {
              _context5.next = 9;
              break;
            }

            throw new Error('No se pudo eliminar top');

          case 9:
            return _context5.abrupt("return", response);

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return _eliminarTop.apply(this, arguments);
}

function createOrUpdateTopItem(_x11) {
  return _createOrUpdateTopItem.apply(this, arguments);
}

function _createOrUpdateTopItem() {
  _createOrUpdateTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref) {
    var top, lugar, topItem, response, responseTop, responseLugar, responseTopItem;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            top = _ref.top, lugar = _ref.lugar, topItem = _ref.topItem;
            _context6.prev = 1;
            response = null; // await models.sequelize.transaction(async transact => {

            if (topItem.TopId) {
              _context6.next = 8;
              break;
            }

            _context6.next = 6;
            return createOrUpdateTop(top);

          case 6:
            responseTop = _context6.sent;
            topItem.TopId = responseTop.data.id;

          case 8:
            if (topItem.LugarId) {
              _context6.next = 13;
              break;
            }

            _context6.next = 11;
            return (0, _lugar.createdOrUpdatedLugar)(lugar);

          case 11:
            responseLugar = _context6.sent;
            topItem.LugarId = responseLugar.data.id;

          case 13:
            _context6.next = 15;
            return createdOrUpdatedTopItem(topItem);

          case 15:
            responseTopItem = _context6.sent;
            // registrar Detalle
            response = (0, _common.buildContainer)(true, '', responseTopItem.data, null); // });

            return _context6.abrupt("return", response);

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](1);
            throw _context6.t0;

          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 20]]);
  }));
  return _createOrUpdateTopItem.apply(this, arguments);
}

function listarTopPublicadoPorUsuario(_x12) {
  return _listarTopPublicadoPorUsuario.apply(this, arguments);
}

function _listarTopPublicadoPorUsuario() {
  _listarTopPublicadoPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(objParams) {
    var response, topItemBD, createdBy, pageNumber, pageSize, CategoriaId, flagPublicado, whereConditions, whereConditionsTop, whereConditionsCategoria, queryObject, totalRows, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            response = null;
            topItemBD = null;
            createdBy = objParams.createdBy, pageNumber = objParams.pageNumber, pageSize = objParams.pageSize, CategoriaId = objParams.CategoriaId, flagPublicado = objParams.flagPublicado;
            whereConditions = {
              flagActive: true
            };

            if (createdBy) {
              whereConditions.createdBy = createdBy;
            }

            whereConditionsTop = {
              flagActive: true,
              flagPublicado: true
            };
            whereConditionsCategoria = {
              flagActive: true
            };

            if (flagPublicado) {
              whereConditionsTop.flagPublicado = true; // whereConditionsTop.createdBy = { [Op.notIn]: [createdBy] }
            }

            if (CategoriaId) whereConditionsTop.CategoriaId = CategoriaId;
            queryObject = {
              where: whereConditions,
              attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedDate', 'updatedDateStr', 'nroOrder'],
              include: [{
                model: TopDTO,
                where: whereConditionsTop,
                attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedDate'],
                include: [{
                  required: true,
                  model: _index["default"].Categoria,
                  as: 'Categoria',
                  where: whereConditionsCategoria,
                  attributes: []
                }]
              }, {
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                where: {
                  flagActive: true
                }
              }, {
                model: _index["default"].Lugar,
                attributes: ['id', 'name', 'address', 'latitude', 'longitude']
              }, {
                required: false,
                where: {
                  flagActive: true
                },
                model: TopItemLikeDTO,
                attributes: ['id', 'UsuarioId']
              }],
              order: [['nroOrder', 'ASC']]
            }; // if (pageNumber && pageSize) {

            queryObject.offset = (pageNumber - 1) * pageSize;
            queryObject.limit = pageSize; // }

            _context7.next = 15;
            return TopItemDTO.findAll(queryObject);

          case 15:
            topItemBD = _context7.sent;
            totalRows = topItemBD.length || 0;

            if (!(totalRows && flagPublicado)) {
              _context7.next = 50;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context7.prev = 21;
            _iterator2 = topItemBD[Symbol.iterator]();

          case 23:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context7.next = 33;
              break;
            }

            element = _step2.value;
            top = element.dataValues;
            _context7.next = 28;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 28:
            UsuarioBd = _context7.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 30:
            _iteratorNormalCompletion2 = true;
            _context7.next = 23;
            break;

          case 33:
            _context7.next = 39;
            break;

          case 35:
            _context7.prev = 35;
            _context7.t0 = _context7["catch"](21);
            _didIteratorError2 = true;
            _iteratorError2 = _context7.t0;

          case 39:
            _context7.prev = 39;
            _context7.prev = 40;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 42:
            _context7.prev = 42;

            if (!_didIteratorError2) {
              _context7.next = 45;
              break;
            }

            throw _iteratorError2;

          case 45:
            return _context7.finish(42);

          case 46:
            return _context7.finish(39);

          case 47:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topItemBD,
              totalRows: totalRows
            }, null);
            _context7.next = 51;
            break;

          case 50:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 51:
            return _context7.abrupt("return", response);

          case 54:
            _context7.prev = 54;
            _context7.t1 = _context7["catch"](0);
            throw _context7.t1;

          case 57:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 54], [21, 35, 39, 47], [40,, 42, 46]]);
  }));
  return _listarTopPublicadoPorUsuario.apply(this, arguments);
}

function listarTopItemByTop(_x13) {
  return _listarTopItemByTop.apply(this, arguments);
}

function _listarTopItemByTop() {
  _listarTopItemByTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(objParams) {
    var response, topBD, TopId, createdBy, pageNumber, pageSize, flagPublicado, whereConditions, queryObject, totalRows, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            response = null;
            topBD = null;
            TopId = objParams.TopId, createdBy = objParams.createdBy, pageNumber = objParams.pageNumber, pageSize = objParams.pageSize, flagPublicado = objParams.flagPublicado;
            whereConditions = {
              flagActive: true
            };
            if (createdBy) whereConditions.createdBy = createdBy;
            if (TopId) whereConditions.TopId = TopId;
            queryObject = {
              where: whereConditions,
              attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedDate', 'updatedDateStr', 'LugarId', 'nroOrder'],
              include: [{
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                where: {
                  flagActive: true
                }
              }, {
                model: _index["default"].Lugar,
                attributes: ['id', 'name', 'address', 'latitude', 'longitude']
              }, {
                required: false,
                where: {
                  flagActive: true
                },
                model: TopItemLikeDTO,
                attributes: ['id', 'UsuarioId']
              }],
              order: [['nroOrder', 'ASC']]
            };

            if (pageNumber && pageSize) {
              queryObject.offset = (pageNumber - 1) * pageSize;
              queryObject.limit = pageSize;
            }

            _context8.next = 11;
            return TopItemDTO.findAll(queryObject);

          case 11:
            topBD = _context8.sent;
            totalRows = topBD.length || 0;

            if (!totalRows) {
              _context8.next = 47;
              break;
            }

            if (!flagPublicado) {
              _context8.next = 44;
              break;
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context8.prev = 18;
            _iterator3 = topBD[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context8.next = 30;
              break;
            }

            element = _step3.value;
            top = element.dataValues;
            _context8.next = 25;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 25:
            UsuarioBd = _context8.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 27:
            _iteratorNormalCompletion3 = true;
            _context8.next = 20;
            break;

          case 30:
            _context8.next = 36;
            break;

          case 32:
            _context8.prev = 32;
            _context8.t0 = _context8["catch"](18);
            _didIteratorError3 = true;
            _iteratorError3 = _context8.t0;

          case 36:
            _context8.prev = 36;
            _context8.prev = 37;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 39:
            _context8.prev = 39;

            if (!_didIteratorError3) {
              _context8.next = 42;
              break;
            }

            throw _iteratorError3;

          case 42:
            return _context8.finish(39);

          case 43:
            return _context8.finish(36);

          case 44:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topBD,
              totalRows: totalRows
            }, null);
            _context8.next = 48;
            break;

          case 47:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 48:
            return _context8.abrupt("return", response);

          case 51:
            _context8.prev = 51;
            _context8.t1 = _context8["catch"](0);
            throw _context8.t1;

          case 54:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 51], [18, 32, 36, 44], [37,, 39, 43]]);
  }));
  return _listarTopItemByTop.apply(this, arguments);
}

function listarTopItemByLugar(_x14, _x15) {
  return _listarTopItemByLugar.apply(this, arguments);
}

function _listarTopItemByLugar() {
  _listarTopItemByLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(lugarId, _ref2) {
    var pageNumber, pageSize, response, topItemBD, queryObject, totalRows, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, element, topItem, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            pageNumber = _ref2.pageNumber, pageSize = _ref2.pageSize;
            _context9.prev = 1;
            console.log("listarTopItemByLugar");
            response = null;
            topItemBD = null;
            queryObject = {
              where: {
                flagActive: true,
                LugarId: lugarId,
                TopId: _defineProperty({}, Op.ne, null)
              },
              attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedDate', 'updatedDateStr', 'flagActive'],
              include: [{
                model: TopDTO,
                attributes: [],
                where: {
                  flagActive: true,
                  flagPublicado: true
                },
                required: true,
                as: 'Top'
              }, {
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop', 'flagActive'],
                where: {
                  flagActive: true
                }
              }],
              order: [['updatedDate', 'DESC']]
            };

            if (pageNumber && pageSize) {
              queryObject.offset = (pageNumber - 1) * pageSize;
              queryObject.limit = pageSize;
            }

            _context9.next = 9;
            return TopItemDTO.findAll(queryObject);

          case 9:
            topItemBD = _context9.sent;
            totalRows = topItemBD.length || 0;

            if (!(totalRows > 0)) {
              _context9.next = 44;
              break;
            }

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context9.prev = 15;
            _iterator4 = topItemBD[Symbol.iterator]();

          case 17:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context9.next = 27;
              break;
            }

            element = _step4.value;
            topItem = element.dataValues;
            _context9.next = 22;
            return _index["default"].Usuario.findOne({
              where: {
                id: topItem.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 22:
            UsuarioBd = _context9.sent;

            if (UsuarioBd) {
              topItem.Usuarios = UsuarioBd.dataValues;
            }

          case 24:
            _iteratorNormalCompletion4 = true;
            _context9.next = 17;
            break;

          case 27:
            _context9.next = 33;
            break;

          case 29:
            _context9.prev = 29;
            _context9.t0 = _context9["catch"](15);
            _didIteratorError4 = true;
            _iteratorError4 = _context9.t0;

          case 33:
            _context9.prev = 33;
            _context9.prev = 34;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 36:
            _context9.prev = 36;

            if (!_didIteratorError4) {
              _context9.next = 39;
              break;
            }

            throw _iteratorError4;

          case 39:
            return _context9.finish(36);

          case 40:
            return _context9.finish(33);

          case 41:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topItemBD,
              totalRows: totalRows
            }, null);
            _context9.next = 45;
            break;

          case 44:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 45:
            return _context9.abrupt("return", response);

          case 48:
            _context9.prev = 48;
            _context9.t1 = _context9["catch"](1);
            throw _context9.t1;

          case 51:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 48], [15, 29, 33, 41], [34,, 36, 40]]);
  }));
  return _listarTopItemByLugar.apply(this, arguments);
}

function eliminarTopItem(_x16, _x17, _x18) {
  return _eliminarTopItem.apply(this, arguments);
}

function _eliminarTopItem() {
  _eliminarTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(id, updatedDate, createdBy) {
    var response, topBd, eliminarDetalle;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            response = null;

            if (!id) {
              _context10.next = 11;
              break;
            }

            _context10.next = 5;
            return TopItemDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedDate: updatedDate,
              updatedBy: createdBy
            }, {
              where: {
                id: id,
                createdBy: createdBy
              }
            });

          case 5:
            topBd = _context10.sent;

            if (!topBd) {
              _context10.next = 11;
              break;
            }

            _context10.next = 9;
            return eliminarTopDetallePorTopId(id);

          case 9:
            eliminarDetalle = _context10.sent;

            if (eliminarDetalle.ok) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

          case 11:
            if (!(response === null)) {
              _context10.next = 13;
              break;
            }

            throw new Error('No se pudo eliminar top item');

          case 13:
            return _context10.abrupt("return", response);

          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10["catch"](0);
            throw _context10.t0;

          case 19:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 16]]);
  }));
  return _eliminarTopItem.apply(this, arguments);
}

function likesTopItem() {
  return _likesTopItem.apply(this, arguments);
}
/* TOP ITEM DETALLE */


function _likesTopItem() {
  _likesTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var TopItemId,
        updatedDate,
        createdBy,
        flagLike,
        response,
        TopItemLikeBd,
        queryObject,
        newTopItemLikeBd,
        _args11 = arguments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            TopItemId = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : 0;
            updatedDate = _args11.length > 1 ? _args11[1] : undefined;
            createdBy = _args11.length > 2 ? _args11[2] : undefined;
            flagLike = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : false;
            _context11.prev = 4;
            response = null;

            if (!(TopItemId > 0)) {
              _context11.next = 21;
              break;
            }

            _context11.next = 9;
            return TopItemLikeDTO.findOne({
              where: {
                TopItemId: TopItemId,
                UsuarioId: createdBy
              },
              attributes: ['id', 'flagActive', 'flagEliminate']
            });

          case 9:
            TopItemLikeBd = _context11.sent;

            if (!TopItemLikeBd) {
              _context11.next = 17;
              break;
            }

            queryObject = {
              updatedDate: updatedDate
            };

            if (flagLike) {
              queryObject.flagActive = true;
              queryObject.flagEliminate = false;
            } else {
              queryObject.flagActive = false;
              queryObject.flagEliminate = true;
            }

            _context11.next = 15;
            return TopItemLikeDTO.update(queryObject, {
              where: {
                id: TopItemLikeBd.id
              }
            });

          case 15:
            _context11.next = 20;
            break;

          case 17:
            _context11.next = 19;
            return TopItemLikeDTO.create({
              flagActive: true,
              flagEliminate: false,
              TopItemId: TopItemId,
              UsuarioId: createdBy,
              createdDate: updatedDate,
              updatedDate: updatedDate
            }, {
              fields: ['flagActive', 'flagEliminate', 'TopItemId', 'UsuarioId', 'createdDate', 'updatedDate']
            });

          case 19:
            newTopItemLikeBd = _context11.sent;

          case 20:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 21:
            if (!(response === null)) {
              _context11.next = 23;
              break;
            }

            throw new Error('No se pudo actualizar top');

          case 23:
            return _context11.abrupt("return", response);

          case 26:
            _context11.prev = 26;
            _context11.t0 = _context11["catch"](4);
            throw _context11.t0;

          case 29:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[4, 26]]);
  }));
  return _likesTopItem.apply(this, arguments);
}

function uploadFileTopItemDetalle(_x19, _x20) {
  return _uploadFileTopItemDetalle.apply(this, arguments);
}

function _uploadFileTopItemDetalle() {
  _uploadFileTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(topItemDetalle, files) {
    var response, bucketName, id, path, _topItemDetalle$nameI, nameImageDefault, updatedDate, createdBy, TopItemId, response_1, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, file, name, size, mimetype, key, _ref4, Location, TopItemDetalle;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            response = null;
            bucketName = "its-top5-bucket-client";

            if (!files) {
              _context12.next = 44;
              break;
            }

            id = topItemDetalle.id, path = topItemDetalle.path, _topItemDetalle$nameI = topItemDetalle.nameImageDefault, nameImageDefault = _topItemDetalle$nameI === void 0 ? "" : _topItemDetalle$nameI, updatedDate = topItemDetalle.updatedDate, createdBy = topItemDetalle.createdBy;
            TopItemId = id; // eliminar imagenes anteriores

            _context12.next = 8;
            return eliminarTopItemDetalleByTopItem(TopItemId, updatedDate, createdBy);

          case 8:
            response_1 = _context12.sent;

            if (!response_1.ok) {
              _context12.next = 44;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context12.prev = 13;
            _iterator5 = files[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context12.next = 29;
              break;
            }

            file = _step5.value;
            name = file.name, size = file.size, mimetype = file.mimetype;
            key = "topItem/".concat(TopItemId, "/").concat(path, "/").concat(name);
            _context12.next = 21;
            return (0, _common.uploadToS3)(file, bucketName, key);

          case 21:
            _ref4 = _context12.sent;
            Location = _ref4.Location;
            TopItemDetalle = {
              rutaImagen: Location,
              flagImagenDefaultTop: false,
              updatedDate: updatedDate,
              createdBy: createdBy,
              createdDate: updatedDate,
              TopItemId: TopItemId
            };

            if (files.length === 1) {
              TopItemDetalle.flagImagenDefaultTop = true;
            } else if (nameImageDefault !== "") {
              TopItemDetalle.flagImagenDefaultTop = name == nameImageDefault;
            }

            createOrUpdateTopItemDetalle(TopItemDetalle);

          case 26:
            _iteratorNormalCompletion5 = true;
            _context12.next = 15;
            break;

          case 29:
            _context12.next = 35;
            break;

          case 31:
            _context12.prev = 31;
            _context12.t0 = _context12["catch"](13);
            _didIteratorError5 = true;
            _iteratorError5 = _context12.t0;

          case 35:
            _context12.prev = 35;
            _context12.prev = 36;

            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }

          case 38:
            _context12.prev = 38;

            if (!_didIteratorError5) {
              _context12.next = 41;
              break;
            }

            throw _iteratorError5;

          case 41:
            return _context12.finish(38);

          case 42:
            return _context12.finish(35);

          case 43:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 44:
            return _context12.abrupt("return", response);

          case 47:
            _context12.prev = 47;
            _context12.t1 = _context12["catch"](0);
            throw _context12.t1;

          case 50:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 47], [13, 31, 35, 43], [36,, 38, 42]]);
  }));
  return _uploadFileTopItemDetalle.apply(this, arguments);
}

function createOrUpdateTopItemDetalle(_x21) {
  return _createOrUpdateTopItemDetalle.apply(this, arguments);
}

function _createOrUpdateTopItemDetalle() {
  _createOrUpdateTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(TopItemDetalle) {
    var queryObject, dataValues, _ref5;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            queryObject = {
              rutaImagen: TopItemDetalle.rutaImagen,
              flagImagenDefaultTop: TopItemDetalle.flagImagenDefaultTop,
              flagActive: true,
              flagEliminate: false,
              updatedDate: TopItemDetalle.updatedDate
            };

            if (!TopItemDetalle.id) {
              _context13.next = 9;
              break;
            }

            queryObject.updatedBy = TopItemDetalle.createdBy;
            _context13.next = 6;
            return TopItemDetalleDTO.update(queryObject, {
              where: {
                id: TopItemDetalle.id
              }
            });

          case 6:
            dataValues = TopItemDetalle;
            _context13.next = 16;
            break;

          case 9:
            queryObject.createdBy = TopItemDetalle.createdBy;
            queryObject.createdDate = TopItemDetalle.createdDate;
            queryObject.TopItemId = TopItemDetalle.TopItemId;
            _context13.next = 14;
            return TopItemDetalleDTO.create(queryObject, {
              fields: ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate', 'TopItemId']
            });

          case 14:
            _ref5 = _context13.sent;
            dataValues = _ref5.dataValues;

          case 16:
            return _context13.abrupt("return", (0, _common.buildContainer)(true, '', dataValues, null));

          case 19:
            _context13.prev = 19;
            _context13.t0 = _context13["catch"](0);
            throw _context13.t0;

          case 22:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 19]]);
  }));
  return _createOrUpdateTopItemDetalle.apply(this, arguments);
}

function eliminarTopItemDetalleByTopItem(_x22, _x23, _x24) {
  return _eliminarTopItemDetalleByTopItem.apply(this, arguments);
}

function _eliminarTopItemDetalleByTopItem() {
  _eliminarTopItemDetalleByTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(TopItemId, updatedDate, createdBy) {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            response = null;

            if (!TopItemId) {
              _context14.next = 6;
              break;
            }

            _context14.next = 5;
            return TopItemDetalleDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedDate: updatedDate,
              updatedBy: createdBy
            }, {
              where: {
                TopItemId: TopItemId,
                flagActive: true
              }
            });

          case 5:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 6:
            if (!(response === null)) {
              _context14.next = 8;
              break;
            }

            throw new Error('No se pudo eliminar top detalle');

          case 8:
            return _context14.abrupt("return", response);

          case 11:
            _context14.prev = 11;
            _context14.t0 = _context14["catch"](0);
            throw _context14.t0;

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 11]]);
  }));
  return _eliminarTopItemDetalleByTopItem.apply(this, arguments);
}

function listarTopItemAutocomplete(_x25) {
  return _listarTopItemAutocomplete.apply(this, arguments);
}

function _listarTopItemAutocomplete() {
  _listarTopItemAutocomplete = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(objParams) {
    var response, topItemBD, pageNumber, pageSize, keyword, listTopItemBD, queryObject, totalRows, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            response = null;
            topItemBD = null;
            pageNumber = objParams.pageNumber, pageSize = objParams.pageSize, keyword = objParams.keyword;

            if (!(keyword != "")) {
              _context15.next = 57;
              break;
            }

            keyword = _utilitarios["default"].alwaysParseString(keyword);
            listTopItemBD = _index["default"].sequelize.query("SELECT \"TopItem\".\"id\"\n            FROM \"Top\"\n            INNER JOIN \"TopItem\" ON \"Top\".\"id\" = \"TopItem\".\"TopId\"\n            INNER JOIN \"Lugar\" ON \"TopItem\".\"LugarId\" = \"Lugar\".\"id\"\n            INNER JOIN \"Categoria\" ON \"Top\".\"CategoriaId\" = \"Categoria\".\"id\"\n            WHERE\n            \"Top\".\"flagPublicado\" = true\n\t\t\tAND \"Top\".\"flagActive\" = true\n            AND \"TopItem\".\"flagActive\" = true\n            AND \"Lugar\".\"flagActive\" = true\n            AND \"Categoria\".\"flagActive\" = true\n            AND \n            (\n                REPLACE_FILTRO_BUSCADOR(\"Top\".\"titulo\") LIKE :keyword\n                OR REPLACE_FILTRO_BUSCADOR(\"TopItem\".\"descripcion\") LIKE :keyword\n                OR REPLACE_FILTRO_BUSCADOR(\"Lugar\".\"name\") LIKE :keyword\n                OR REPLACE_FILTRO_BUSCADOR(\"Categoria\".\"name\") LIKE :keyword\n             )\n             GROUP BY \"TopItem\".\"id\"", {
              replacements: {
                keyword: "%".concat(keyword, "%")
              },
              type: _index["default"].sequelize.QueryTypes.SELECT
            });
            _context15.next = 9;
            return listTopItemBD.map(function (x) {
              return x.id;
            });

          case 9:
            listTopItemBD = _context15.sent;

            if (!(listTopItemBD.length > 0)) {
              _context15.next = 54;
              break;
            }

            // console.log(listTopItemBD);
            queryObject = {
              where: {
                flagActive: true,
                id: listTopItemBD
              },
              attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedDate', 'updatedDateStr', 'nroOrder'],
              include: [{
                model: TopDTO,
                where: {
                  flagActive: true,
                  flagPublicado: true
                },
                attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedDate'],
                include: [{
                  required: true,
                  model: _index["default"].Categoria,
                  as: 'Categoria',
                  where: {
                    flagActive: true
                  },
                  attributes: []
                }]
              }, {
                model: TopItemDetalleDTO,
                required: false,
                attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
                where: {
                  flagActive: true
                }
              }, {
                model: _index["default"].Lugar,
                attributes: ['id', 'name', 'address', 'latitude', 'longitude']
              }, {
                required: false,
                where: {
                  flagActive: true
                },
                model: TopItemLikeDTO,
                attributes: ['id', 'UsuarioId']
              }],
              order: [['nroOrder', 'ASC']]
            };
            queryObject.offset = (pageNumber - 1) * pageSize;
            queryObject.limit = pageSize; // console.log(queryObject);

            _context15.next = 16;
            return TopItemDTO.findAll(queryObject);

          case 16:
            topItemBD = _context15.sent;
            totalRows = topItemBD.length || 0;

            if (!totalRows) {
              _context15.next = 51;
              break;
            }

            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context15.prev = 22;
            _iterator6 = topItemBD[Symbol.iterator]();

          case 24:
            if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
              _context15.next = 34;
              break;
            }

            element = _step6.value;
            top = element.dataValues;
            _context15.next = 29;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 29:
            UsuarioBd = _context15.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 31:
            _iteratorNormalCompletion6 = true;
            _context15.next = 24;
            break;

          case 34:
            _context15.next = 40;
            break;

          case 36:
            _context15.prev = 36;
            _context15.t0 = _context15["catch"](22);
            _didIteratorError6 = true;
            _iteratorError6 = _context15.t0;

          case 40:
            _context15.prev = 40;
            _context15.prev = 41;

            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }

          case 43:
            _context15.prev = 43;

            if (!_didIteratorError6) {
              _context15.next = 46;
              break;
            }

            throw _iteratorError6;

          case 46:
            return _context15.finish(43);

          case 47:
            return _context15.finish(40);

          case 48:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topItemBD,
              totalRows: totalRows
            }, null);
            _context15.next = 52;
            break;

          case 51:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: 0
            }, null);

          case 52:
            _context15.next = 55;
            break;

          case 54:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: 0
            }, null);

          case 55:
            _context15.next = 58;
            break;

          case 57:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: 0
            }, null);

          case 58:
            return _context15.abrupt("return", response);

          case 61:
            _context15.prev = 61;
            _context15.t1 = _context15["catch"](0);
            throw _context15.t1;

          case 64:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 61], [22, 36, 40, 48], [41,, 43, 47]]);
  }));
  return _listarTopItemAutocomplete.apply(this, arguments);
}

function listarOptionsAutocomplete() {
  return _listarOptionsAutocomplete.apply(this, arguments);
}
/* OTROS */


function _listarOptionsAutocomplete() {
  _listarOptionsAutocomplete = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16() {
    var keyword,
        response,
        listTopBD,
        listTopItemBD,
        listLugarBD,
        listCategoriaBD,
        _args16 = arguments;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            keyword = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : "";
            _context16.prev = 1;
            response = null; // var obj = {
            //     order: [['descripcion', 'ASC']]
            // };

            if (!(keyword != "")) {
              _context16.next = 24;
              break;
            }

            keyword = _utilitarios["default"].alwaysParseString(keyword);
            listTopBD = _index["default"].sequelize.query("SELECT \"titulo\" FROM \"Top\" WHERE REPLACE_FILTRO_BUSCADOR(\"Top\".\"titulo\") LIKE :keyword", {
              replacements: {
                keyword: "%".concat(keyword, "%")
              },
              type: _index["default"].sequelize.QueryTypes.SELECT
            });
            listTopItemBD = _index["default"].sequelize.query("SELECT \"descripcion\" FROM \"TopItem\" WHERE REPLACE_FILTRO_BUSCADOR(\"TopItem\".\"descripcion\") LIKE :keyword", {
              replacements: {
                keyword: "%".concat(keyword, "%")
              },
              type: _index["default"].sequelize.QueryTypes.SELECT
            });
            listLugarBD = _index["default"].sequelize.query("SELECT \"name\" FROM \"Lugar\" WHERE REPLACE_FILTRO_BUSCADOR(\"Lugar\".\"name\") LIKE :keyword", {
              replacements: {
                keyword: "%".concat(keyword, "%")
              },
              type: _index["default"].sequelize.QueryTypes.SELECT
            });
            listCategoriaBD = _index["default"].sequelize.query("SELECT \"name\" FROM \"Categoria\" WHERE REPLACE_FILTRO_BUSCADOR(\"Categoria\".\"name\") LIKE :keyword", {
              replacements: {
                keyword: "%".concat(keyword, "%")
              },
              type: _index["default"].sequelize.QueryTypes.SELECT
            });
            _context16.next = 11;
            return listTopBD.map(function (x) {
              return x.titulo;
            });

          case 11:
            listTopBD = _context16.sent;
            _context16.next = 14;
            return listTopItemBD.map(function (x) {
              return x.descripcion;
            });

          case 14:
            listTopItemBD = _context16.sent;
            _context16.next = 17;
            return listLugarBD.map(function (x) {
              return x.name;
            });

          case 17:
            listLugarBD = _context16.sent;
            _context16.next = 20;
            return listCategoriaBD.map(function (x) {
              return x.name;
            });

          case 20:
            listCategoriaBD = _context16.sent;
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [].concat(listTopBD, listTopItemBD, listLugarBD, listCategoriaBD)
            }, null);
            _context16.next = 25;
            break;

          case 24:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: []
            }, null);

          case 25:
            return _context16.abrupt("return", response);

          case 28:
            _context16.prev = 28;
            _context16.t0 = _context16["catch"](1);
            throw _context16.t0;

          case 31:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[1, 28]]);
  }));
  return _listarOptionsAutocomplete.apply(this, arguments);
}

function getOneTop(_x26, _x27) {
  return _getOneTop.apply(this, arguments);
}

function _getOneTop() {
  _getOneTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17(id, createdBy) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            response = null;
            topBD = null;
            _context17.next = 5;
            return TopDTO.findOne({
              where: {
                id: id,
                createdBy: createdBy,
                flagActive: true
              },
              attributes: ['id', 'titulo', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr', 'updatedDate', 'updatedDateStr', 'orderItems'],
              include: [{
                model: _index["default"].Categoria,
                as: 'Categoria',
                where: {
                  flagActive: true
                },
                attributes: ['id', 'name', 'updatedDate']
              }],
              order: [['fechaPublicado', 'DESC'], ['updatedDate', 'DESC']]
            });

          case 5:
            topBD = _context17.sent;

            if (!topBD) {
              _context17.next = 10;
              break;
            }

            response = (0, _common.buildContainer)(true, '', topBD, null);
            _context17.next = 11;
            break;

          case 10:
            throw new Error("Top no existe");

          case 11:
            return _context17.abrupt("return", response);

          case 14:
            _context17.prev = 14;
            _context17.t0 = _context17["catch"](0);
            throw _context17.t0;

          case 17:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 14]]);
  }));
  return _getOneTop.apply(this, arguments);
}

function getOneTopItem(_x28, _x29) {
  return _getOneTopItem.apply(this, arguments);
}

function _getOneTopItem() {
  _getOneTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(id, createdBy) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            response = null;
            topBD = null;
            _context18.next = 5;
            return TopItemDTO.findOne({
              where: {
                id: id,
                createdBy: createdBy,
                flagActive: true
              },
              attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedDate', 'updatedDateStr'],
              include: [{
                model: TopItemDetalleDTO,
                where: {
                  flagActive: true
                },
                attributes: ['id', 'TopItemId', 'rutaImagen']
              }]
            });

          case 5:
            topBD = _context18.sent;

            if (!topBD) {
              _context18.next = 10;
              break;
            }

            response = (0, _common.buildContainer)(true, '', topBD, null);
            _context18.next = 11;
            break;

          case 10:
            throw new Error("Top item no existe");

          case 11:
            return _context18.abrupt("return", response);

          case 14:
            _context18.prev = 14;
            _context18.t0 = _context18["catch"](0);
            throw _context18.t0;

          case 17:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 14]]);
  }));
  return _getOneTopItem.apply(this, arguments);
}

function createdOrUpdatedTopItem(_x30) {
  return _createdOrUpdatedTopItem.apply(this, arguments);
}

function _createdOrUpdatedTopItem() {
  _createdOrUpdatedTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19(objTopItem) {
    var queryObject, dataValues, _ref6;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            queryObject = {
              descripcion: objTopItem.descripcion,
              valoracion: objTopItem.valoracion,
              LugarId: objTopItem.LugarId,
              TopId: objTopItem.TopId,
              flagActive: true,
              flagEliminate: false,
              updatedDate: objTopItem.updatedDate
            };

            if (!objTopItem.id) {
              _context19.next = 9;
              break;
            }

            queryObject.updatedBy = objTopItem.createdBy;
            _context19.next = 6;
            return TopItemDTO.update(queryObject, {
              where: {
                id: objTopItem.id
              }
            });

          case 6:
            dataValues = objTopItem;
            _context19.next = 15;
            break;

          case 9:
            queryObject.createdBy = objTopItem.createdBy;
            queryObject.createdDate = objTopItem.createdDate;
            _context19.next = 13;
            return TopItemDTO.create(queryObject, {
              fields: ['descripcion', 'valoracion', 'LugarId', 'TopId', 'flagActive', 'flagEliminate', 'updatedDate', 'createdBy', 'createdDate']
            });

          case 13:
            _ref6 = _context19.sent;
            dataValues = _ref6.dataValues;

          case 15:
            return _context19.abrupt("return", (0, _common.buildContainer)(true, '', dataValues, null));

          case 18:
            _context19.prev = 18;
            _context19.t0 = _context19["catch"](0);
            throw _context19.t0;

          case 21:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 18]]);
  }));
  return _createdOrUpdatedTopItem.apply(this, arguments);
}

function eliminatedAndcreateOrUpdateTopItemDetalle(_x31, _x32, _x33, _x34, _x35, _x36, _x37) {
  return _eliminatedAndcreateOrUpdateTopItemDetalle.apply(this, arguments);
}

function _eliminatedAndcreateOrUpdateTopItemDetalle() {
  _eliminatedAndcreateOrUpdateTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee20(TopId, createdBy, updatedDate, objListTopItemDetalle, files, idsEliminar, transact) {
    var response, responseEliminarTopItemDetalle, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, element, topItemDetalleBD, rutaImagen, id, queryObject, _queryObject;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            response = null;

            if (!objListTopItemDetalle) {
              _context20.next = 50;
              break;
            }

            _context20.next = 5;
            return eliminarTopItemDetalle(updatedDate, idsEliminar, transact);

          case 5:
            responseEliminarTopItemDetalle = _context20.sent;

            if (!responseEliminarTopItemDetalle.ok) {
              _context20.next = 50;
              break;
            }

            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context20.prev = 10;
            _iterator7 = objListTopItemDetalle[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context20.next = 36;
              break;
            }

            element = _step7.value;
            topItemDetalleBD = null; // const { name, size, mimetype } = file;
            // let key = `user/${id}/${path}/${name}`;
            // const { Location } = await uploadToS3(file, bucketName, key);

            rutaImagen = element.rutaImagen;
            id = objListTopItemDetalle.id || 0;

            if (!id) {
              _context20.next = 26;
              break;
            }

            queryObject = {
              rutaImagen: rutaImagen,
              flagImagenDefaultTop: element.flagImagenDefaultTop,
              flagActive: true,
              flagEliminate: false,
              updatedBy: createdBy,
              updatedDate: updatedDate
            };
            queryObject.where = {
              id: id,
              TopId: TopId
            };

            if (transact) {
              queryObject.transaction = transact;
            }

            _context20.next = 23;
            return TopItemDetalleDTO.update(queryObject);

          case 23:
            topItemDetalleBD = _context20.sent;
            _context20.next = 32;
            break;

          case 26:
            _queryObject = {
              rutaImagen: rutaImagen,
              flagImagenDefaultTop: element.flagImagenDefaultTop,
              TopId: TopId,
              flagActive: true,
              flagEliminate: false,
              createdBy: element.createdBy,
              createdDate: updatedDate,
              updatedDate: updatedDate
            };
            _queryObject.fields = ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdDate', 'updatedDate'];

            if (transact) {
              _queryObject.transaction = transact;
            }

            _context20.next = 31;
            return TopItemDetalleDTO.create(_queryObject);

          case 31:
            topItemDetalleBD = _context20.sent;

          case 32:
            if (topItemDetalleBD) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

          case 33:
            _iteratorNormalCompletion7 = true;
            _context20.next = 12;
            break;

          case 36:
            _context20.next = 42;
            break;

          case 38:
            _context20.prev = 38;
            _context20.t0 = _context20["catch"](10);
            _didIteratorError7 = true;
            _iteratorError7 = _context20.t0;

          case 42:
            _context20.prev = 42;
            _context20.prev = 43;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 45:
            _context20.prev = 45;

            if (!_didIteratorError7) {
              _context20.next = 48;
              break;
            }

            throw _iteratorError7;

          case 48:
            return _context20.finish(45);

          case 49:
            return _context20.finish(42);

          case 50:
            if (!(response === null)) {
              _context20.next = 52;
              break;
            }

            throw new Error('No se pudo crear top item');

          case 52:
            return _context20.abrupt("return", response);

          case 55:
            _context20.prev = 55;
            _context20.t1 = _context20["catch"](0);
            throw _context20.t1;

          case 58:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 55], [10, 38, 42, 50], [43,, 45, 49]]);
  }));
  return _eliminatedAndcreateOrUpdateTopItemDetalle.apply(this, arguments);
}

function eliminarTopItemDetalle(_x38, _x39, _x40) {
  return _eliminarTopItemDetalle.apply(this, arguments);
} // async function eliminarTopItem(id, updatedDate, createdBy) {
//     try {
//         let response = null;
//         let TopBd = null;
//         if (id) {
//             await TopBd.update({
//                 flagActive: false
//                 , flagEliminate: true
//                 , updatedDate
//             }, {
//                 where: {
//                     id, createdBy
//                 }
//             });
//             let eliminarDetalle = await eliminarTopDetallePorTopId(id);
//             if (eliminarDetalle.ok) {
//                 response = buildContainer(true, 'Eliminado correctamente.', null, null);
//             }
//         }
//         if (response === null) {
//             throw new Error('No se pudo eliminar top');
//         }
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }


function _eliminarTopItemDetalle() {
  _eliminarTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee21(updatedDate, idsEliminar, transact) {
    var response, queryObject, topItemDetalleBd;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            response = null;
            queryObject = {
              flagActive: false,
              flagEliminate: true,
              flagImagenDefaultTop: false,
              updatedDate: updatedDate
            };
            queryObject.where = {
              id: _defineProperty({}, Op["in"], [idsEliminar])
            };

            if (transact) {
              queryObject.transact = transact;
            }

            _context21.next = 7;
            return TopItemDetalleDTO.update(queryObject);

          case 7:
            topItemDetalleBd = _context21.sent;

            if (topItemDetalleBd) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

            if (!(response === null)) {
              _context21.next = 11;
              break;
            }

            throw new Error('No se pudo eliminar top item detalle');

          case 11:
            return _context21.abrupt("return", response);

          case 14:
            _context21.prev = 14;
            _context21.t0 = _context21["catch"](0);
            throw _context21.t0;

          case 17:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 14]]);
  }));
  return _eliminarTopItemDetalle.apply(this, arguments);
}

function obtenerTop(_x41) {
  return _obtenerTop.apply(this, arguments);
}

function _obtenerTop() {
  _obtenerTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee22(id) {
    var topBD;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            _context22.next = 3;
            return TopDTO.findOne({
              where: {
                id: id
              }
            });

          case 3:
            topBD = _context22.sent;
            return _context22.abrupt("return", topBD);

          case 7:
            _context22.prev = 7;
            _context22.t0 = _context22["catch"](0);
            throw _context22.t0;

          case 10:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[0, 7]]);
  }));
  return _obtenerTop.apply(this, arguments);
}

function listarTopItemPorUsuario(_x42, _x43) {
  return _listarTopItemPorUsuario.apply(this, arguments);
}

function _listarTopItemPorUsuario() {
  _listarTopItemPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee23(createdBy, cantidad) {
    var topBD, response;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            topBD = null;
            response = null; // if (cantidad) {
            // } else {

            _context23.next = 5;
            return TopDTO.findAll({
              where: {
                createdBy: createdBy,
                flagActive: true
              },
              include: [{
                model: TopItemDTO,
                where: {
                  flagActive: true
                },
                include: [{
                  model: TopItemDetalleDTO,
                  where: {
                    flagImagenDefaultTop: true
                  }
                }]
              }],
              order: [['updatedDate', 'DESC']]
            });

          case 5:
            topBD = _context23.sent;
            // }
            response = (0, _common.buildContainer)(true, '', topBD, null);
            return _context23.abrupt("return", response);

          case 10:
            _context23.prev = 10;
            _context23.t0 = _context23["catch"](0);
            throw _context23.t0;

          case 13:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, null, [[0, 10]]);
  }));
  return _listarTopItemPorUsuario.apply(this, arguments);
}

function obtenerTopItemDetalle(_x44) {
  return _obtenerTopItemDetalle.apply(this, arguments);
}

function _obtenerTopItemDetalle() {
  _obtenerTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee24(id) {
    var topItemDetalleBD;
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _context24.next = 3;
            return TopItemDetalleDTO.findOne({
              where: {
                id: id
              }
            });

          case 3:
            topItemDetalleBD = _context24.sent;
            return _context24.abrupt("return", topItemDetalleBD);

          case 7:
            _context24.prev = 7;
            _context24.t0 = _context24["catch"](0);
            throw _context24.t0;

          case 10:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, null, [[0, 7]]);
  }));
  return _obtenerTopItemDetalle.apply(this, arguments);
}

function listarTopGeneral(_x45, _x46) {
  return _listarTopGeneral.apply(this, arguments);
}

function _listarTopGeneral() {
  _listarTopGeneral = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee25(categoriaId, cantidad) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            response = null;
            topBD = null;

            if (!cantidad) {
              _context25.next = 9;
              break;
            }

            _context25.next = 6;
            return TopDTO.findAll({
              where: {
                categoriaId: categoriaId,
                flagActive: true
              },
              include: [{
                model: TopItemDTO,
                where: {
                  flagActive: true
                },
                include: [{
                  model: TopItemDetalleDTO,
                  where: {
                    flagImagenDefaultTop: true
                  }
                }]
              }]
            });

          case 6:
            topBD = _context25.sent;
            _context25.next = 12;
            break;

          case 9:
            _context25.next = 11;
            return TopDTO.findAll({
              where: {
                categoriaId: categoriaId,
                flagActive: true
              },
              include: [{
                model: TopItemDTO,
                where: {
                  flagActive: true
                },
                include: [{
                  model: TopItemDetalleDTO,
                  where: {
                    flagImagenDefaultTop: true
                  }
                }]
              }],
              order: [['updatedDate', 'DESC']]
            });

          case 11:
            topBD = _context25.sent;

          case 12:
            response = (0, _common.buildContainer)(true, '', topBD, null);
            return _context25.abrupt("return", response);

          case 16:
            _context25.prev = 16;
            _context25.t0 = _context25["catch"](0);
            throw _context25.t0;

          case 19:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, null, [[0, 16]]);
  }));
  return _listarTopGeneral.apply(this, arguments);
}

function listarTopByLugarByCategoria(_x47, _x48) {
  return _listarTopByLugarByCategoria.apply(this, arguments);
}

function _listarTopByLugarByCategoria() {
  _listarTopByLugarByCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee26(LugarId, categoriaId) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            response = null;
            topBD = null;
            _context26.next = 5;
            return TopDTO.findAll({
              where: {
                LugarId: LugarId,
                categoriaId: categoriaId,
                flagActive: true
              },
              attributes: ['id', 'LugarId', 'categoriaId', 'titulo', 'updatedDate'],
              include: [{
                model: TopItemDTO,
                where: {
                  flagActive: true
                },
                include: [{
                  model: TopItemDetalleDTO,
                  where: {
                    flagImagenDefaultTop: true
                  },
                  attributes: ['id', 'TopItemId', 'rutaImagen']
                }],
                attributes: ['id', 'descripcion', 'flagPublicado', 'valoracion']
              }],
              order: [['updatedDate', 'DESC']]
            });

          case 5:
            topBD = _context26.sent;
            response = (0, _common.buildContainer)(true, '', topBD, null);
            return _context26.abrupt("return", response);

          case 10:
            _context26.prev = 10;
            _context26.t0 = _context26["catch"](0);
            throw _context26.t0;

          case 13:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, null, [[0, 10]]);
  }));
  return _listarTopByLugarByCategoria.apply(this, arguments);
}

function listarTopPorUsuarioPorCategoria(_x49, _x50) {
  return _listarTopPorUsuarioPorCategoria.apply(this, arguments);
}

function _listarTopPorUsuarioPorCategoria() {
  _listarTopPorUsuarioPorCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee27(categoriaId, createdBy) {
    var response, topBDListado;
    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            response = null;
            _context27.next = 4;
            return TopDTO.findAll({
              where: {
                createdBy: createdBy,
                categoriaId: categoriaId,
                flagActive: true
              },
              order: [['updatedDate', 'DESC']]
            });

          case 4:
            topBDListado = _context27.sent;
            // TODO obtener foto default
            response = (0, _common.buildContainer)(true, '', topBDListado, null);
            return _context27.abrupt("return", response);

          case 9:
            _context27.prev = 9;
            _context27.t0 = _context27["catch"](0);
            throw _context27.t0;

          case 12:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, null, [[0, 9]]);
  }));
  return _listarTopPorUsuarioPorCategoria.apply(this, arguments);
}

function listarTopPorUsuarioPorFiltro(_x51, _x52) {
  return _listarTopPorUsuarioPorFiltro.apply(this, arguments);
}

function _listarTopPorUsuarioPorFiltro() {
  _listarTopPorUsuarioPorFiltro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee28(filtro, createdBy) {
    var response, topItemBDListado;
    return regeneratorRuntime.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
            response = null;
            _context28.next = 4;
            return TopItemDTO.findAll({
              where: _defineProperty({
                flagActive: true
              }, Op.or, [{
                Titulo: _defineProperty({}, Op.like, filtro)
              }]),
              include: [{
                model: TopItemDTO,
                where: _defineProperty({
                  flagActive: true,
                  createdBy: createdBy
                }, Op.or, [{
                  Descripcion: _defineProperty({}, Op.like, filtro)
                }])
              }],
              order: [['updatedDate', 'DESC']]
            });

          case 4:
            topItemBDListado = _context28.sent;
            // TODO obtener foto default
            response = (0, _common.buildContainer)(true, '', topItemBDListado, null);
            return _context28.abrupt("return", response);

          case 9:
            _context28.prev = 9;
            _context28.t0 = _context28["catch"](0);
            throw _context28.t0;

          case 12:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, null, [[0, 9]]);
  }));
  return _listarTopPorUsuarioPorFiltro.apply(this, arguments);
}

function listarTopDetallePorTopItem(_x53) {
  return _listarTopDetallePorTopItem.apply(this, arguments);
}

function _listarTopDetallePorTopItem() {
  _listarTopDetallePorTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee29(id) {
    var response, topItemDetalleBD;
    return regeneratorRuntime.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            response = null;
            _context29.next = 4;
            return TopItemDetalleDTO.findAll({
              where: {
                TopItemId: id,
                flagActive: true
              },
              order: [['updatedDate', 'DESC']]
            });

          case 4:
            topItemDetalleBD = _context29.sent;
            response = (0, _common.buildContainer)(true, '', topItemDetalleBD, null);
            return _context29.abrupt("return", response);

          case 9:
            _context29.prev = 9;
            _context29.t0 = _context29["catch"](0);
            throw _context29.t0;

          case 12:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, null, [[0, 9]]);
  }));
  return _listarTopDetallePorTopItem.apply(this, arguments);
}

function eliminarTopDetallePorTopId(_x54, _x55) {
  return _eliminarTopDetallePorTopId.apply(this, arguments);
}

function _eliminarTopDetallePorTopId() {
  _eliminarTopDetallePorTopId = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee30(id, updatedDate) {
    var response;
    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
            response = null;

            if (!id) {
              _context30.next = 6;
              break;
            }

            _context30.next = 5;
            return TopItemDetalleDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedDate: updatedDate
            }, {
              where: {
                TopItemId: id
              }
            });

          case 5:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 6:
            if (!(response === null)) {
              _context30.next = 8;
              break;
            }

            throw new Error('No se pudo eliminar top detalle');

          case 8:
            return _context30.abrupt("return", response);

          case 11:
            _context30.prev = 11;
            _context30.t0 = _context30["catch"](0);
            throw _context30.t0;

          case 14:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, null, [[0, 11]]);
  }));
  return _eliminarTopDetallePorTopId.apply(this, arguments);
}

function createOrUpdateTopItemIgnore(_x56) {
  return _createOrUpdateTopItemIgnore.apply(this, arguments);
}

function _createOrUpdateTopItemIgnore() {
  _createOrUpdateTopItemIgnore = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee31(_ref3) {
    var objLugar, objTopItem, objListTopItemDetalle, files, response, responseLugar, responseTopItem;
    return regeneratorRuntime.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            objLugar = _ref3.objLugar, objTopItem = _ref3.objTopItem, objListTopItemDetalle = _ref3.objListTopItemDetalle, files = _ref3.files;
            _context31.prev = 1;
            response = null; // await models.sequelize.transaction(async transact => {

            if (!objLugar) {
              _context31.next = 8;
              break;
            }

            _context31.next = 6;
            return (0, _lugar.createdOrUpdatedLugar)(objLugar);

          case 6:
            responseLugar = _context31.sent;
            objTopItem.LugarId = responseLugar.data.id;

          case 8:
            _context31.next = 10;
            return createdOrUpdatedTopItem(objTopItem);

          case 10:
            responseTopItem = _context31.sent;
            // registrar Detalle
            response = (0, _common.buildContainer)(true, '', responseTopItem.data, null); // });

            return _context31.abrupt("return", response);

          case 15:
            _context31.prev = 15;
            _context31.t0 = _context31["catch"](1);
            throw _context31.t0;

          case 18:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, null, [[1, 15]]);
  }));
  return _createOrUpdateTopItemIgnore.apply(this, arguments);
}

module.exports = {
  createOrUpdateTop: createOrUpdateTop,
  updateOrderItems: updateOrderItems,
  listarTopPorUsuario: listarTopPorUsuario,
  listarTopDetallePorTopItem: listarTopDetallePorTopItem,
  eliminarTop: eliminarTop,
  listarTopItemByLugar: listarTopItemByLugar,
  listarTopItemByTop: listarTopItemByTop,
  createOrUpdateTopItem: createOrUpdateTopItem,
  createOrUpdateTopItemDetalle: createOrUpdateTopItemDetalle,
  eliminarTopItem: eliminarTopItem,
  uploadFileTopItemDetalle: uploadFileTopItemDetalle,
  listarTopItemAutocomplete: listarTopItemAutocomplete,
  likesTopItem: likesTopItem,
  listarTopPorUsuarioPorCategoria: listarTopPorUsuarioPorCategoria,
  listarTopPorUsuarioPorFiltro: listarTopPorUsuarioPorFiltro,
  listarTopGeneral: listarTopGeneral,
  publicarTop: publicarTop,
  getOneTop: getOneTop,
  getOneTopItem: getOneTopItem,
  listarTopByLugarByCategoria: listarTopByLugarByCategoria,
  listarTopPublicadoPorUsuario: listarTopPublicadoPorUsuario,
  listarOptionsAutocomplete: listarOptionsAutocomplete
};