"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('notIn', function (value, _a) {
    var values = _a.values;
    return values.indexOf(value) < 0;
}, {
    mapArgsToParams: function (values) { return ({ values: values }); },
});
