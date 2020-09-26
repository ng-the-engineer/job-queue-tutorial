"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beeQueue = _interopRequireDefault(require("bee-queue"));

var _random = _interopRequireDefault(require("./random"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var threshold = 4.5;
var queue = new _beeQueue.default('my-awesome-queue', {
  activateDelayedJobs: true
});
queue.process(function (job, done) {
  var k = (0, _random.default)();

  if (k > threshold) {
    return done(Error("Random value ".concat(k, " > threshold ").concat(threshold)));
  }

  return done(null, k);
});
var _default = queue;
exports.default = _default;