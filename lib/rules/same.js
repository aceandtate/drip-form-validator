"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash.isequal");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('same', function (value, _a, _, values) {
    var key = _a.key;
    return utils_1.hasProp(values, key) && isEqual(value, values[key]);
}, {
    mapArgsToParams: function (key, v) { return ({
        key: key,
        label: v.getLabel(key),
    }); },
});
