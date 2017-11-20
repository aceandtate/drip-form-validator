"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dot = require("dot-wild");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('maxWith', function (value, _a, _, values) {
    var key = _a.key;
    if (!dot.has(values, key)) {
        return false;
    }
    var max = dot.get(values, key);
    if (!utils_1.isNumeric(max)) {
        return false;
    }
    max = parseFloat(max);
    if (utils_1.isNumeric(value)) {
        return parseFloat(value) <= max;
    }
    else if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length <= max;
    }
    return false;
}, {
    mapArgsToParams: function (key, v) { return ({
        key: key,
        label: v.getLabel(key),
    }); },
});
