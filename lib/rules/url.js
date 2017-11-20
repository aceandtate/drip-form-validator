"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject = require("lodash.isplainobject");
var isURL = require("validator/lib/isURL");
var Validator_1 = require("../Validator");
Validator_1.default.registerRule('url', function (value, params) {
    return isURL(value, __assign({ require_protocol: true }, (isPlainObject(params) ? params : {})));
}, {
    depends: { string: true },
});
