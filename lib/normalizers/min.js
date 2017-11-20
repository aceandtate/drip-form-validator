"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('min', function (value, min) {
    if (utils_1.isNumeric(value)) {
        return Math.max(parseFloat(value), min);
    }
    return value;
});
