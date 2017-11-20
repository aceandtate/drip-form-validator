"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash.isequal");
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('equals', function (value, _a) {
    var _value = _a.value;
    return isEqual(value, _value);
}, {
    mapArgsToParams: function (value) { return ({ value: value }); },
});
