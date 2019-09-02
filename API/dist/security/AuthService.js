"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var secret = 's3cr3t'; //Never set up in static files as it but process.env.secret

var _expiresIn = 15; // 60 * 60 * 24 expires in 24 hours

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

function existeToken(_x2) {
  return _existeToken.apply(this, arguments);
}

function _existeToken() {
  _existeToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(token) {
    var arrToken;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arrToken = [];

            if (token) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", arrToken);

          case 3:
            token = authorization.split(' ')[1]; //Because Authorization is equals to a string like 'Bearer [jwt]'

            _context2.next = 6;
            return jwt.verify(token, secret);

          case 6:
            arrToken = _context2.sent;
            return _context2.abrupt("return", arrToken);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _existeToken.apply(this, arguments);
}

module.exports = {
  generateToken: generateToken,
  existeToken: existeToken
};