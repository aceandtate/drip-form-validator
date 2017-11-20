"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('falsy', function (value) {
    return ['no', '0', 'false'].indexOf(("" + value).toLowerCase()) > -1;
});
