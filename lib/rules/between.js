"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('between', function (value, _a) {
    var min = _a.min, max = _a.max;
    if (utils_1.isNumeric(value)) {
        var num = parseFloat(value);
        return num >= min && num <= max;
    }
    else if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length >= min && value.length <= max;
    }
    else {
        return false;
    }
});
