"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('natural', function (value, params) {
    var disallowZero = params && params.disallowZero;
    return utils_1.isInteger(value) && (disallowZero ? value > 0 : value >= 0);
}, {
    depends: { number: true },
});
