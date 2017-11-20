"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('required', function (value, _, field, values) {
    return utils_1.hasProp(values, field) && utils_1.isNumeric(value) ? true : !utils_1.isEmpty(value);
}, {
    implicit: false,
});
