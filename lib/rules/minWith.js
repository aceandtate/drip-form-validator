"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dot = require("dot-wild");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('minWith', function (value, _a, _, values) {
    var key = _a.key;
    if (!dot.has(values, key)) {
        return false;
    }
    var min = dot.get(values, key);
    if (!utils_1.isNumeric(min)) {
        return false;
    }
    min = parseFloat(min);
    if (utils_1.isNumeric(value)) {
        return parseFloat(value) >= min;
    }
    else if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length >= min;
    }
    return false;
}, {
    mapArgsToParams: function (key, v) { return ({
        key: key,
        label: v.getLabel(key),
    }); },
});
