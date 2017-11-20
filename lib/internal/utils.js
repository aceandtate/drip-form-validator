"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isEmpty = require("lodash.isempty");
exports.hasProp = function (obj, name) { return obj.hasOwnProperty(name); };
exports.typeOf = function (val) {
    if (val === undefined) {
        return 'undefined';
    }
    else if (val === null) {
        return 'null';
    }
    else if (val === false || val === true) {
        return 'boolean';
    }
    else if (typeof val === 'string') {
        return 'string';
    }
    else if (typeof val === 'object' && Array.isArray(val)) {
        return 'array';
    }
    return val.constructor.name.toLowerCase();
};
exports.isBoolean = function (val) { return exports.typeOf(val) === 'boolean'; };
exports.isString = function (val) { return exports.typeOf(val) === 'string'; };
exports.isNumber = function (val) { return exports.typeOf(val) === 'number'; };
exports.isArray = function (val) { return Array.isArray(val); };
exports.isDate = function (val) { return exports.typeOf(val) === 'date'; };
exports.isFunction = function (val) { return !!(val && val.constructor && val.call && val.apply); };
exports.isPromise = function (val) { return !!(val && exports.isFunction(val.then)); };
exports.isNumeric = function (val) { return !exports.isArray(val) && (val - parseFloat(val) + 1) >= 0; };
exports.isInteger = function (val) { return Number(val) === val && val % 1 === 0; };
exports.isFloat = function (val) { return Number(val) === val && val % 1 !== 0; };
exports.weakTypeOf = function (val) {
    if (exports.isNumeric(val)) {
        return 'number';
    }
    return exports.typeOf(val);
};
exports.isEmpty = function (val) {
    if (exports.isDate(val))
        return false;
    if (exports.isBoolean(val))
        return !val;
    if (exports.isNumeric(val) && parseFloat(val) !== 0)
        return false;
    return _isEmpty(val);
};
exports.template = function (format, data) { return (format.replace(/{{([\s\S]+?)}}/g, function (_, key) { return data && exports.hasProp(data, key) ? data[key] : ''; })); };
