"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateParse = require("date-fns/parse");
var dateFormat = require("date-fns/format");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('time', function (value) {
    if (!utils_1.isString(value) && !utils_1.isNumeric(value)) {
        return false;
    }
    var date = dateParse("2010-01-01 " + value);
    return date && dateFormat(date, 'HH:mm:ss') === value;
});
