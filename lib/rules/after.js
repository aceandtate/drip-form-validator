"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAfter = require("date-fns/is_after");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('after', function (value, _a) {
    var date = _a.date;
    if (!utils_1.isString(value) && !utils_1.isNumber(value) && !utils_1.isDate(value)) {
        return false;
    }
    return isAfter(value, date);
}, {
    mapArgsToParams: function (date) { return ({ date: date }); },
});
