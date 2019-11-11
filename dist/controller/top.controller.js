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
            topBD = null;
            console.log(objTop.updatedAt);

            if (!objTop.id) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return TopDTO.update({
              titulo: objTop.titulo,
              flagPublicado: objTop.flagPublicado,
              CategoriaId: objTop.CategoriaId,
              flagActive: true,
              flagEliminate: false,
              updatedBy: objTop.createdBy,
              updatedAt: objTop.updatedAt
            }, {
              where: {
                id: objTop.id
              }
            });

          case 7:
            topBD = _context.sent;
            _context.next = 13;
            break;

          case 10:
            _context.next = 12;
            return TopDTO.create({
              titulo: objTop.titulo,
              CategoriaId: objTop.CategoriaId,
              flagActive: true,
              flagEliminate: false,
              createdBy: objTop.createdBy,
              createdAt: objTop.createdAt,
              updatedAt: objTop.updatedAt
            }, {
              fields: ['titulo', 'CategoriaId', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt']
            });

          case 12:
            topBD = _context.sent;

          case 13:
            if (topBD) {
              response = (0, _common.buildContainer)(true, '', topBD, null);
            }

            if (!(response === null)) {
              _context.next = 16;
              break;
            }

            throw new Error('No se pudo crear top');

          case 16:
            return _context.abrupt("return", response);

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));
  return _createOrUpdateTop.apply(this, arguments);
}

function listarTopPorUsuario(_x2) {
  return _listarTopPorUsuario.apply(this, arguments);
}

function _listarTopPorUsuario() {
  _listarTopPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(objParams) {
    var response, topBD, createdBy, pageNumber, pageSize, CategoriaId, flagPublicado, whereConditions, queryObject, totalRows, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
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
              attributes: ['id', 'titulo', 'CategoriaId', 'createdBy', 'updatedAt', 'updatedAtStr', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr'],
              include: [{
                model: _index["default"].Categoria,
                as: 'Categoria',
                where: {
                  flagActive: true
                },
                attributes: ['name', 'rutaImagenPrincipal']
              }],
              order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
            };

            if (pageNumber && pageSize) {
              queryObject.offset = (pageNumber - 1) * pageSize;
              queryObject.limit = pageSize;
            }

            _context2.next = 11;
            return TopDTO.findAll(queryObject);

          case 11:
            topBD = _context2.sent;
            totalRows = topBD.length || 0;

            if (!totalRows) {
              _context2.next = 47;
              break;
            }

            if (!flagPublicado) {
              _context2.next = 44;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 18;
            _iterator = topBD[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 30;
              break;
            }

            element = _step.value;
            top = element.dataValues;
            _context2.next = 25;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 25:
            UsuarioBd = _context2.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 27:
            _iteratorNormalCompletion = true;
            _context2.next = 20;
            break;

          case 30:
            _context2.next = 36;
            break;

          case 32:
            _context2.prev = 32;
            _context2.t0 = _context2["catch"](18);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 36:
            _context2.prev = 36;
            _context2.prev = 37;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 39:
            _context2.prev = 39;

            if (!_didIteratorError) {
              _context2.next = 42;
              break;
            }

            throw _iteratorError;

          case 42:
            return _context2.finish(39);

          case 43:
            return _context2.finish(36);

          case 44:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topBD,
              totalRows: totalRows
            }, null);
            _context2.next = 48;
            break;

          case 47:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 48:
            return _context2.abrupt("return", response);

          case 51:
            _context2.prev = 51;
            _context2.t1 = _context2["catch"](0);
            throw _context2.t1;

          case 54:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 51], [18, 32, 36, 44], [37,, 39, 43]]);
  }));
  return _listarTopPorUsuario.apply(this, arguments);
}

function publicarTop(_x3, _x4, _x5, _x6) {
  return _publicarTop.apply(this, arguments);
}

function _publicarTop() {
  _publicarTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id, updatedAt, createdBy, flagPublicado) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            response = null;

            if (!id) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return TopDTO.update({
              flagPublicado: flagPublicado,
              fechaPublicado: updatedAt,
              updatedAt: updatedAt
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
              _context3.next = 8;
              break;
            }

            throw new Error('No se pudo publicar top');

          case 8:
            return _context3.abrupt("return", response);

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
  return _publicarTop.apply(this, arguments);
}

function eliminarTop(_x7, _x8, _x9) {
  return _eliminarTop.apply(this, arguments);
}
/* TOP ITEM  */


function _eliminarTop() {
  _eliminarTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id, updatedAt, createdBy) {
    var response, topBd;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            response = null;

            if (!id) {
              _context4.next = 7;
              break;
            }

            _context4.next = 5;
            return TopDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedAt: updatedAt,
              updatedBy: createdBy
            }, {
              where: {
                id: id,
                createdBy: createdBy
              }
            });

          case 5:
            topBd = _context4.sent;

            if (topBd) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

          case 7:
            if (!(response === null)) {
              _context4.next = 9;
              break;
            }

            throw new Error('No se pudo eliminar top');

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
  return _eliminarTop.apply(this, arguments);
}

function createOrUpdateTopItem(_x10) {
  return _createOrUpdateTopItem.apply(this, arguments);
}

function _createOrUpdateTopItem() {
  _createOrUpdateTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref) {
    var top, lugar, topItem, response, responseTop, responseLugar, responseTopItem;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            top = _ref.top, lugar = _ref.lugar, topItem = _ref.topItem;
            _context5.prev = 1;
            response = null; // await models.sequelize.transaction(async transact => {

            if (topItem.TopId) {
              _context5.next = 8;
              break;
            }

            _context5.next = 6;
            return createOrUpdateTop(top);

          case 6:
            responseTop = _context5.sent;
            topItem.TopId = responseTop.data.id;

          case 8:
            if (topItem.LugarId) {
              _context5.next = 13;
              break;
            }

            _context5.next = 11;
            return (0, _lugar.createdOrUpdatedLugar)(lugar);

          case 11:
            responseLugar = _context5.sent;
            topItem.LugarId = responseLugar.data.id;

          case 13:
            _context5.next = 15;
            return createdOrUpdatedTopItem(topItem);

          case 15:
            responseTopItem = _context5.sent;
            // registrar Detalle
            response = (0, _common.buildContainer)(true, '', responseTopItem.data, null); // });

            return _context5.abrupt("return", response);

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](1);
            throw _context5.t0;

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 20]]);
  }));
  return _createOrUpdateTopItem.apply(this, arguments);
}

function listarTopPublicadoPorUsuario(_x11) {
  return _listarTopPublicadoPorUsuario.apply(this, arguments);
}

function _listarTopPublicadoPorUsuario() {
  _listarTopPublicadoPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(objParams) {
    var response, topItemBD, createdBy, pageNumber, pageSize, CategoriaId, flagPublicado, whereConditions, whereConditionsTop, whereConditionsCategoria, queryObject, totalRows, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
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
              attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr'],
              include: [{
                model: TopDTO,
                where: whereConditionsTop,
                attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedAt'],
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
              order: [['updatedAt', 'DESC']]
            }; // if (pageNumber && pageSize) {

            queryObject.offset = (pageNumber - 1) * pageSize;
            queryObject.limit = pageSize; // }

            _context6.next = 15;
            return TopItemDTO.findAll(queryObject);

          case 15:
            topItemBD = _context6.sent;
            totalRows = topItemBD.length || 0;

            if (!(totalRows && flagPublicado)) {
              _context6.next = 50;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context6.prev = 21;
            _iterator2 = topItemBD[Symbol.iterator]();

          case 23:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context6.next = 33;
              break;
            }

            element = _step2.value;
            top = element.dataValues;
            _context6.next = 28;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 28:
            UsuarioBd = _context6.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 30:
            _iteratorNormalCompletion2 = true;
            _context6.next = 23;
            break;

          case 33:
            _context6.next = 39;
            break;

          case 35:
            _context6.prev = 35;
            _context6.t0 = _context6["catch"](21);
            _didIteratorError2 = true;
            _iteratorError2 = _context6.t0;

          case 39:
            _context6.prev = 39;
            _context6.prev = 40;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 42:
            _context6.prev = 42;

            if (!_didIteratorError2) {
              _context6.next = 45;
              break;
            }

            throw _iteratorError2;

          case 45:
            return _context6.finish(42);

          case 46:
            return _context6.finish(39);

          case 47:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topItemBD,
              totalRows: totalRows
            }, null);
            _context6.next = 51;
            break;

          case 50:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 51:
            return _context6.abrupt("return", response);

          case 54:
            _context6.prev = 54;
            _context6.t1 = _context6["catch"](0);
            throw _context6.t1;

          case 57:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 54], [21, 35, 39, 47], [40,, 42, 46]]);
  }));
  return _listarTopPublicadoPorUsuario.apply(this, arguments);
}

function listarTopItemByTop(_x12) {
  return _listarTopItemByTop.apply(this, arguments);
}

function _listarTopItemByTop() {
  _listarTopItemByTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(objParams) {
    var response, topBD, TopId, createdBy, pageNumber, pageSize, flagPublicado, whereConditions, queryObject, totalRows, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
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
              attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedAt', 'updatedAtStr', 'LugarId'],
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
              }],
              order: [['updatedAt', 'DESC']]
            };

            if (pageNumber && pageSize) {
              queryObject.offset = (pageNumber - 1) * pageSize;
              queryObject.limit = pageSize;
            }

            _context7.next = 11;
            return TopItemDTO.findAll(queryObject);

          case 11:
            topBD = _context7.sent;
            totalRows = topBD.length || 0;

            if (!totalRows) {
              _context7.next = 47;
              break;
            }

            if (!flagPublicado) {
              _context7.next = 44;
              break;
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context7.prev = 18;
            _iterator3 = topBD[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context7.next = 30;
              break;
            }

            element = _step3.value;
            top = element.dataValues;
            _context7.next = 25;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 25:
            UsuarioBd = _context7.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 27:
            _iteratorNormalCompletion3 = true;
            _context7.next = 20;
            break;

          case 30:
            _context7.next = 36;
            break;

          case 32:
            _context7.prev = 32;
            _context7.t0 = _context7["catch"](18);
            _didIteratorError3 = true;
            _iteratorError3 = _context7.t0;

          case 36:
            _context7.prev = 36;
            _context7.prev = 37;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 39:
            _context7.prev = 39;

            if (!_didIteratorError3) {
              _context7.next = 42;
              break;
            }

            throw _iteratorError3;

          case 42:
            return _context7.finish(39);

          case 43:
            return _context7.finish(36);

          case 44:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topBD,
              totalRows: totalRows
            }, null);
            _context7.next = 48;
            break;

          case 47:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 48:
            return _context7.abrupt("return", response);

          case 51:
            _context7.prev = 51;
            _context7.t1 = _context7["catch"](0);
            throw _context7.t1;

          case 54:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 51], [18, 32, 36, 44], [37,, 39, 43]]);
  }));
  return _listarTopItemByTop.apply(this, arguments);
}

function listarTopItemByLugar(_x13, _x14) {
  return _listarTopItemByLugar.apply(this, arguments);
}

function _listarTopItemByLugar() {
  _listarTopItemByLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(lugarId, _ref2) {
    var pageNumber, pageSize, _queryObject, response, topItemBD, queryObject, totalRows, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, element, topItem, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            pageNumber = _ref2.pageNumber, pageSize = _ref2.pageSize;
            _context8.prev = 1;
            response = null;
            topItemBD = null;
            queryObject = (_queryObject = {
              where: {
                flagActive: true,
                LugarId: lugarId,
                TopId: _defineProperty({}, Op.ne, null)
              },
              attributes: ['id', 'TopId', 'descripcion', 'valoracion', 'createdBy', 'updatedAt', 'updatedAtStr'],
              include: [{
                model: TopDTO,
                attributes: [],
                where: {
                  flagActive: true,
                  flagPublicado: true
                },
                required: true,
                as: 'Top'
              }]
            }, _defineProperty(_queryObject, "include", [{
              model: TopItemDetalleDTO,
              required: false,
              attributes: ['id', 'rutaImagen', 'flagImagenDefaultTop'],
              where: {
                flagActive: true
              }
            }]), _defineProperty(_queryObject, "order", [['updatedAt', 'DESC']]), _queryObject);

            if (pageNumber && pageSize) {
              queryObject.offset = (pageNumber - 1) * pageSize;
              queryObject.limit = pageSize;
            }

            _context8.next = 8;
            return TopItemDTO.findAll(queryObject);

          case 8:
            topItemBD = _context8.sent;
            totalRows = topItemBD.length || 0;

            if (!(totalRows > 0)) {
              _context8.next = 43;
              break;
            }

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context8.prev = 14;
            _iterator4 = topItemBD[Symbol.iterator]();

          case 16:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context8.next = 26;
              break;
            }

            element = _step4.value;
            topItem = element.dataValues;
            _context8.next = 21;
            return _index["default"].Usuario.findOne({
              where: {
                id: topItem.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 21:
            UsuarioBd = _context8.sent;

            if (UsuarioBd) {
              topItem.Usuarios = UsuarioBd.dataValues;
            }

          case 23:
            _iteratorNormalCompletion4 = true;
            _context8.next = 16;
            break;

          case 26:
            _context8.next = 32;
            break;

          case 28:
            _context8.prev = 28;
            _context8.t0 = _context8["catch"](14);
            _didIteratorError4 = true;
            _iteratorError4 = _context8.t0;

          case 32:
            _context8.prev = 32;
            _context8.prev = 33;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 35:
            _context8.prev = 35;

            if (!_didIteratorError4) {
              _context8.next = 38;
              break;
            }

            throw _iteratorError4;

          case 38:
            return _context8.finish(35);

          case 39:
            return _context8.finish(32);

          case 40:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topItemBD,
              totalRows: totalRows
            }, null);
            _context8.next = 44;
            break;

          case 43:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: totalRows
            }, null);

          case 44:
            return _context8.abrupt("return", response);

          case 47:
            _context8.prev = 47;
            _context8.t1 = _context8["catch"](1);
            throw _context8.t1;

          case 50:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 47], [14, 28, 32, 40], [33,, 35, 39]]);
  }));
  return _listarTopItemByLugar.apply(this, arguments);
}

function eliminarTopItem(_x15, _x16, _x17) {
  return _eliminarTopItem.apply(this, arguments);
}

function _eliminarTopItem() {
  _eliminarTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(id, updatedAt, createdBy) {
    var response, topBd, eliminarDetalle;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            response = null;

            if (!id) {
              _context9.next = 11;
              break;
            }

            _context9.next = 5;
            return TopItemDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedAt: updatedAt,
              updatedBy: createdBy
            }, {
              where: {
                id: id,
                createdBy: createdBy
              }
            });

          case 5:
            topBd = _context9.sent;

            if (!topBd) {
              _context9.next = 11;
              break;
            }

            _context9.next = 9;
            return eliminarTopDetallePorTopId(id);

          case 9:
            eliminarDetalle = _context9.sent;

            if (eliminarDetalle.ok) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

          case 11:
            if (!(response === null)) {
              _context9.next = 13;
              break;
            }

            throw new Error('No se pudo eliminar top item');

          case 13:
            return _context9.abrupt("return", response);

          case 16:
            _context9.prev = 16;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 16]]);
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
  regeneratorRuntime.mark(function _callee10() {
    var TopItemId,
        updatedAt,
        createdBy,
        flagLike,
        response,
        TopItemLikeBd,
        queryObject,
        newTopItemLikeBd,
        _args10 = arguments;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            TopItemId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 0;
            updatedAt = _args10.length > 1 ? _args10[1] : undefined;
            createdBy = _args10.length > 2 ? _args10[2] : undefined;
            flagLike = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : false;
            _context10.prev = 4;
            response = null;

            if (!(TopItemId > 0)) {
              _context10.next = 21;
              break;
            }

            _context10.next = 9;
            return TopItemLikeDTO.findOne({
              where: {
                TopItemId: TopItemId,
                UsuarioId: createdBy
              },
              attributes: ['id', 'flagActive', 'flagEliminate']
            });

          case 9:
            TopItemLikeBd = _context10.sent;

            if (!TopItemLikeBd) {
              _context10.next = 17;
              break;
            }

            queryObject = {
              updatedAt: updatedAt
            };

            if (flagLike) {
              queryObject.flagActive = true;
              queryObject.flagEliminate = false;
            } else {
              queryObject.flagActive = false;
              queryObject.flagEliminate = true;
            }

            _context10.next = 15;
            return TopItemLikeDTO.update(queryObject, {
              where: {
                id: TopItemLikeBd.id
              }
            });

          case 15:
            _context10.next = 20;
            break;

          case 17:
            _context10.next = 19;
            return TopItemLikeDTO.create({
              flagActive: true,
              flagEliminate: false,
              TopItemId: TopItemId,
              UsuarioId: createdBy,
              createdAt: updatedAt,
              updatedAt: updatedAt
            }, {
              fields: ['flagActive', 'flagEliminate', 'TopItemId', 'UsuarioId', 'createdAt', 'updatedAt']
            });

          case 19:
            newTopItemLikeBd = _context10.sent;

          case 20:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 21:
            if (!(response === null)) {
              _context10.next = 23;
              break;
            }

            throw new Error('No se pudo actualizar top');

          case 23:
            return _context10.abrupt("return", response);

          case 26:
            _context10.prev = 26;
            _context10.t0 = _context10["catch"](4);
            throw _context10.t0;

          case 29:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[4, 26]]);
  }));
  return _likesTopItem.apply(this, arguments);
}

function uploadFileTopItemDetalle(_x18, _x19) {
  return _uploadFileTopItemDetalle.apply(this, arguments);
}

function _uploadFileTopItemDetalle() {
  _uploadFileTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(topItemDetalle, files) {
    var response, bucketName, id, path, _topItemDetalle$nameI, nameImageDefault, updatedAt, createdBy, TopItemId, response_1, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, file, name, size, mimetype, key, _ref4, Location, TopItemDetalle;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            response = null;
            bucketName = "its-top5-bucket-client";

            if (!files) {
              _context11.next = 44;
              break;
            }

            id = topItemDetalle.id, path = topItemDetalle.path, _topItemDetalle$nameI = topItemDetalle.nameImageDefault, nameImageDefault = _topItemDetalle$nameI === void 0 ? "" : _topItemDetalle$nameI, updatedAt = topItemDetalle.updatedAt, createdBy = topItemDetalle.createdBy;
            TopItemId = id; // eliminar imagenes anteriores

            _context11.next = 8;
            return eliminarTopItemDetalleByTopItem(TopItemId, updatedAt, createdBy);

          case 8:
            response_1 = _context11.sent;

            if (!response_1.ok) {
              _context11.next = 44;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context11.prev = 13;
            _iterator5 = files[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context11.next = 29;
              break;
            }

            file = _step5.value;
            name = file.name, size = file.size, mimetype = file.mimetype;
            key = "topItem/".concat(TopItemId, "/").concat(path, "/").concat(name);
            _context11.next = 21;
            return (0, _common.uploadToS3)(file, bucketName, key);

          case 21:
            _ref4 = _context11.sent;
            Location = _ref4.Location;
            TopItemDetalle = {
              rutaImagen: Location,
              flagImagenDefaultTop: false,
              updatedAt: updatedAt,
              createdBy: createdBy,
              createdAt: updatedAt,
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
            _context11.next = 15;
            break;

          case 29:
            _context11.next = 35;
            break;

          case 31:
            _context11.prev = 31;
            _context11.t0 = _context11["catch"](13);
            _didIteratorError5 = true;
            _iteratorError5 = _context11.t0;

          case 35:
            _context11.prev = 35;
            _context11.prev = 36;

            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }

          case 38:
            _context11.prev = 38;

            if (!_didIteratorError5) {
              _context11.next = 41;
              break;
            }

            throw _iteratorError5;

          case 41:
            return _context11.finish(38);

          case 42:
            return _context11.finish(35);

          case 43:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 44:
            return _context11.abrupt("return", response);

          case 47:
            _context11.prev = 47;
            _context11.t1 = _context11["catch"](0);
            throw _context11.t1;

          case 50:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 47], [13, 31, 35, 43], [36,, 38, 42]]);
  }));
  return _uploadFileTopItemDetalle.apply(this, arguments);
}

function createOrUpdateTopItemDetalle(_x20) {
  return _createOrUpdateTopItemDetalle.apply(this, arguments);
}

function _createOrUpdateTopItemDetalle() {
  _createOrUpdateTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(TopItemDetalle) {
    var queryObject, dataValues, _ref5;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            queryObject = {
              rutaImagen: TopItemDetalle.rutaImagen,
              flagImagenDefaultTop: TopItemDetalle.flagImagenDefaultTop,
              flagActive: true,
              flagEliminate: false,
              updatedAt: TopItemDetalle.updatedAt
            };

            if (!TopItemDetalle.id) {
              _context12.next = 9;
              break;
            }

            queryObject.updatedBy = TopItemDetalle.createdBy;
            _context12.next = 6;
            return TopItemDetalleDTO.update(queryObject, {
              where: {
                id: TopItemDetalle.id
              }
            });

          case 6:
            dataValues = TopItemDetalle;
            _context12.next = 16;
            break;

          case 9:
            queryObject.createdBy = TopItemDetalle.createdBy;
            queryObject.createdAt = TopItemDetalle.createdAt;
            queryObject.TopItemId = TopItemDetalle.TopItemId;
            _context12.next = 14;
            return TopItemDetalleDTO.create(queryObject, {
              fields: ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt', 'TopItemId']
            });

          case 14:
            _ref5 = _context12.sent;
            dataValues = _ref5.dataValues;

          case 16:
            return _context12.abrupt("return", (0, _common.buildContainer)(true, '', dataValues, null));

          case 19:
            _context12.prev = 19;
            _context12.t0 = _context12["catch"](0);
            throw _context12.t0;

          case 22:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 19]]);
  }));
  return _createOrUpdateTopItemDetalle.apply(this, arguments);
}

function eliminarTopItemDetalleByTopItem(_x21, _x22, _x23) {
  return _eliminarTopItemDetalleByTopItem.apply(this, arguments);
}

function _eliminarTopItemDetalleByTopItem() {
  _eliminarTopItemDetalleByTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(TopItemId, updatedAt, createdBy) {
    var response;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            response = null;

            if (!TopItemId) {
              _context13.next = 6;
              break;
            }

            _context13.next = 5;
            return TopItemDetalleDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedAt: updatedAt,
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
              _context13.next = 8;
              break;
            }

            throw new Error('No se pudo eliminar top detalle');

          case 8:
            return _context13.abrupt("return", response);

          case 11:
            _context13.prev = 11;
            _context13.t0 = _context13["catch"](0);
            throw _context13.t0;

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 11]]);
  }));
  return _eliminarTopItemDetalleByTopItem.apply(this, arguments);
}

function listarTopItemAutocomplete(_x24) {
  return _listarTopItemAutocomplete.apply(this, arguments);
}

function _listarTopItemAutocomplete() {
  _listarTopItemAutocomplete = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(objParams) {
    var response, topItemBD, pageNumber, pageSize, keyword, listTopItemBD, queryObject, totalRows, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, element, top, UsuarioBd;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            response = null;
            topItemBD = null;
            pageNumber = objParams.pageNumber, pageSize = objParams.pageSize, keyword = objParams.keyword;

            if (!(keyword != "")) {
              _context14.next = 58;
              break;
            }

            keyword = _utilitarios["default"].alwaysParseString(keyword);
            listTopItemBD = _index["default"].sequelize.query("SELECT \"TopItem\".\"id\"\n            FROM \"Top\"\n            INNER JOIN \"TopItem\" ON \"Top\".\"id\" = \"TopItem\".\"TopId\"\n            INNER JOIN \"Lugar\" ON \"TopItem\".\"LugarId\" = \"Lugar\".\"id\"\n            INNER JOIN \"Categoria\" ON \"Top\".\"CategoriaId\" = \"Categoria\".\"id\"\n            WHERE\n            \"Top\".\"flagPublicado\" = true\n\t\t\tAND \"Top\".\"flagActive\" = true\n            AND \"TopItem\".\"flagActive\" = true\n            AND \"Lugar\".\"flagActive\" = true\n            AND \"Categoria\".\"flagActive\" = true\n            AND \n            (\n                REPLACE_FILTRO_BUSCADOR(\"Top\".\"titulo\") LIKE :keyword\n                OR REPLACE_FILTRO_BUSCADOR(\"TopItem\".\"descripcion\") LIKE :keyword\n                OR REPLACE_FILTRO_BUSCADOR(\"Lugar\".\"name\") LIKE :keyword\n                OR REPLACE_FILTRO_BUSCADOR(\"Categoria\".\"name\") LIKE :keyword\n             )\n             GROUP BY \"TopItem\".\"id\"", {
              replacements: {
                keyword: "%".concat(keyword, "%")
              },
              type: _index["default"].sequelize.QueryTypes.SELECT
            });
            _context14.next = 9;
            return listTopItemBD.map(function (x) {
              return x.id;
            });

          case 9:
            listTopItemBD = _context14.sent;

            if (!(listTopItemBD.length > 0)) {
              _context14.next = 55;
              break;
            }

            console.log(listTopItemBD);
            queryObject = {
              where: {
                flagActive: true,
                id: listTopItemBD
              },
              attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr'],
              include: [{
                model: TopDTO,
                where: {
                  flagActive: true,
                  flagPublicado: true
                },
                attributes: ['id', 'titulo', 'fechaPublicado', 'fechaPublicadoStr', 'updatedAt'],
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
              order: [['updatedAt', 'DESC']]
            };
            queryObject.offset = (pageNumber - 1) * pageSize;
            queryObject.limit = pageSize; // console.log(queryObject);

            _context14.next = 17;
            return TopItemDTO.findAll(queryObject);

          case 17:
            topItemBD = _context14.sent;
            totalRows = topItemBD.length || 0;

            if (!totalRows) {
              _context14.next = 52;
              break;
            }

            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context14.prev = 23;
            _iterator6 = topItemBD[Symbol.iterator]();

          case 25:
            if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
              _context14.next = 35;
              break;
            }

            element = _step6.value;
            top = element.dataValues;
            _context14.next = 30;
            return _index["default"].Usuario.findOne({
              where: {
                id: top.createdBy,
                flagActive: true
              },
              attributes: ['id', 'nombreCompleto', 'rutaImagenPerfil']
            });

          case 30:
            UsuarioBd = _context14.sent;

            if (UsuarioBd) {
              top.Usuarios = UsuarioBd.dataValues;
            }

          case 32:
            _iteratorNormalCompletion6 = true;
            _context14.next = 25;
            break;

          case 35:
            _context14.next = 41;
            break;

          case 37:
            _context14.prev = 37;
            _context14.t0 = _context14["catch"](23);
            _didIteratorError6 = true;
            _iteratorError6 = _context14.t0;

          case 41:
            _context14.prev = 41;
            _context14.prev = 42;

            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }

          case 44:
            _context14.prev = 44;

            if (!_didIteratorError6) {
              _context14.next = 47;
              break;
            }

            throw _iteratorError6;

          case 47:
            return _context14.finish(44);

          case 48:
            return _context14.finish(41);

          case 49:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: topItemBD,
              totalRows: totalRows
            }, null);
            _context14.next = 53;
            break;

          case 52:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: 0
            }, null);

          case 53:
            _context14.next = 56;
            break;

          case 55:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: 0
            }, null);

          case 56:
            _context14.next = 59;
            break;

          case 58:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [],
              totalRows: 0
            }, null);

          case 59:
            return _context14.abrupt("return", response);

          case 62:
            _context14.prev = 62;
            _context14.t1 = _context14["catch"](0);
            throw _context14.t1;

          case 65:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 62], [23, 37, 41, 49], [42,, 44, 48]]);
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
  regeneratorRuntime.mark(function _callee15() {
    var keyword,
        response,
        listTopBD,
        listTopItemBD,
        listLugarBD,
        listCategoriaBD,
        _args15 = arguments;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            keyword = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : "";
            _context15.prev = 1;
            response = null; // var obj = {
            //     order: [['descripcion', 'ASC']]
            // };

            if (!(keyword != "")) {
              _context15.next = 24;
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
            _context15.next = 11;
            return listTopBD.map(function (x) {
              return x.titulo;
            });

          case 11:
            listTopBD = _context15.sent;
            _context15.next = 14;
            return listTopItemBD.map(function (x) {
              return x.descripcion;
            });

          case 14:
            listTopItemBD = _context15.sent;
            _context15.next = 17;
            return listLugarBD.map(function (x) {
              return x.name;
            });

          case 17:
            listLugarBD = _context15.sent;
            _context15.next = 20;
            return listCategoriaBD.map(function (x) {
              return x.name;
            });

          case 20:
            listCategoriaBD = _context15.sent;
            response = (0, _common.buildContainer)(true, '', {
              dataValues: [].concat(listTopBD, listTopItemBD, listLugarBD, listCategoriaBD)
            }, null);
            _context15.next = 25;
            break;

          case 24:
            response = (0, _common.buildContainer)(true, '', {
              dataValues: []
            }, null);

          case 25:
            return _context15.abrupt("return", response);

          case 28:
            _context15.prev = 28;
            _context15.t0 = _context15["catch"](1);
            throw _context15.t0;

          case 31:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 28]]);
  }));
  return _listarOptionsAutocomplete.apply(this, arguments);
}

function getOneTop(_x25, _x26) {
  return _getOneTop.apply(this, arguments);
}

function _getOneTop() {
  _getOneTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16(id, createdBy) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            response = null;
            topBD = null;
            _context16.next = 5;
            return TopDTO.findOne({
              where: {
                id: id,
                createdBy: createdBy,
                flagActive: true
              },
              attributes: ['id', 'titulo', 'flagPublicado', 'fechaPublicado', 'fechaPublicadoStr', 'updatedAt', 'updatedAtStr'],
              include: [{
                model: _index["default"].Categoria,
                as: 'Categoria',
                where: {
                  flagActive: true
                },
                attributes: ['id', 'name', 'updatedAt']
              }],
              order: [['fechaPublicado', 'DESC'], ['updatedAt', 'DESC']]
            });

          case 5:
            topBD = _context16.sent;

            if (!topBD) {
              _context16.next = 10;
              break;
            }

            response = (0, _common.buildContainer)(true, '', topBD, null);
            _context16.next = 11;
            break;

          case 10:
            throw new Error("Top no existe");

          case 11:
            return _context16.abrupt("return", response);

          case 14:
            _context16.prev = 14;
            _context16.t0 = _context16["catch"](0);
            throw _context16.t0;

          case 17:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 14]]);
  }));
  return _getOneTop.apply(this, arguments);
}

function getOneTopItem(_x27, _x28) {
  return _getOneTopItem.apply(this, arguments);
}

function _getOneTopItem() {
  _getOneTopItem = _asyncToGenerator(
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
            return TopItemDTO.findOne({
              where: {
                id: id,
                createdBy: createdBy,
                flagActive: true
              },
              attributes: ['id', 'descripcion', 'valoracion', 'LugarId', 'createdBy', 'updatedAt', 'updatedAtStr'],
              include: [{
                model: TopItemDetalleDTO,
                where: {
                  flagActive: true
                },
                attributes: ['id', 'TopItemId', 'rutaImagen']
              }]
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
            throw new Error("Top item no existe");

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
  return _getOneTopItem.apply(this, arguments);
}

function createdOrUpdatedTopItem(_x29) {
  return _createdOrUpdatedTopItem.apply(this, arguments);
}

function _createdOrUpdatedTopItem() {
  _createdOrUpdatedTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(objTopItem) {
    var queryObject, dataValues, _ref6;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            queryObject = {
              descripcion: objTopItem.descripcion,
              valoracion: objTopItem.valoracion,
              LugarId: objTopItem.LugarId,
              TopId: objTopItem.TopId,
              flagActive: true,
              flagEliminate: false,
              updatedAt: objTopItem.updatedAt
            };

            if (!objTopItem.id) {
              _context18.next = 9;
              break;
            }

            queryObject.updatedBy = objTopItem.createdBy;
            _context18.next = 6;
            return TopItemDTO.update(queryObject, {
              where: {
                id: objTopItem.id
              }
            });

          case 6:
            dataValues = objTopItem;
            _context18.next = 15;
            break;

          case 9:
            queryObject.createdBy = objTopItem.createdBy;
            queryObject.createdAt = objTopItem.createdAt;
            _context18.next = 13;
            return TopItemDTO.create(queryObject, {
              fields: ['descripcion', 'valoracion', 'LugarId', 'TopId', 'flagActive', 'flagEliminate', 'updatedAt', 'createdBy', 'createdAt']
            });

          case 13:
            _ref6 = _context18.sent;
            dataValues = _ref6.dataValues;

          case 15:
            return _context18.abrupt("return", (0, _common.buildContainer)(true, '', dataValues, null));

          case 18:
            _context18.prev = 18;
            _context18.t0 = _context18["catch"](0);
            throw _context18.t0;

          case 21:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 18]]);
  }));
  return _createdOrUpdatedTopItem.apply(this, arguments);
}

function eliminatedAndcreateOrUpdateTopItemDetalle(_x30, _x31, _x32, _x33, _x34, _x35, _x36) {
  return _eliminatedAndcreateOrUpdateTopItemDetalle.apply(this, arguments);
}

function _eliminatedAndcreateOrUpdateTopItemDetalle() {
  _eliminatedAndcreateOrUpdateTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19(TopId, createdBy, updatedAt, objListTopItemDetalle, files, idsEliminar, transact) {
    var response, responseEliminarTopItemDetalle, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, element, topItemDetalleBD, rutaImagen, id, queryObject, _queryObject2;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            response = null;

            if (!objListTopItemDetalle) {
              _context19.next = 50;
              break;
            }

            _context19.next = 5;
            return eliminarTopItemDetalle(updatedAt, idsEliminar, transact);

          case 5:
            responseEliminarTopItemDetalle = _context19.sent;

            if (!responseEliminarTopItemDetalle.ok) {
              _context19.next = 50;
              break;
            }

            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context19.prev = 10;
            _iterator7 = objListTopItemDetalle[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context19.next = 36;
              break;
            }

            element = _step7.value;
            topItemDetalleBD = null; // const { name, size, mimetype } = file;
            // let key = `user/${id}/${path}/${name}`;
            // const { Location } = await uploadToS3(file, bucketName, key);

            rutaImagen = element.rutaImagen;
            id = objListTopItemDetalle.id || 0;

            if (!id) {
              _context19.next = 26;
              break;
            }

            queryObject = {
              rutaImagen: rutaImagen,
              flagImagenDefaultTop: element.flagImagenDefaultTop,
              flagActive: true,
              flagEliminate: false,
              updatedBy: createdBy,
              updatedAt: updatedAt
            };
            queryObject.where = {
              id: id,
              TopId: TopId
            };

            if (transact) {
              queryObject.transaction = transact;
            }

            _context19.next = 23;
            return TopItemDetalleDTO.update(queryObject);

          case 23:
            topItemDetalleBD = _context19.sent;
            _context19.next = 32;
            break;

          case 26:
            _queryObject2 = {
              rutaImagen: rutaImagen,
              flagImagenDefaultTop: element.flagImagenDefaultTop,
              TopId: TopId,
              flagActive: true,
              flagEliminate: false,
              createdBy: element.createdBy,
              createdAt: updatedAt,
              updatedAt: updatedAt
            };
            _queryObject2.fields = ['rutaImagen', 'flagImagenDefaultTop', 'flagActive', 'flagEliminate', 'createdBy', 'createdAt', 'updatedAt'];

            if (transact) {
              _queryObject2.transaction = transact;
            }

            _context19.next = 31;
            return TopItemDetalleDTO.create(_queryObject2);

          case 31:
            topItemDetalleBD = _context19.sent;

          case 32:
            if (topItemDetalleBD) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

          case 33:
            _iteratorNormalCompletion7 = true;
            _context19.next = 12;
            break;

          case 36:
            _context19.next = 42;
            break;

          case 38:
            _context19.prev = 38;
            _context19.t0 = _context19["catch"](10);
            _didIteratorError7 = true;
            _iteratorError7 = _context19.t0;

          case 42:
            _context19.prev = 42;
            _context19.prev = 43;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 45:
            _context19.prev = 45;

            if (!_didIteratorError7) {
              _context19.next = 48;
              break;
            }

            throw _iteratorError7;

          case 48:
            return _context19.finish(45);

          case 49:
            return _context19.finish(42);

          case 50:
            if (!(response === null)) {
              _context19.next = 52;
              break;
            }

            throw new Error('No se pudo crear top item');

          case 52:
            return _context19.abrupt("return", response);

          case 55:
            _context19.prev = 55;
            _context19.t1 = _context19["catch"](0);
            throw _context19.t1;

          case 58:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 55], [10, 38, 42, 50], [43,, 45, 49]]);
  }));
  return _eliminatedAndcreateOrUpdateTopItemDetalle.apply(this, arguments);
}

function eliminarTopItemDetalle(_x37, _x38, _x39) {
  return _eliminarTopItemDetalle.apply(this, arguments);
} // async function eliminarTopItem(id, updatedAt, createdBy) {
//     try {
//         let response = null;
//         let TopBd = null;
//         if (id) {
//             await TopBd.update({
//                 flagActive: false
//                 , flagEliminate: true
//                 , updatedAt
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
  regeneratorRuntime.mark(function _callee20(updatedAt, idsEliminar, transact) {
    var response, queryObject, topItemDetalleBd;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            response = null;
            queryObject = {
              flagActive: false,
              flagEliminate: true,
              flagImagenDefaultTop: false,
              updatedAt: updatedAt
            };
            queryObject.where = {
              id: _defineProperty({}, Op["in"], [idsEliminar])
            };

            if (transact) {
              queryObject.transact = transact;
            }

            _context20.next = 7;
            return TopItemDetalleDTO.update(queryObject);

          case 7:
            topItemDetalleBd = _context20.sent;

            if (topItemDetalleBd) {
              response = (0, _common.buildContainer)(true, '', null, null);
            }

            if (!(response === null)) {
              _context20.next = 11;
              break;
            }

            throw new Error('No se pudo eliminar top item detalle');

          case 11:
            return _context20.abrupt("return", response);

          case 14:
            _context20.prev = 14;
            _context20.t0 = _context20["catch"](0);
            throw _context20.t0;

          case 17:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 14]]);
  }));
  return _eliminarTopItemDetalle.apply(this, arguments);
}

function obtenerTop(_x40) {
  return _obtenerTop.apply(this, arguments);
}

function _obtenerTop() {
  _obtenerTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee21(id) {
    var topBD;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _context21.next = 3;
            return TopDTO.findOne({
              where: {
                id: id
              }
            });

          case 3:
            topBD = _context21.sent;
            return _context21.abrupt("return", topBD);

          case 7:
            _context21.prev = 7;
            _context21.t0 = _context21["catch"](0);
            throw _context21.t0;

          case 10:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 7]]);
  }));
  return _obtenerTop.apply(this, arguments);
}

function listarTopItemPorUsuario(_x41, _x42) {
  return _listarTopItemPorUsuario.apply(this, arguments);
}

function _listarTopItemPorUsuario() {
  _listarTopItemPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee22(createdBy, cantidad) {
    var topBD, response;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            topBD = null;
            response = null; // if (cantidad) {
            // } else {

            _context22.next = 5;
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
              order: [['updatedAt', 'DESC']]
            });

          case 5:
            topBD = _context22.sent;
            // }
            response = (0, _common.buildContainer)(true, '', topBD, null);
            return _context22.abrupt("return", response);

          case 10:
            _context22.prev = 10;
            _context22.t0 = _context22["catch"](0);
            throw _context22.t0;

          case 13:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[0, 10]]);
  }));
  return _listarTopItemPorUsuario.apply(this, arguments);
}

function obtenerTopItemDetalle(_x43) {
  return _obtenerTopItemDetalle.apply(this, arguments);
}

function _obtenerTopItemDetalle() {
  _obtenerTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee23(id) {
    var topItemDetalleBD;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _context23.next = 3;
            return TopItemDetalleDTO.findOne({
              where: {
                id: id
              }
            });

          case 3:
            topItemDetalleBD = _context23.sent;
            return _context23.abrupt("return", topItemDetalleBD);

          case 7:
            _context23.prev = 7;
            _context23.t0 = _context23["catch"](0);
            throw _context23.t0;

          case 10:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, null, [[0, 7]]);
  }));
  return _obtenerTopItemDetalle.apply(this, arguments);
}

function listarTopGeneral(_x44, _x45) {
  return _listarTopGeneral.apply(this, arguments);
}

function _listarTopGeneral() {
  _listarTopGeneral = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee24(categoriaId, cantidad) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            response = null;
            topBD = null;

            if (!cantidad) {
              _context24.next = 9;
              break;
            }

            _context24.next = 6;
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
            topBD = _context24.sent;
            _context24.next = 12;
            break;

          case 9:
            _context24.next = 11;
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
              order: [['updatedAt', 'DESC']]
            });

          case 11:
            topBD = _context24.sent;

          case 12:
            response = (0, _common.buildContainer)(true, '', topBD, null);
            return _context24.abrupt("return", response);

          case 16:
            _context24.prev = 16;
            _context24.t0 = _context24["catch"](0);
            throw _context24.t0;

          case 19:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, null, [[0, 16]]);
  }));
  return _listarTopGeneral.apply(this, arguments);
}

function listarTopByLugarByCategoria(_x46, _x47) {
  return _listarTopByLugarByCategoria.apply(this, arguments);
}

function _listarTopByLugarByCategoria() {
  _listarTopByLugarByCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee25(LugarId, categoriaId) {
    var response, topBD;
    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            response = null;
            topBD = null;
            _context25.next = 5;
            return TopDTO.findAll({
              where: {
                LugarId: LugarId,
                categoriaId: categoriaId,
                flagActive: true
              },
              attributes: ['id', 'LugarId', 'categoriaId', 'titulo', 'updatedAt'],
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
              order: [['updatedAt', 'DESC']]
            });

          case 5:
            topBD = _context25.sent;
            response = (0, _common.buildContainer)(true, '', topBD, null);
            return _context25.abrupt("return", response);

          case 10:
            _context25.prev = 10;
            _context25.t0 = _context25["catch"](0);
            throw _context25.t0;

          case 13:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, null, [[0, 10]]);
  }));
  return _listarTopByLugarByCategoria.apply(this, arguments);
}

function listarTopPorUsuarioPorCategoria(_x48, _x49) {
  return _listarTopPorUsuarioPorCategoria.apply(this, arguments);
}

function _listarTopPorUsuarioPorCategoria() {
  _listarTopPorUsuarioPorCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee26(categoriaId, createdBy) {
    var response, topBDListado;
    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            response = null;
            _context26.next = 4;
            return TopDTO.findAll({
              where: {
                createdBy: createdBy,
                categoriaId: categoriaId,
                flagActive: true
              },
              order: [['updatedAt', 'DESC']]
            });

          case 4:
            topBDListado = _context26.sent;
            // TODO obtener foto default
            response = (0, _common.buildContainer)(true, '', topBDListado, null);
            return _context26.abrupt("return", response);

          case 9:
            _context26.prev = 9;
            _context26.t0 = _context26["catch"](0);
            throw _context26.t0;

          case 12:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, null, [[0, 9]]);
  }));
  return _listarTopPorUsuarioPorCategoria.apply(this, arguments);
}

function listarTopPorUsuarioPorFiltro(_x50, _x51) {
  return _listarTopPorUsuarioPorFiltro.apply(this, arguments);
}

function _listarTopPorUsuarioPorFiltro() {
  _listarTopPorUsuarioPorFiltro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee27(filtro, createdBy) {
    var response, topItemBDListado;
    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            response = null;
            _context27.next = 4;
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
              order: [['updatedAt', 'DESC']]
            });

          case 4:
            topItemBDListado = _context27.sent;
            // TODO obtener foto default
            response = (0, _common.buildContainer)(true, '', topItemBDListado, null);
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
  return _listarTopPorUsuarioPorFiltro.apply(this, arguments);
}

function listarTopDetallePorTopItem(_x52) {
  return _listarTopDetallePorTopItem.apply(this, arguments);
}

function _listarTopDetallePorTopItem() {
  _listarTopDetallePorTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee28(id) {
    var response, topItemDetalleBD;
    return regeneratorRuntime.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
            response = null;
            _context28.next = 4;
            return TopItemDetalleDTO.findAll({
              where: {
                TopItemId: id,
                flagActive: true
              },
              order: [['updatedAt', 'DESC']]
            });

          case 4:
            topItemDetalleBD = _context28.sent;
            response = (0, _common.buildContainer)(true, '', topItemDetalleBD, null);
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
  return _listarTopDetallePorTopItem.apply(this, arguments);
}

function eliminarTopDetallePorTopId(_x53, _x54) {
  return _eliminarTopDetallePorTopId.apply(this, arguments);
}

function _eliminarTopDetallePorTopId() {
  _eliminarTopDetallePorTopId = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee29(id, updatedAt) {
    var response;
    return regeneratorRuntime.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            response = null;

            if (!id) {
              _context29.next = 6;
              break;
            }

            _context29.next = 5;
            return TopItemDetalleDTO.update({
              flagActive: false,
              flagEliminate: true,
              updatedAt: updatedAt
            }, {
              where: {
                TopItemId: id
              }
            });

          case 5:
            response = (0, _common.buildContainer)(true, '', null, null);

          case 6:
            if (!(response === null)) {
              _context29.next = 8;
              break;
            }

            throw new Error('No se pudo eliminar top detalle');

          case 8:
            return _context29.abrupt("return", response);

          case 11:
            _context29.prev = 11;
            _context29.t0 = _context29["catch"](0);
            throw _context29.t0;

          case 14:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, null, [[0, 11]]);
  }));
  return _eliminarTopDetallePorTopId.apply(this, arguments);
}

function createOrUpdateTopItemIgnore(_x55) {
  return _createOrUpdateTopItemIgnore.apply(this, arguments);
}

function _createOrUpdateTopItemIgnore() {
  _createOrUpdateTopItemIgnore = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee30(_ref3) {
    var objLugar, objTopItem, objListTopItemDetalle, files, response, responseLugar, responseTopItem;
    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            objLugar = _ref3.objLugar, objTopItem = _ref3.objTopItem, objListTopItemDetalle = _ref3.objListTopItemDetalle, files = _ref3.files;
            _context30.prev = 1;
            response = null; // await models.sequelize.transaction(async transact => {

            if (!objLugar) {
              _context30.next = 8;
              break;
            }

            _context30.next = 6;
            return (0, _lugar.createdOrUpdatedLugar)(objLugar);

          case 6:
            responseLugar = _context30.sent;
            objTopItem.LugarId = responseLugar.data.id;

          case 8:
            _context30.next = 10;
            return createdOrUpdatedTopItem(objTopItem);

          case 10:
            responseTopItem = _context30.sent;
            // registrar Detalle
            response = (0, _common.buildContainer)(true, '', responseTopItem.data, null); // });

            return _context30.abrupt("return", response);

          case 15:
            _context30.prev = 15;
            _context30.t0 = _context30["catch"](1);
            throw _context30.t0;

          case 18:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, null, [[1, 15]]);
  }));
  return _createOrUpdateTopItemIgnore.apply(this, arguments);
}

module.exports = {
  createOrUpdateTop: createOrUpdateTop,
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