"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreCommit = void 0;
var exec = require("child_process").exec;
var util = require("util");
var promisifiedExec = util.promisify(exec);
var PreCommit = /** @class */ (function () {
    function PreCommit() {
    }
    PreCommit.prototype.getCurrentBranch = function () {
        return promisifiedExec("git rev-parse --abbrev-ref HEAD");
    };
    PreCommit.prototype.resetAndExit = function (message) {
        if (message)
            console.error(message);
        else
            console.error('Pre-Commit failed.');
        process.exit(1);
    };
    return PreCommit;
}());
exports.PreCommit = PreCommit;
