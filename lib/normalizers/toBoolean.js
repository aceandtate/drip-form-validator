"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerNormalizer('toBoolean', function (value) {
    return value ? value !== 'false' && value !== '0' : !!value;
});
