"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isUppercase = require("validator/lib/isUppercase");
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('uppercase', function (value) {
    return isUppercase(value);
}, {
    depends: { string: true },
});
