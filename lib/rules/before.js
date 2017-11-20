"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isBefore = require("date-fns/is_before");
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('before', function (value, _a) {
    var date = _a.date;
    if (!utils_1.isString(value) && !utils_1.isNumber(value) && !utils_1.isDate(value)) {
        return false;
    }
    return isBefore(value, date);
}, {
    mapArgsToParams: function (date) { return ({ date: date }); },
});
