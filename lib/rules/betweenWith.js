"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dot = require("dot-wild");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('betweenWith', function (value, _a, _, values) {
    var min = _a.min, max = _a.max;
    if (!dot.has(values, min) || !dot.has(values, max)) {
        return false;
    }
    var minValue = dot.get(values, min);
    var maxValue = dot.get(values, max);
    if (!utils_1.isNumeric(minValue) || !utils_1.isNumeric(maxValue)) {
        return false;
    }
    minValue = parseFloat(minValue);
    maxValue = parseFloat(maxValue);
    if (utils_1.isNumeric(value)) {
        var v = parseFloat(value);
        return v >= minValue && v <= maxValue;
    }
    else if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length >= minValue && value.length <= maxValue;
    }
    return false;
}, {
    mapArgsToParams: function (_a, v) {
        var min = _a.min, max = _a.max;
        return ({
            min: min,
            max: max,
            minLabel: v.getLabel(min),
            maxLabel: v.getLabel(max),
        });
    },
});
