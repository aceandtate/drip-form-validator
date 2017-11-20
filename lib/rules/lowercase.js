"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isLowercase = require("validator/lib/isLowercase");
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('lowercase', function (value) {
    return isLowercase(value);
}, {
    depends: { string: true },
});
