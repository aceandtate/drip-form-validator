"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('minWith', function (value, key, _, values) {
    if (utils_1.hasProp(values, key) && utils_1.isNumeric(values[key]) && utils_1.isNumeric(value)) {
        return Math.max(parseFloat(values[key]), parseFloat(value));
    }
    return value;
});
