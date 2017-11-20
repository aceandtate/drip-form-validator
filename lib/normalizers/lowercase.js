"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerNormalizer('lowercase', function (value) {
    return value.toLowerCase();
}, {
    depends: { toString: true },
});
