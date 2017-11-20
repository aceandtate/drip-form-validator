"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('alpha', function (value) {
    return /^[A-Za-z]+$/.test(value);
}, {
    depends: { string: true },
});
