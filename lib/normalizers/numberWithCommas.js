"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerNormalizer('numberWithCommas', function (value) {
    if (!utils_1.isString(value) && !utils_1.isNumber(value)) {
        return value;
    }
    var num = parseFloat(("" + value).replace(/,/g, ''));
    if (isNaN(num)) {
        return value;
    }
    var tokens = ("" + num).split('.');
    tokens[0] = tokens[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return tokens.join('.');
});
