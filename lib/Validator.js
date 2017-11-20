"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var invariant = require("invariant");
var forEach = require("lodash.foreach");
var map = require("lodash.map");
var isPlainObject = require("lodash.isplainobject");
var dot = require("dot-wild");
var EventTypes = require("./eventTypes");
var utils_1 = require("./internal/utils");
var defaultOptions = {
    messages: {},
    normalizers: {},
};
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    function Validator(values, rules, options) {
        if (values === void 0) { values = {}; }
        if (rules === void 0) { rules = {}; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        /**
         * Instance
         */
        _this._validating = false;
        _this._errors = {};
        _this._normalizers = {};
        _this._messages = {};
        _this._labels = {};
        var opts = __assign({}, defaultOptions, options);
        if (opts.normalizers)
            _this.setNormalizers(opts.normalizers);
        if (opts.messages)
            _this.setMessages(opts.messages);
        if (opts.labels)
            _this.setLabels(opts.labels);
        _this.setValues(values);
        _this.setRules(rules);
        return _this;
    }
    /**
     * Locale
     */
    Validator.defineLocale = function (locale, messages) {
        var current = Validator._locale;
        Validator._locale = locale;
        Validator.setMessages(messages);
        Validator._locale = current;
    };
    Validator.hasLocale = function (locale) {
        return utils_1.hasProp(Validator._localeMessages, locale);
    };
    Validator.getLocale = function () {
        return Validator._locale;
    };
    Validator.setLocale = function (locale) {
        invariant(utils_1.hasProp(Validator._localeMessages, locale), "\"" + locale + "\" locale is does not exist");
        Validator._locale = locale;
    };
    /**
     * Messages
     */
    Validator.getMessages = function () {
        return Validator._localeMessages[Validator.getLocale()];
    };
    Validator.setMessages = function (messages) {
        invariant(utils_1.hasProp(messages, 'defaultMessage'), 'Locale messages is required by "defaultMessage" field.');
        Validator._localeMessages[Validator.getLocale()] = messages;
    };
    Validator.getMessage = function (rule, type) {
        if (type === void 0) { type = null; }
        var messages = Validator.getMessages();
        var defaultMessage = messages.defaultMessage;
        var msg = dot.get(messages, rule);
        if (utils_1.isString(msg) || utils_1.isFunction(msg)) {
            return msg;
        }
        else if (isPlainObject(msg)) {
            if (type && dot.has(msg, type))
                return dot.get(msg, type);
            if (dot.has(msg, 'defaultMessage'))
                return dot.get(msg, 'defaultMessage');
        }
        return defaultMessage;
    };
    Validator.setMessage = function (rule, message) {
        var messages = Validator.getMessages();
        Validator.setMessages(__assign({}, messages, (_a = {}, _a[rule] = message, _a)));
        var _a;
    };
    /**
     * Builtin rules
     */
    Validator.internalRegisterRule = function (sync, rule, test, options) {
        var _a = options.implicit, implicit = _a === void 0 ? true : _a, _b = options.depends, depends = _b === void 0 ? {} : _b, _c = options.mapArgsToParams, mapArgsToParams = _c === void 0 ? function (arg) { return arg; } : _c, _d = options.override, override = _d === void 0 ? false : _d;
        if (!override && Validator.hasRule(rule)) {
            invariant(false, "\"" + rule + "\" rule already exists");
            return;
        }
        var res = true;
        forEach(depends, function (_, key) {
            var tmp = Validator.hasRule(key);
            invariant(tmp, "\"" + key + "\" rule does not exist");
            if (res && !tmp) {
                res = false;
            }
        });
        if (!res)
            return;
        Validator._builtinRules[rule] = {
            sync: sync,
            test: test,
            depends: depends,
            implicit: implicit,
            mapArgsToParams: mapArgsToParams,
        };
    };
    Validator.registerRule = function (rule, test, options) {
        if (options === void 0) { options = {}; }
        this.internalRegisterRule(true, rule, test, options);
    };
    Validator.registerAsyncRule = function (rule, test, options) {
        if (options === void 0) { options = {}; }
        this.internalRegisterRule(false, rule, test, options);
    };
    Validator.hasRule = function (rule) {
        return utils_1.hasProp(Validator._builtinRules, rule);
    };
    Validator.getRule = function (rule) {
        return Validator.hasRule(rule) ? Validator._builtinRules[rule] : null;
    };
    Validator.isValidParams = function (value) {
        return value !== undefined && value !== null && value !== false;
    };
    /**
     * Builtin normalizer
     */
    Validator.registerNormalizer = function (name, normalizer, options) {
        if (options === void 0) { options = {}; }
        var _a = options.depends, depends = _a === void 0 ? {} : _a, _b = options.override, override = _b === void 0 ? false : _b;
        if (!override && Validator.hasNormalizer(name)) {
            invariant(false, "\"" + name + "\" normalizer already exists");
            return;
        }
        var res = true;
        forEach(depends, function (_, key) {
            var tmp = Validator.hasNormalizer(key);
            invariant(tmp, "\"" + key + "\" normalizer does not exist");
            if (res && !tmp) {
                res = false;
            }
        });
        if (!res)
            return;
        Validator._builtinNormalizers[name] = {
            depends: depends,
            normalizer: normalizer,
        };
    };
    Validator.hasNormalizer = function (name) {
        return utils_1.hasProp(Validator._builtinNormalizers, name);
    };
    Validator.getNormalizer = function (name) {
        return Validator.hasNormalizer(name) ? Validator._builtinNormalizers[name] : null;
    };
    /**
     * Status
     */
    Validator.prototype.isValidating = function () {
        return this._validating;
    };
    Validator.prototype.isValid = function (filter) {
        var _this = this;
        var filters = (utils_1.isString(filter) ? [filter] : filter) || null;
        if (!filters) {
            return Object.keys(this.getAllErrors()).length < 1;
        }
        return filters.every(function (field) { return (!_this.getErrors(field)); });
    };
    /**
     * Values
     */
    Validator.prototype.getValues = function () {
        return __assign({}, this._values);
    };
    Validator.prototype.setValues = function (values) {
        this._values = {};
        this.mergeValues(values);
    };
    Validator.prototype.mergeValues = function (values) {
        invariant(isPlainObject(values), "\"values\" must be plain object.");
        this._values = __assign({}, this._values, values);
    };
    Validator.prototype.clearValues = function () {
        this.setValues({});
    };
    Validator.prototype.getValue = function (field) {
        return dot.get(this._values, field, null);
    };
    Validator.prototype.setValue = function (field, value) {
        this._values = dot.set(this._values, field, value);
    };
    Validator.prototype.hasValue = function (field) {
        return dot.has(this._values, field);
    };
    Validator.prototype.getFilteredValues = function (filters) {
        var _this = this;
        if (filters === void 0) { filters = []; }
        var values = {};
        filters.forEach(function (filter) {
            dot.forEach(_this._values, filter, function (value, _, __, path) {
                values = dot.set(values, path, value);
            });
        });
        return values;
    };
    /**
     * Messages
     */
    Validator.prototype.getMessages = function () {
        return __assign({}, this._messages);
    };
    Validator.prototype.setMessages = function (messages) {
        this._messages = {};
        this.mergeMessages(messages);
    };
    Validator.prototype.mergeMessages = function (messages) {
        invariant(isPlainObject(messages), '"messages" must be plain object.');
        this._messages = __assign({}, this._messages, messages);
    };
    /**
     * Field labels
     */
    Validator.prototype.getLabels = function () {
        return __assign({}, this._labels);
    };
    Validator.prototype.setLabels = function (labels) {
        this._labels = {};
        this.mergeLabels(labels);
    };
    Validator.prototype.mergeLabels = function (labels) {
        invariant(isPlainObject(labels), '"labels" must be plain object.');
        this._labels = __assign({}, this._labels, labels);
    };
    Validator.prototype.getLabel = function (field) {
        var result = field;
        forEach(this._labels, function (title, key) {
            if (dot.matchPath(key, field)) {
                result = title;
                return false;
            }
            return true;
        });
        return result;
    };
    /**
     * Errors
     */
    Validator.prototype.getPrecompileErrorMessage = function (field, rule, type) {
        if (type === void 0) { type = null; }
        var path = field + "." + rule;
        if (dot.has(this._messages, path)) {
            var msg = dot.get(this._messages, path);
            if (utils_1.isString(msg)) {
                return msg;
            }
            else if (isPlainObject(msg)) {
                return dot.get(msg, type || '', dot.get(msg, 'defaultMessage', ''));
            }
            return msg;
        }
        return Validator.getMessage(rule, type);
    };
    Validator.prototype.getAllErrors = function () {
        return __assign({}, this._errors);
    };
    Validator.prototype.getAllErrorMessages = function () {
        var errors = this.getAllErrors();
        var results = {};
        forEach(errors, function (obj, field) {
            results[field] = obj.map(function (error) { return error.message; });
        });
        return results;
    };
    Validator.prototype.clearAllErrors = function () {
        this._errors = {};
    };
    Validator.prototype.addError = function (field, rule, result, params) {
        var error = { rule: rule, params: params, message: '' };
        var value = this.getValue(field);
        var type = utils_1.weakTypeOf(value);
        if (utils_1.isString(result)) {
            error.message = result;
        }
        else {
            var label = this.getLabel(field);
            var objParams = __assign({ field: label }, (isPlainObject(params) ? params : {}));
            var msg = this.getPrecompileErrorMessage(field, rule, type === 'null' ? null : type);
            error.message = utils_1.isString(msg) ? utils_1.template(msg, objParams) : msg(label, value, objParams);
        }
        this.removeError(field, rule);
        var errors = this.getErrors(field);
        this.setErrors(field, (errors ? errors : []).concat([
            error,
        ]));
    };
    Validator.prototype.getErrors = function (field) {
        var _this = this;
        var result = null;
        forEach(this._errors, function (_, k) {
            if (dot.matchPath(field, k)) {
                result = _this._errors[k];
                return false;
            }
            return true;
        });
        return result;
    };
    Validator.prototype.setErrors = function (field, errors) {
        this._errors[field] = errors;
    };
    Validator.prototype.hasErrors = function (field) {
        return !!this.getErrors(field);
    };
    Validator.prototype.removeError = function (field, rule) {
        var errors = this.getErrors(field);
        if (errors) {
            this.setErrors(field, errors.filter(function (o) { return o.rule !== rule; }));
        }
    };
    Validator.prototype.clearErrors = function (field) {
        if (this.hasErrors(field)) {
            this._errors = dot.remove(this._errors, field);
        }
    };
    Validator.prototype.getErrorMessages = function (field) {
        var errors = this.getErrors(field);
        if (!errors)
            return null;
        return dot.get(errors, '*.message');
    };
    Validator.prototype.getErrorMessage = function (field, rule) {
        var errors = this.getErrors(field);
        if (!errors)
            return null;
        var result = null;
        forEach(errors, function (error) {
            if (error.rule === rule) {
                result = error.message;
                return false;
            }
            return true;
        });
        return result;
    };
    /**
     * Rules
     */
    Validator.prototype.getRules = function () {
        var results = {};
        forEach(this._rules, function (list, field) {
            forEach(list, function (params, ruleName) {
                results[field] = __assign({}, (results[field] || {}), (_a = {}, _a[ruleName] = params.params, _a));
                var _a;
            });
        });
        return results;
    };
    Validator.prototype.setRules = function (rules) {
        this._rules = {};
        this.mergeRules(rules);
    };
    Validator.prototype.mergeRules = function (rules) {
        invariant(isPlainObject(rules), '"rules" must be plain object');
        var results = {};
        forEach(rules, function (list, field) {
            forEach(list, function (params, ruleName) {
                results[field] = __assign({}, (results[field] || {}), (_a = {}, _a[ruleName] = {
                    original: params,
                    params: params,
                }, _a));
                var _a;
            });
        });
        this._rules = __assign({}, this._rules, results);
    };
    Validator.prototype.mappingRuleParams = function () {
        var _this = this;
        forEach(this._rules, function (list, field) {
            forEach(list, function (params, ruleName) {
                var rule = Validator.getRule(ruleName);
                if (rule) {
                    _this._rules[field] = __assign({}, (_this._rules[field] || {}), (_a = {}, _a[ruleName] = {
                        original: params.original,
                        params: rule.mapArgsToParams(params.original, _this),
                    }, _a));
                }
                var _a;
            });
        });
    };
    Validator.prototype.getRuleKeysWith = function (callback) {
        var keys = [];
        forEach(this._rules, function (list, field) {
            forEach(list, function (_a, ruleName) {
                var params = _a.params;
                var rule = Validator.getRule(ruleName);
                if (callback(field, ruleName, rule, params)) {
                    keys.push(field);
                    return false;
                }
                return true;
            });
        });
        return keys;
    };
    Validator.prototype.getSyncRuleKeys = function () {
        return this.getRuleKeysWith(function (_, __, rule, params) {
            return (utils_1.isFunction(params) ||
                !!(rule && rule.sync && Validator.isValidParams(params)));
        });
    };
    Validator.prototype.getAsyncRuleKeys = function () {
        return this.getRuleKeysWith(function (_, __, rule, params) {
            return (utils_1.isFunction(params) ||
                !!(rule && !rule.sync && Validator.isValidParams(params)));
        });
    };
    /**
     * Normalizer
     */
    Validator.prototype.getNormalizers = function () {
        return __assign({}, this._normalizers);
    };
    Validator.prototype.setNormalizers = function (normalizers) {
        this._normalizers = {};
        this.mergeNormalizers(normalizers);
    };
    Validator.prototype.mergeNormalizers = function (normalizers) {
        invariant(isPlainObject(normalizers), '"normalizers" must be plain object.');
        this._normalizers = __assign({}, this._normalizers, normalizers);
    };
    /**
     * Events
     */
    Validator.prototype.beforeValidate = function (filters) {
        var _this = this;
        if (filters) {
            filters.forEach(function (filter) {
                _this.clearErrors(filter);
            });
        }
        else {
            this.clearAllErrors();
        }
        this.mappingRuleParams();
        this.emit(EventTypes.BEFORE_VALIDATE, this, filters);
        this._validating = true;
    };
    Validator.prototype.afterValidate = function (filters) {
        this._validating = false;
        this.emit(EventTypes.AFTER_VALIDATE, this, filters);
        this.emit(this.isValid() ? EventTypes.VALID : EventTypes.INVALID, this);
    };
    /**
     * Normalize
     */
    Validator.prototype.expandNormalizers = function (filters) {
        var values = filters ? this.getFilteredValues(filters) : this._values;
        var normalizers = {};
        forEach(this._normalizers, function (normalizer, field) {
            if (!dot.has(values, field)) {
                return;
            }
            else if (dot.containWildcardToken(field)) {
                dot.forEach(values, field, function (_, __, ___, path) {
                    normalizers[path] = normalizer;
                });
            }
            else {
                normalizers[field] = normalizer;
            }
        });
        return normalizers;
    };
    Validator.prototype.normalize = function (filters) {
        var _this = this;
        var normalizers = this.expandNormalizers(utils_1.isString(filters) ? [filters] : filters);
        var previousValues = this.getValues();
        forEach(normalizers, function (list, field) {
            var previousValue = _this.getValue(field);
            var value = previousValue;
            forEach(list, function (params, name) {
                value = _this.executeNormalize(name, field, value, params, previousValue, previousValues);
            });
            _this.setValue(field, value);
        });
    };
    Validator.prototype.executeNormalize = function (name, field, value, params, previousValue, previousValues) {
        var _this = this;
        var isInline = utils_1.isFunction(params);
        if (!isInline && !Validator.isValidParams(params)) {
            return value;
        }
        var values = dot.set(previousValues, field, value);
        if (isInline) {
            var inline = params;
            return inline(value, {}, previousValue, values, previousValues);
        }
        if (!Validator.hasNormalizer(name)) {
            return value;
        }
        var _a = Validator.getNormalizer(name), normalizer = _a.normalizer, depends = _a.depends;
        var result = value;
        forEach(depends, function (p, n) {
            result = _this.executeNormalize(n, field, result, p, previousValue, previousValues);
        });
        return normalizer(result, params, previousValue, values, previousValues);
    };
    /**
     * Validate
     */
    Validator.prototype.expandRules = function (filters) {
        var values = filters ? this.getFilteredValues(filters) : this._values;
        var rules = {};
        var matchField = function (field) { return (!filters ? true : filters.some(function (filter) { return dot.matchPath(field, filter); })); };
        forEach(this._rules, function (rule, field) {
            if (!dot.has(values, field) || !dot.containWildcardToken(field)) {
                if (matchField(field)) {
                    rules[field] = rule;
                }
            }
            else {
                dot.forEach(values, field, function (_, __, ___, path) {
                    if (matchField(path)) {
                        rules[path] = rule;
                    }
                });
            }
        });
        return rules;
    };
    Validator.prototype.validate = function (filter) {
        var _this = this;
        var filters = (utils_1.isString(filter) ? [filter] : filter) || null;
        this.beforeValidate(filters);
        var rules = this.expandRules(filters);
        forEach(rules, function (fieldRules, field) {
            var value = _this.getValue(field);
            forEach(fieldRules, function (params, rule) {
                var result = _this.syncExecuteTest(rule, field, value, params.params);
                if (result === true) {
                    _this.removeError(field, rule);
                }
                else {
                    _this.addError(field, rule, result, params.params);
                }
            });
        });
        this.afterValidate(filters);
        return this.isValid(filters);
    };
    Validator.prototype.asyncValidate = function (filter) {
        var _this = this;
        var filters = (utils_1.isString(filter) ? [filter] : filter) || null;
        this.beforeValidate(filters);
        var rules = this.expandRules(filters);
        return Promise.all(map(rules, function (fieldRules, field) {
            var value = _this.getValue(field);
            return Promise.all(map(fieldRules, function (params, rule) {
                return _this.asyncExecuteTest(rule, field, value, params.params);
            }))
                .then(function () { return Promise.resolve(); })
                .catch(function () { return Promise.resolve(); });
        }))
            .then(function () {
            _this.afterValidate(filters);
            return _this.isValid(filters)
                ? Promise.resolve(_this.getValues())
                : Promise.reject(_this.getAllErrors());
        });
    };
    Validator.prototype.syncExecuteTest = function (rule, field, value, params) {
        var result = this.executeTest(true, rule, field, value, params);
        return utils_1.isPromise(result) ? true : result;
    };
    Validator.prototype.asyncExecuteTest = function (rule, field, value, params) {
        var _this = this;
        var result = this.executeTest(false, rule, field, value, params);
        var resolve = function () {
            _this.removeError(field, rule);
            return Promise.resolve();
        };
        var reject = function (res) {
            _this.addError(field, rule, res, params);
            return Promise.reject(null);
        };
        if (result === true) {
            return resolve();
        }
        if (!utils_1.isPromise(result)) {
            return reject(result);
        }
        return result
            .then(function () { return resolve(); })
            .catch(function (message) { return reject(utils_1.isString(message) ? message : false); });
    };
    Validator.prototype.executeTest = function (sync, rule, field, value, params, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var isInline = utils_1.isFunction(params);
        if (!Validator.isValidParams(params) && !isInline)
            return true;
        // inline test
        if (isInline) {
            var inline = params;
            return sync ? inline(value, true, field, this._values) : true;
            // search rule
        }
        else if (!Validator.hasRule(rule)) {
            return false;
        }
        // registered rule
        var _a = Validator.getRule(rule), syncRule = _a.sync, test = _a.test, depends = _a.depends, implicit = _a.implicit;
        if (sync !== syncRule && !force) {
            return true;
        }
        if (implicit && (!dot.has(this._values, field) || value === null)) {
            return true;
        }
        if (sync) {
            var passDepends_1 = true;
            forEach(depends, function (p, r) {
                var result = _this.syncExecuteTest(r, field, value, p);
                if (result !== true) {
                    passDepends_1 = false;
                    return false;
                }
                return true;
            });
            return !passDepends_1
                ? false
                : test(value, params, field, this._values);
        }
        return Promise
            .all(map(depends, function (p, r) {
            var result = _this.executeTest(sync, r, field, value, p, true);
            if (utils_1.isPromise(result)) {
                return result;
            }
            return result === true ? Promise.resolve() : Promise.reject(null);
        }))
            .then(function () { return test(value, params, field, _this._values); })
            .catch(function (message) { return Promise.reject(message); });
    };
    Validator._locale = 'en';
    Validator._localeMessages = {};
    Validator._builtinRules = {};
    Validator._builtinNormalizers = {};
    return Validator;
}(events_1.EventEmitter));
exports.default = Validator;
