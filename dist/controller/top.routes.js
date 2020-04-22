"use strict";

var _top = _interopRequireDefault(require("../controller/top.controller"));

var _common = require("../controller/common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createOrUpdateTop(_x, _x2) {
  return _createOrUpdateTop.apply(this, arguments);
}

function _createOrUpdateTop() {
  _createOrUpdateTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var data, objTop, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            (0, _common.existeJsonData)(req, res);
            data = req.body.data;
            objTop = {
              id: data.id,
              titulo: data.titulo,
              createdBy: data.createdBy,
              CategoriaId: data.CategoriaId
            }; // let files = [];
            // if (req.files) {
            //     files = [].concat(req.files.image);
            // }

            _context.next = 6;
            return _top["default"].createOrUpdateTop(objTop);

          case 6:
            response = _context.sent;
            return _context.abrupt("return", res.status(200).send(response));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            (0, _common.controlError)("createOrUpdateTop", _context.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context.t0.message, null, null));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _createOrUpdateTop.apply(this, arguments);
}

function listarTopPorUsuario(_x3, _x4) {
  return _listarTopPorUsuario.apply(this, arguments);
}

function _listarTopPorUsuario() {
  _listarTopPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var data, objParams, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            (0, _common.existeJsonData)(req, res);
            data = req.body.data;
            objParams = {
              createdBy: data.createdBy,
              pageNumber: data.pageNumber,
              pageSize: data.pageSize,
              CategoriaId: data.CategoriaId,
              flagPublicado: data.flagPublicado
            };
            _context2.next = 6;
            return _top["default"].listarTopPorUsuario(objParams);

          case 6:
            response = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(response));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            (0, _common.controlError)("listarTopPorUsuario", _context2.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context2.t0.message, null, null));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _listarTopPorUsuario.apply(this, arguments);
}

function publicarTop(_x5, _x6) {
  return _publicarTop.apply(this, arguments);
}

function _publicarTop() {
  _publicarTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
<<<<<<< HEAD
    var _req$body$data, id, updatedDate, createdBy, flagPublicado, response;
=======
    var _req$body$data, id, updatedAt, createdBy, flagPublicado, response;
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            (0, _common.existeJsonData)(req, res);
<<<<<<< HEAD
            _req$body$data = req.body.data, id = _req$body$data.id, updatedDate = _req$body$data.updatedDate, createdBy = _req$body$data.createdBy, flagPublicado = _req$body$data.flagPublicado;
            _context3.next = 5;
            return _top["default"].publicarTop(id, updatedDate, createdBy, flagPublicado);
=======
            _req$body$data = req.body.data, id = _req$body$data.id, updatedAt = _req$body$data.updatedAt, createdBy = _req$body$data.createdBy, flagPublicado = _req$body$data.flagPublicado;
            _context3.next = 5;
            return _top["default"].publicarTop(id, updatedAt, createdBy, flagPublicado);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

          case 5:
            response = _context3.sent;
            return _context3.abrupt("return", res.status(200).send(response));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            (0, _common.controlError)("publicarTop", _context3.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context3.t0.message, null, null));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _publicarTop.apply(this, arguments);
}

function eliminarTop(_x7, _x8) {
  return _eliminarTop.apply(this, arguments);
}

function _eliminarTop() {
  _eliminarTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
<<<<<<< HEAD
    var _req$body$data2, id, updatedDate, createdBy, response;
=======
    var _req$body$data2, id, updatedAt, createdBy, response;
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
<<<<<<< HEAD
            _req$body$data2 = req.body.data, id = _req$body$data2.id, updatedDate = _req$body$data2.updatedDate, createdBy = _req$body$data2.createdBy;
            _context4.next = 4;
            return _top["default"].eliminarTop(id, updatedDate, createdBy);
=======
            _req$body$data2 = req.body.data, id = _req$body$data2.id, updatedAt = _req$body$data2.updatedAt, createdBy = _req$body$data2.createdBy;
            _context4.next = 4;
            return _top["default"].eliminarTop(id, updatedAt, createdBy);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

          case 4:
            response = _context4.sent;
            return _context4.abrupt("return", res.status(200).send(response));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            (0, _common.controlError)("eliminarTop", _context4.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context4.t0.message, null, null));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _eliminarTop.apply(this, arguments);
}

function createOrUpdateTopItem(_x9, _x10) {
  return _createOrUpdateTopItem.apply(this, arguments);
}

function _createOrUpdateTopItem() {
  _createOrUpdateTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body$data3, top, lugar, topItem, response;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _req$body$data3 = req.body.data, top = _req$body$data3.top, lugar = _req$body$data3.lugar, topItem = _req$body$data3.topItem;

            if (!(top && lugar && topItem)) {
              _context5.next = 10;
              break;
            }

            _context5.next = 6;
            return _top["default"].createOrUpdateTopItem({
              top: top,
              lugar: lugar,
              topItem: topItem
            });

          case 6:
            response = _context5.sent;
            return _context5.abrupt("return", res.status(200).send(response));

          case 10:
            throw new Error("Asegurese que los parámetros enviados esten completos");

          case 11:
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            (0, _common.controlError)("crearTop", _context5.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context5.t0.message, null, null));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));
  return _createOrUpdateTopItem.apply(this, arguments);
}

function listarTopPublicadoPorUsuario(_x11, _x12) {
  return _listarTopPublicadoPorUsuario.apply(this, arguments);
}

function _listarTopPublicadoPorUsuario() {
  _listarTopPublicadoPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body$data4, createdBy, pageNumber, pageSize, CategoriaId, flagPublicado, response;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _req$body$data4 = req.body.data, createdBy = _req$body$data4.createdBy, pageNumber = _req$body$data4.pageNumber, pageSize = _req$body$data4.pageSize, CategoriaId = _req$body$data4.CategoriaId, flagPublicado = _req$body$data4.flagPublicado;
            _context6.next = 5;
            return _top["default"].listarTopPublicadoPorUsuario({
              createdBy: createdBy,
              pageNumber: pageNumber,
              pageSize: pageSize,
              CategoriaId: CategoriaId,
              flagPublicado: flagPublicado
            });

          case 5:
            response = _context6.sent;
            return _context6.abrupt("return", res.status(200).send(response));

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            (0, _common.controlError)("listarTopPublicadoPorUsuario", _context6.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context6.t0.message, null, null));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return _listarTopPublicadoPorUsuario.apply(this, arguments);
}

function listarTopItemByTop(_x13, _x14) {
  return _listarTopItemByTop.apply(this, arguments);
}

function _listarTopItemByTop() {
  _listarTopItemByTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body$data5, TopId, createdBy, pageNumber, pageSize, flagPublicado, response;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _req$body$data5 = req.body.data, TopId = _req$body$data5.TopId, createdBy = _req$body$data5.createdBy, pageNumber = _req$body$data5.pageNumber, pageSize = _req$body$data5.pageSize, flagPublicado = _req$body$data5.flagPublicado;
            _context7.next = 5;
            return _top["default"].listarTopItemByTop({
              TopId: TopId,
              createdBy: createdBy,
              pageNumber: pageNumber,
              pageSize: pageSize,
              flagPublicado: flagPublicado
            });

          case 5:
            response = _context7.sent;
            return _context7.abrupt("return", res.status(200).send(response));

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            (0, _common.controlError)("listarTopItemByTop", _context7.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context7.t0.message, null, null));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return _listarTopItemByTop.apply(this, arguments);
}

function listarTopItemByLugar(_x15, _x16) {
  return _listarTopItemByLugar.apply(this, arguments);
}

function _listarTopItemByLugar() {
  _listarTopItemByLugar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var _req$body$data6, lugarId, pageNumber, pageSize, response;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _req$body$data6 = req.body.data, lugarId = _req$body$data6.lugarId, pageNumber = _req$body$data6.pageNumber, pageSize = _req$body$data6.pageSize;
            _context8.next = 5;
            return _top["default"].listarTopItemByLugar(lugarId, {
              pageNumber: pageNumber,
              pageSize: pageSize
            });

          case 5:
            response = _context8.sent;
            return _context8.abrupt("return", res.status(200).send(response));

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            (0, _common.controlError)("listarTopItemByLugar", _context8.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context8.t0.message, null, null));

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return _listarTopItemByLugar.apply(this, arguments);
}

function eliminarTopItem(_x17, _x18) {
  return _eliminarTopItem.apply(this, arguments);
}

function _eliminarTopItem() {
  _eliminarTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
<<<<<<< HEAD
    var _req$body$data7, id, updatedDate, createdBy, response;
=======
    var _req$body$data7, id, updatedAt, createdBy, response;
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
<<<<<<< HEAD
            _req$body$data7 = req.body.data, id = _req$body$data7.id, updatedDate = _req$body$data7.updatedDate, createdBy = _req$body$data7.createdBy;
            _context9.next = 4;
            return _top["default"].eliminarTopItem(id, updatedDate, createdBy);
=======
            _req$body$data7 = req.body.data, id = _req$body$data7.id, updatedAt = _req$body$data7.updatedAt, createdBy = _req$body$data7.createdBy;
            _context9.next = 4;
            return _top["default"].eliminarTopItem(id, updatedAt, createdBy);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

          case 4:
            response = _context9.sent;
            return _context9.abrupt("return", res.status(200).send(response));

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            (0, _common.controlError)("eliminarTopItem", _context9.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context9.t0.message, null, null));

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return _eliminarTopItem.apply(this, arguments);
}

function likesTopItem(_x19, _x20) {
  return _likesTopItem.apply(this, arguments);
}

function _likesTopItem() {
  _likesTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
<<<<<<< HEAD
    var _req$body$data8, id, updatedDate, createdBy, flagLike, response;
=======
    var _req$body$data8, id, updatedAt, createdBy, flagLike, response;
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            (0, _common.existeJsonData)(req, res);
<<<<<<< HEAD
            _req$body$data8 = req.body.data, id = _req$body$data8.id, updatedDate = _req$body$data8.updatedDate, createdBy = _req$body$data8.createdBy, flagLike = _req$body$data8.flagLike;
            _context10.next = 5;
            return _top["default"].likesTopItem(id, updatedDate, createdBy, flagLike);
=======
            _req$body$data8 = req.body.data, id = _req$body$data8.id, updatedAt = _req$body$data8.updatedAt, createdBy = _req$body$data8.createdBy, flagLike = _req$body$data8.flagLike;
            _context10.next = 5;
            return _top["default"].likesTopItem(id, updatedAt, createdBy, flagLike);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

          case 5:
            response = _context10.sent;
            return _context10.abrupt("return", res.status(200).send(response));

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](0);
            (0, _common.controlError)("publicarTop", _context10.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context10.t0.message, null, null));

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return _likesTopItem.apply(this, arguments);
}

function uploadFileTopItemDetalle(_x21, _x22) {
  return _uploadFileTopItemDetalle.apply(this, arguments);
}

function _uploadFileTopItemDetalle() {
  _uploadFileTopItemDetalle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res) {
<<<<<<< HEAD
    var files, _req$body, id, path, nameImageDefault, updatedDate, createdBy, response;
=======
    var files, _req$body, id, path, nameImageDefault, updatedAt, createdBy, response;
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            files = req.files.image;
<<<<<<< HEAD
            _req$body = req.body, id = _req$body.id, path = _req$body.path, nameImageDefault = _req$body.nameImageDefault, updatedDate = _req$body.updatedDate, createdBy = _req$body.createdBy;
=======
            _req$body = req.body, id = _req$body.id, path = _req$body.path, nameImageDefault = _req$body.nameImageDefault, updatedAt = _req$body.updatedAt, createdBy = _req$body.createdBy;
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
            files = [].concat(files);
            _context11.next = 6;
            return _top["default"].uploadFileTopItemDetalle({
              id: id,
              path: path,
              nameImageDefault: nameImageDefault,
<<<<<<< HEAD
              updatedDate: updatedDate,
=======
              updatedAt: updatedAt,
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
              createdBy: createdBy
            }, files);

          case 6:
            response = _context11.sent;
            res.status(200).send(response);
            _context11.next = 14;
            break;

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            (0, _common.controlError)("uploadFileTopItemDetalle", _context11.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context11.t0.message, null, null));

          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return _uploadFileTopItemDetalle.apply(this, arguments);
}

function listarTopItemAutocomplete(_x23, _x24) {
  return _listarTopItemAutocomplete.apply(this, arguments);
}

function _listarTopItemAutocomplete() {
  _listarTopItemAutocomplete = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(req, res) {
    var _req$body$data9, pageNumber, pageSize, keyword, response;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _req$body$data9 = req.body.data, pageNumber = _req$body$data9.pageNumber, pageSize = _req$body$data9.pageSize, keyword = _req$body$data9.keyword;
            _context12.next = 5;
            return _top["default"].listarTopItemAutocomplete({
              pageNumber: pageNumber,
              pageSize: pageSize,
              keyword: keyword
            });

          case 5:
            response = _context12.sent;
            return _context12.abrupt("return", res.status(200).send(response));

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](0);
            (0, _common.controlError)("listarTopItemAutocomplete", _context12.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context12.t0.message, null, null));

          case 13:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 9]]);
  }));
  return _listarTopItemAutocomplete.apply(this, arguments);
}

function listarOptionsAutocomplete(_x25, _x26) {
  return _listarOptionsAutocomplete.apply(this, arguments);
}

function _listarOptionsAutocomplete() {
  _listarOptionsAutocomplete = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(req, res) {
    var keyword, response;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            (0, _common.existeJsonData)(req, res);
            keyword = req.body.data.keyword;
            _context13.next = 5;
            return _top["default"].listarOptionsAutocomplete(keyword);

          case 5:
            response = _context13.sent;
            return _context13.abrupt("return", res.status(200).send(response));

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](0);
            (0, _common.controlError)("listarOptionsAutocomplete", _context13.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context13.t0.message, null, null));

          case 13:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 9]]);
  }));
  return _listarOptionsAutocomplete.apply(this, arguments);
}

function listarTopByLugarByCategoria(_x27, _x28) {
  return _listarTopByLugarByCategoria.apply(this, arguments);
}

function _listarTopByLugarByCategoria() {
  _listarTopByLugarByCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(req, res) {
    var _req$body$data10, LugarId, categoriaId, response;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            (0, _common.existeJsonData)(req, res);
            _req$body$data10 = req.body.data, LugarId = _req$body$data10.LugarId, categoriaId = _req$body$data10.categoriaId;
            _context14.next = 5;
            return _top["default"].listarTopByLugarByCategoria(LugarId, categoriaId);

          case 5:
            response = _context14.sent;
            return _context14.abrupt("return", res.status(200).send(response));

          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14["catch"](0);
            (0, _common.controlError)("listarTopByLugarByCategoria", _context14.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context14.t0.message, null, null));

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 9]]);
  }));
  return _listarTopByLugarByCategoria.apply(this, arguments);
}

function getOneTop(_x29, _x30) {
  return _getOneTop.apply(this, arguments);
}

function _getOneTop() {
  _getOneTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(req, res) {
    var id, createdBy, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            (0, _common.existeJsonData)(req, res);
            id = req.params.id;
            createdBy = req.body.data.createdBy;
            _context15.next = 6;
            return _top["default"].getOneTop(id, createdBy);

          case 6:
            response = _context15.sent;
            return _context15.abrupt("return", res.status(200).send(response));

          case 10:
            _context15.prev = 10;
            _context15.t0 = _context15["catch"](0);
            (0, _common.controlError)("listarTopGeneral", _context15.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context15.t0.message, null, null));

          case 14:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return _getOneTop.apply(this, arguments);
}

function getOneTopItem(_x31, _x32) {
  return _getOneTopItem.apply(this, arguments);
}

function _getOneTopItem() {
  _getOneTopItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16(req, res) {
    var id, createdBy, response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            (0, _common.existeJsonData)(req, res);
            id = req.params.id;
            createdBy = req.body.data.createdBy;
            _context16.next = 6;
            return _top["default"].getOneTopItem(id, createdBy);

          case 6:
            response = _context16.sent;
            return _context16.abrupt("return", res.status(200).send(response));

          case 10:
            _context16.prev = 10;
            _context16.t0 = _context16["catch"](0);
            (0, _common.controlError)("getOneTopItem", _context16.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context16.t0.message, null, null));

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return _getOneTopItem.apply(this, arguments);
}

function listarTopDetallePorTop(_x33, _x34) {
  return _listarTopDetallePorTop.apply(this, arguments);
}

function _listarTopDetallePorTop() {
  _listarTopDetallePorTop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17(req, res) {
    var id, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            id = req.body.data.id;
            _context17.next = 4;
            return _top["default"].listarTopDetallePorTop(id);

          case 4:
            response = _context17.sent;
            return _context17.abrupt("return", res.status(200).send(response));

          case 8:
            _context17.prev = 8;
            _context17.t0 = _context17["catch"](0);
            (0, _common.controlError)("listarTopDetallePorTop", _context17.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context17.t0.message, null, null));

          case 12:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 8]]);
  }));
  return _listarTopDetallePorTop.apply(this, arguments);
}

function listarTopPorUsuarioPorCategoria(_x35, _x36) {
  return _listarTopPorUsuarioPorCategoria.apply(this, arguments);
}

function _listarTopPorUsuarioPorCategoria() {
  _listarTopPorUsuarioPorCategoria = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(req, res) {
    var _req$body$data11, categoriaId, correoElectronico, response;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _req$body$data11 = req.body.data, categoriaId = _req$body$data11.categoriaId, correoElectronico = _req$body$data11.correoElectronico;
            _context18.next = 4;
            return _top["default"].listarTopPorUsuarioPorCategoria(categoriaId, correoElectronico);

          case 4:
            response = _context18.sent;
            return _context18.abrupt("return", res.status(200).send(response));

          case 8:
            _context18.prev = 8;
            _context18.t0 = _context18["catch"](0);
            (0, _common.controlError)("listarTopPorUsuarioPorCategoria", _context18.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context18.t0.message, null, null));

          case 12:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 8]]);
  }));
  return _listarTopPorUsuarioPorCategoria.apply(this, arguments);
}

function listarTopPorUsuarioPorFiltro(_x37, _x38) {
  return _listarTopPorUsuarioPorFiltro.apply(this, arguments);
}

function _listarTopPorUsuarioPorFiltro() {
  _listarTopPorUsuarioPorFiltro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19(req, res) {
    var _req$body$data12, filtro, correoElectronico, response;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _req$body$data12 = req.body.data, filtro = _req$body$data12.filtro, correoElectronico = _req$body$data12.correoElectronico;
            _context19.next = 4;
            return _top["default"].listarTopPorUsuarioPorFiltro(filtro, correoElectronico);

          case 4:
            response = _context19.sent;
            return _context19.abrupt("return", res.status(200).send(response));

          case 8:
            _context19.prev = 8;
            _context19.t0 = _context19["catch"](0);
            (0, _common.controlError)("listarTopPorUsuarioPorFiltro", _context19.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context19.t0.message, null, null));

          case 12:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 8]]);
  }));
  return _listarTopPorUsuarioPorFiltro.apply(this, arguments);
}

function listarTopGeneral(_x39, _x40) {
  return _listarTopGeneral.apply(this, arguments);
}

function _listarTopGeneral() {
  _listarTopGeneral = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee20(req, res) {
    var _req$body$data13, categoriaId, cantidad, response;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _req$body$data13 = req.body.data, categoriaId = _req$body$data13.categoriaId, cantidad = _req$body$data13.cantidad;
            _context20.next = 4;
            return _top["default"].listarTopGeneral(categoriaId, cantidad);

          case 4:
            response = _context20.sent;
            return _context20.abrupt("return", res.status(200).send(response));

          case 8:
            _context20.prev = 8;
            _context20.t0 = _context20["catch"](0);
            (0, _common.controlError)("listarTopGeneral", _context20.t0);
            res.status(500).send((0, _common.buildContainer)(false, _context20.t0.message, null, null));

          case 12:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 8]]);
  }));
  return _listarTopGeneral.apply(this, arguments);
}

module.exports = {
  createOrUpdateTop: createOrUpdateTop,
  listarTopPorUsuario: listarTopPorUsuario,
  listarTopDetallePorTop: listarTopDetallePorTop,
  eliminarTop: eliminarTop,
  createOrUpdateTopItem: createOrUpdateTopItem,
  listarTopItemByLugar: listarTopItemByLugar,
  eliminarTopItem: eliminarTopItem,
  uploadFileTopItemDetalle: uploadFileTopItemDetalle,
  listarTopItemAutocomplete: listarTopItemAutocomplete,
  listarOptionsAutocomplete: listarOptionsAutocomplete,
  likesTopItem: likesTopItem,
  listarTopPorUsuarioPorCategoria: listarTopPorUsuarioPorCategoria,
  listarTopPorUsuarioPorFiltro: listarTopPorUsuarioPorFiltro,
  publicarTop: publicarTop,
  listarTopGeneral: listarTopGeneral,
  getOneTop: getOneTop,
  getOneTopItem: getOneTopItem,
  listarTopByLugarByCategoria: listarTopByLugarByCategoria,
  listarTopPublicadoPorUsuario: listarTopPublicadoPorUsuario,
  listarTopItemByTop: listarTopItemByTop
};