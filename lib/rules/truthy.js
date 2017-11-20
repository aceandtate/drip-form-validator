"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('truthy', function (value) {
    return ['yes', '1', 'true', 'ok', 'okay'].indexOf(("" + value).toLowerCase()) > -1;
});
