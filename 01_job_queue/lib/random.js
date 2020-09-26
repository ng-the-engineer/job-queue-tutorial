"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gaussian = _interopRequireDefault(require("gaussian"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateRandomNumber = () => {
  var mean = 5;
  var variance = 1;
  var decimalPlace = 3;
  var distribution = (0, _gaussian.default)(mean, variance);
  return distribution.ppf(Math.random()).toFixed(decimalPlace);
};

var _default = generateRandomNumber;
exports.default = _default;