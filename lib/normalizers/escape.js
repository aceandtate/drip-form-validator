"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var escape = require("validator/lib/escape");
var Validator_1 = require("../Validator");
Validator_1.default.registerNormalizer('escape', function (value) {
    return escape(value);
}, {
    depends: { toString: true },
});
