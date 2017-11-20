"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
// Based by: https://github.com/chriso/validator.js/blob/master/src/lib/util/toString.js
Validator_1.default.registerNormalizer('toString', function (value) {
    var result = value;
    if (typeof value === 'object' && value !== null) {
        result = typeof value.toString === 'function' ? value.toString() : '[object Object]';
    }
    else if (value === null || typeof value === 'undefined' || (isNaN(value) && !value.length)) {
        result = '';
    }
    return String(result);
});
