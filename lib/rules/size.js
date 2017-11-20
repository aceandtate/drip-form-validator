"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('size', function (value, _a) {
    var _value = _a.value;
    if (utils_1.isString(value) || utils_1.isArray(value)) {
        return value.length === _value;
    }
    else if (utils_1.isNumber(value)) {
        return value === _value;
    }
    else {
        return false;
    }
}, {
    mapArgsToParams: function (value) { return ({ value: value }); },
});
