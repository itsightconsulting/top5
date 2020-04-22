"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var secret = process.env.jwtsecret || 's3cr3t'; //Never set up in static files as it but process.env.secret
<<<<<<< HEAD

var _expiresIn = '20d'; // 60 * 60 * 1; //expires in 1 hours
// const _expiresIn = '20d';
=======
// const _expiresIn = '7d';// 60 * 60 * 1; //expires in 1 hours

var _expiresIn = '20d';
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

function generateToken(_x) {
  return _generateToken.apply(this, arguments);
}

function _generateToken() {
  _generateToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_data) {
    var tokenData, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenData = _data;
            _context.next = 3;
            return jwt.sign(tokenData, secret, {
              expiresIn: _expiresIn
            });

          case 3:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateToken.apply(this, arguments);
}

function obtenerTokenDecoded(_x2) {
  return _obtenerTokenDecoded.apply(this, arguments);
}

function _obtenerTokenDecoded() {
  _obtenerTokenDecoded = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(token) {
    var decoded;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return jwt.verify(token, secret);

          case 2:
            decoded = _context2.sent;
            return _context2.abrupt("return", decoded);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _obtenerTokenDecoded.apply(this, arguments);
}

function existeToken(_x3, _x4, _x5) {
  return _existeToken.apply(this, arguments);
}

function _existeToken() {
  _existeToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var authorization, token, decoded;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

<<<<<<< HEAD
            if (!(process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test")) {
=======
            if (!(process.env.NODE_ENV == "production")) {
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
              _context3.next = 16;
              break;
            }

            authorization = req.headers['authorization'];

            if (authorization) {
              _context3.next = 5;
              break;
            }

            throw new Error("Es necesario el token de autenticación");

          case 5:
            token = authorization.split(' ')[1]; //Because Authorization is equals to a string like 'Bearer [jwt]'

            _context3.next = 8;
            return jwt.verify(token, secret);

          case 8:
            decoded = _context3.sent;

            if (decoded) {
              _context3.next = 13;
              break;
            }

            throw new Error("Token inválido");

          case 13:
            next();

          case 14:
            _context3.next = 17;
            break;

          case 16:
<<<<<<< HEAD
            if (process.env.NODE_ENV == "development") {
              next();
            }
=======
            next();
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(401).send({
              ok: false,
              message: _context3.t0.message,
              data: null,
              token: null
            }));

<<<<<<< HEAD
          case 22:
=======
          case 18:
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
          case "end":
            return _context3.stop();
        }
      }
<<<<<<< HEAD
    }, _callee3, null, [[0, 19]]);
=======
    }, _callee3, null, [[0, 15]]);
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
  }));
  return _existeToken.apply(this, arguments);
}

module.exports = {
  generateToken: generateToken,
  existeToken: existeToken,
  obtenerTokenDecoded: obtenerTokenDecoded
};