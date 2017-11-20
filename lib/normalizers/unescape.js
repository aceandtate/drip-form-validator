"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unescape = require("validator/lib/unescape");
var Validator_1 = require("../Validator");
Validator_1.default.registerNormalizer('unescape', function (value) {
    return unescape(value);
}, {
    depends: { toString: true },
});
