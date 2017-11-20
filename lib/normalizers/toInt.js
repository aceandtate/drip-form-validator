"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('toInt', function (value, params) {
    if (utils_1.isString(value) || (utils_1.isNumber(value) && value !== Infinity)) {
        return parseInt("" + value, params.radix || 10);
    }
    return value;
});
