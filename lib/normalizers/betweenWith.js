"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('betweenWith', function (value, _a, _, values) {
    var min = _a.min, max = _a.max;
    if (utils_1.hasProp(values, min) &&
        utils_1.hasProp(values, max) &&
        utils_1.isNumeric(values[min]) &&
        utils_1.isNumeric(values[max]) &&
        utils_1.isNumeric(value)) {
        var _value = parseFloat(value);
        var _min = parseFloat(values[min]);
        var _max = parseFloat(values[max]);
        return Math.min(Math.max(_value, _min), _max);
    }
    return value;
});
