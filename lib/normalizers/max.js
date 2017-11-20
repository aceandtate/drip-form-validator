"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('max', function (value, max) {
    if (value === Infinity) {
        return max;
    }
    else if (utils_1.isNumeric(value)) {
        return Math.min(parseFloat(value), max);
    }
    return value;
});
