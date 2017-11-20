"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('format', function (value, _a) {
    var regex = _a.regex;
    return (utils_1.isString(value) || utils_1.isNumber(value)) && regex.test("" + value);
}, {
    mapArgsToParams: function (regex) { return ({ regex: regex }); },
});
