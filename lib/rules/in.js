"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('in', function (value, _a) {
    var values = _a.values;
    return values.indexOf(value) > -1;
}, {
    mapArgsToParams: function (values) { return ({ values: values }); },
});
