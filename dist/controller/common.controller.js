"use strict";

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("../utilitarios/constants");

var _parametro = require("../controller/parametro.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//File system
var Cryptr = require('cryptr');

//Para que cuando el archivo sea subido al bucket este pueda ser accedido publicamente
var FILE_PERMISSION = 'public-read';

function controlError(from, error) {
  console.log(from, " error message =>", error.message);
  console.log(from, " error stack =>", error.stack);
}

function emptyS3Directory(_x, _x2) {
  return _emptyS3Directory.apply(this, arguments);
}

function _emptyS3Directory() {
  _emptyS3Directory = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(bucket, dir) {
    var listParams, listedObjects, deleteParams;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            listParams = {
              Bucket: bucket,
              Prefix: dir
            };
            _context.next = 3;
            return s3.listObjectsV2(listParams).promise();

          case 3:
            listedObjects = _context.sent;

            if (!(listedObjects.Contents.length === 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            deleteParams = {
              Bucket: bucket,
              Delete: {
                Objects: []
              }
            };
            listedObjects.Contents.forEach(function (_ref) {
              var Key = _ref.Key;
              deleteParams.Delete.Objects.push({
                Key: Key
              });
            });
            _context.next = 10;
            return s3.deleteObjects(deleteParams).promise();

          case 10:
            if (!listedObjects.IsTruncated) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return emptyS3Directory(bucket, dir);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _emptyS3Directory.apply(this, arguments);
}

function uploadToS3(_x3, _x4, _x5) {
  return _uploadToS.apply(this, arguments);
}

function _uploadToS() {
  _uploadToS = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(filePath, bucketName, key) {
    var paramKeyId, paramACCESS_KEY, accessKeyId, secretAccessKey, s3bucket, params, s3Response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _parametro.obtenerParametro)(_constants.aws_config_s3.ACCESS_KEY_ID);

          case 3:
            paramKeyId = _context2.sent;
            _context2.next = 6;
            return (0, _parametro.obtenerParametro)(_constants.aws_config_s3.SECRET_ACCESS_KEY);

          case 6:
            paramACCESS_KEY = _context2.sent;

            if (!(!paramKeyId || !paramACCESS_KEY)) {
              _context2.next = 9;
              break;
            }

            throw new Error("par\xE1metro ".concat(_constants.aws_config_s3.ACCESS_KEY_ID, " y/\xF3 ").concat(_constants.aws_config_s3.SECRET_ACCESS_KEY, " no existen"));

          case 9:
            _context2.next = 11;
            return decryptedAES256ctr(paramKeyId.value);

          case 11:
            accessKeyId = _context2.sent;
            _context2.next = 14;
            return decryptedAES256ctr(paramACCESS_KEY.value);

          case 14:
            secretAccessKey = _context2.sent;
            s3bucket = new _awsSdk["default"].S3({
              accessKeyId: accessKeyId,
              secretAccessKey: secretAccessKey,
              Bucket: bucketName,
              ACL: FILE_PERMISSION
            });
            params = {
              Bucket: bucketName,
              Key: key,
              Body: filePath.data,
              ACL: FILE_PERMISSION
            }; // s3bucket.upload(params, function (err, data) {
            //     if (err) throw err;
            //     console.log(data);
            //     return data;
            // });

            _context2.next = 19;
            return s3bucket.upload(params).promise();

          case 19:
            s3Response = _context2.sent;
            return _context2.abrupt("return", s3Response);

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](0);
            console.log('uploadToS3 error:', _context2.t0);
            throw _context2.t0;

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 23]]);
  }));
  return _uploadToS.apply(this, arguments);
}

function downloadFromS3(_x6, _x7) {
  return _downloadFromS.apply(this, arguments);
}

function _downloadFromS() {
  _downloadFromS = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(bucketName, key) {
    var paramKeyId, accessKeyId, paramACCESS_KEY, secretAccessKey, s3bucket, params;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            paramKeyId = (0, _parametro.obtenerParametro)(_constants.aws_config_s3.ACCESS_KEY_ID);
            _context3.next = 4;
            return decryptedAES256ctr(paramKeyId.Valor);

          case 4:
            accessKeyId = _context3.sent;
            paramACCESS_KEY = (0, _parametro.obtenerParametro)(_constants.aws_config_s3.SECRET_ACCESS_KEY);
            _context3.next = 8;
            return decryptedAES256ctr(paramACCESS_KEY.Valor);

          case 8:
            secretAccessKey = _context3.sent;
            s3bucket = new _awsSdk["default"].S3({
              accessKeyId: accessKeyId,
              secretAccessKey: secretAccessKey,
              Bucket: bucketName,
              ACL: FILE_PERMISSION
            });
            params = {
              Bucket: bucketName,
              Key: key
            };
            s3bucket.getObject(params, function (err, data) {
              if (err) throw err;
              console.log(data);
              return data;
            });
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            console.log('downloadFromS3 error:', _context3.t0);
            throw _context3.t0;

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return _downloadFromS.apply(this, arguments);
}

;

function encryptAES256ctr(_x8) {
  return _encryptAES256ctr.apply(this, arguments);
}

function _encryptAES256ctr() {
  _encryptAES256ctr = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(texto) {
    var cryptr, encryptedString;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cryptr = new Cryptr(_constants.SECRET_KEY_ENCRYPT);

            if (!texto) {
              _context4.next = 4;
              break;
            }

            encryptedString = cryptr.encrypt(texto);
            return _context4.abrupt("return", encryptedString);

          case 4:
            throw new Error("encryptAES256ctr(error): param no cumple condiciones. valor = ".concat(texto));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _encryptAES256ctr.apply(this, arguments);
}

function decryptedAES256ctr(_x9) {
  return _decryptedAES256ctr.apply(this, arguments);
}

function _decryptedAES256ctr() {
  _decryptedAES256ctr = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(texto) {
    var cryptr, decryptedString;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cryptr = new Cryptr(_constants.SECRET_KEY_ENCRYPT);

            if (!texto) {
              _context5.next = 4;
              break;
            }

            decryptedString = cryptr.decrypt(texto);
            return _context5.abrupt("return", decryptedString);

          case 4:
            throw new Error("decryptedAES256ctr(error): param no cumple condiciones. valor = ".concat(texto));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _decryptedAES256ctr.apply(this, arguments);
}

function existeJsonData(req, res) {
  var data = req.body.data;

  if (!data) {
    throw new Error('Cuerpo JSON "data" no esta definido.');
  }
}

function buildContainer(ok, message, data, token) {
  var dataJSON = {
    ok: ok,
    message: message,
    data: data,
    token: token
  };
  return dataJSON;
}

module.exports = {
  uploadToS3: uploadToS3,
  downloadFromS3: downloadFromS3,
  encryptAES256ctr: encryptAES256ctr,
  decryptedAES256ctr: decryptedAES256ctr,
  buildContainer: buildContainer,
  existeJsonData: existeJsonData,
  controlError: controlError
};