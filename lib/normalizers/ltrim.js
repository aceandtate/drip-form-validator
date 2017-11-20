"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ltrim = require("validator/lib/ltrim");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('ltrim', function (value, chars) {
    if (!utils_1.isString(value) && !utils_1.isNumber(value)) {
        return value;
    }
    return ltrim("" + value, utils_1.isString(chars) ? chars : undefined);
});
