"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('max', function (value, _a) {
    var max = _a.max;
    if (utils_1.isNumeric(value)) {
        return parseFloat(value) <= max;
    }
    else if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length <= max;
    }
    else {
        return false;
    }
}, {
    mapArgsToParams: function (max) { return ({ max: max }); },
});
