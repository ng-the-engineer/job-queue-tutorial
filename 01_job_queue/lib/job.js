"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _queue = _interopRequireDefault(require("./queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var retryCount = 20;

var lineUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (payload) {
    var job = yield _queue.default.createJob(payload).backoff('fixed', 1000).retries(retryCount).save();
    console.log("".concat(new Date().toISOString(), " jobId: ").concat(job.id, " is placed in queue."));
    job.on('succeeded', result => {
      console.log("".concat(new Date().toISOString(), " jobId: ").concat(job.id, " received good result ").concat(result, "."));
    });
    job.on('retrying', err => {
      console.log("".concat(new Date().toISOString(), " jobId: ").concat(job.id, " failed as ").concat(err.message, " but is gonna retry! (Retry count: ").concat(retryCount - job.options.retries, ")"));
    });
    return job;
  });

  return function lineUp(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = lineUp;
exports.default = _default;