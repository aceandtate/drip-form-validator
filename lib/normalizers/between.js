"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('between', function (value, _a) {
    var min = _a.min, max = _a.max;
    if (utils_1.isNumeric(value)) {
        return Math.min(Math.max(parseFloat(value), min), max);
    }
    return value;
});
