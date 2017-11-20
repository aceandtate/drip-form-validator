"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("../Validator");
var utils_1 = require("../internal/utils");
Validator_1.default.registerRule('array', function (value) { return utils_1.isArray(value); });
