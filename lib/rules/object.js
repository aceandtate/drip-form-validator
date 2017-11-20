"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject = require("lodash.isplainobject");
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('object', function (value) { return isPlainObject(value); });
