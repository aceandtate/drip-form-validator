"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerNormalizer('uppercase', function (value) {
    return value.toUpperCase();
}, {
    depends: { toString: true },
});
