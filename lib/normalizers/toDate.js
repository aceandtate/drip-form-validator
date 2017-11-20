"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse = require("date-fns/parse");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('toDate', function (value) {
    if (!utils_1.isString(value)) {
        return value;
    }
    return parse(value);
});
