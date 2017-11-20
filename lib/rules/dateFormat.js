"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateParse = require("date-fns/parse");
var dateFormat = require("date-fns/format");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('dateFormat', function (value, _a) {
    var format = _a.format;
    if (!utils_1.isString(value) && !utils_1.isNumeric(value)) {
        return false;
    }
    var date = dateParse(value);
    return date && dateFormat(date, format) === value;
}, {
    mapArgsToParams: function (format) { return ({ format: format }); },
});
