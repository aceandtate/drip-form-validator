"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trim = require("validator/lib/trim");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('trim', function (value, chars) {
    if (!utils_1.isString(value) && !utils_1.isNumber(value)) {
        return value;
    }
    return trim("" + value, utils_1.isString(chars) ? chars : undefined);
});
