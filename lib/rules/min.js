"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('min', function (value, _a) {
    var min = _a.min;
    if (utils_1.isNumeric(value)) {
        return parseFloat(value) >= min;
    }
    else if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length >= min;
    }
    else {
        return false;
    }
}, {
    mapArgsToParams: function (min) { return ({ min: min }); },
});
