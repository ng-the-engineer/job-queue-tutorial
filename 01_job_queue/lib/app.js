"use strict";

var _job = _interopRequireDefault(require("./job"));

var _queue = _interopRequireDefault(require("./queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_queue.default.on('ready', () => {
  var job1 = (0, _job.default)('Job 1');
  var job2 = (0, _job.default)('Job 2');
});