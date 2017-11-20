/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * Declarations
 */
export interface Values {
    [index: string]: any;
}
export interface RuleObjectParams {
    [index: string]: any;
}
export interface InternalValidationTester<T> {
    (value: any, params: RuleObjectParams, field: string, values: Values): T;
}
export declare type SyncValidationTester = InternalValidationTester<boolean | string>;
export declare type AsyncValidationTester = InternalValidationTester<Promise<any>>;
export declare type ValidationTester = SyncValidationTester | AsyncValidationTester;
export declare type RuleParams = SyncValidationTester | any;
export interface InternalRuleParams {
    original: RuleParams;
    params: RuleParams;
}
export interface NormalizeObjectParams {
    [index: string]: any;
}
export interface Normalizer {
    (value: any, params: NormalizeParams, previousValue: any, values: Values, previousValues: Values): any;
}
export declare type NormalizeParams = Normalizer | any;
export interface MessageCreatorParams extends RuleObjectParams {
    field: string;
}
export interface MessageCreator {
    (field: string, value: any, params: MessageCreatorParams): string;
}
export declare type Message = string | {
    [index: string]: string | MessageCreator;
} | MessageCreator;
export interface Messages {
    [index: string]: Message;
}
export interface InstanceMessages {
    [index: string]: Messages;
}
export interface ValidateError {
    message: string;
    rule: string;
    params: boolean | {
        [index: string]: any;
    };
}
export interface ValidateErrorList {
    [index: string]: ValidateError[];
}
export declare type FieldErrorMessageList = string[];
export interface ErrorMessageList {
    [index: string]: FieldErrorMessageList;
}
export interface Labels {
    [index: string]: string;
}
export interface LocaleMessages extends Messages {
    defaultMessage: string;
}
export interface DefinedLocaleMessages {
    [index: string]: LocaleMessages;
}
export interface RuleDepends {
    [index: string]: RuleParams;
}
export declare type Rule = {
    [index: string]: InternalRuleParams;
};
export interface InternalRuleList {
    [index: string]: Rule;
}
export interface RuleList {
    [index: string]: {
        [index: string]: RuleParams;
    };
}
export interface MapArgsToParams {
    (args: any, validator: Validator): any;
}
export interface BuiltinRuleOptions {
    implicit?: boolean;
    depends?: RuleDepends;
    override?: boolean;
    mapArgsToParams?: MapArgsToParams;
}
export interface BuiltinRule {
    sync: boolean;
    depends: RuleDepends;
    test: ValidationTester;
    implicit: boolean;
    mapArgsToParams: MapArgsToParams;
}
export interface BuiltinRuleList {
    [index: string]: BuiltinRule;
}
export interface InternalRuleKeysCallback {
    (field: string, ruleName: string, rule: BuiltinRule | null, params: RuleParams | ValidationTester): boolean;
}
export interface Normalizers {
    [index: string]: NormalizeParams;
}
export interface NormalizerDepends extends Normalizers {
}
export interface NormalizerList {
    [index: string]: Normalizers;
}
export interface BuiltinNormalizerOptions {
    depends?: NormalizerDepends;
    override?: boolean;
}
export interface BuiltinNormalizer {
    depends: NormalizerDepends;
    normalizer: Normalizer;
}
export interface BuiltinNormalizerList {
    [index: string]: BuiltinNormalizer;
}
/**
 * Validator
 */
export interface ValidatorOptions {
    messages?: InstanceMessages;
    labels?: Labels;
    normalizers?: NormalizerList;
}
export default class Validator extends EventEmitter {
    static _locale: string;
    static _localeMessages: DefinedLocaleMessages;
    static _builtinRules: BuiltinRuleList;
    static _builtinNormalizers: BuiltinNormalizerList;
    /**
     * Locale
     */
    static defineLocale(locale: string, messages: LocaleMessages): void;
    static hasLocale(locale: string): boolean;
    static getLocale(): string;
    static setLocale(locale: string): void;
    /**
     * Messages
     */
    static getMessages(): LocaleMessages;
    static setMessages(messages: LocaleMessages): void;
    static getMessage(rule: string, type?: string | null): string | MessageCreator;
    static setMessage(rule: string, message: Message): void;
    /**
     * Builtin rules
     */
    private static internalRegisterRule(sync, rule, test, options);
    static registerRule(rule: string, test: SyncValidationTester, options?: BuiltinRuleOptions): void;
    static registerAsyncRule(rule: string, test: AsyncValidationTester, options?: BuiltinRuleOptions): void;
    static hasRule(rule: string): boolean;
    static getRule(rule: string): BuiltinRule | null;
    static isValidParams(value: any): boolean;
    /**
     * Builtin normalizer
     */
    static registerNormalizer(name: string, normalizer: Normalizer, options?: BuiltinNormalizerOptions): void;
    static hasNormalizer(name: string): boolean;
    static getNormalizer(name: string): BuiltinNormalizer | null;
    /**
     * Instance
     */
    protected _validating: boolean;
    protected _errors: ValidateErrorList;
    protected _values: Values;
    protected _rules: RuleList;
    protected _normalizers: NormalizerList;
    protected _messages: InstanceMessages;
    protected _labels: Labels;
    constructor(values?: Values, rules?: RuleList, options?: ValidatorOptions);
    /**
     * Status
     */
    isValidating(): boolean;
    isValid(filter?: string | string[] | null): boolean;
    /**
     * Values
     */
    getValues(): Values;
    setValues(values: Values): void;
    mergeValues(values: Values): void;
    clearValues(): void;
    getValue(field: string): any;
    setValue(field: string, value: any): void;
    hasValue(field: string): boolean;
    getFilteredValues(filters?: string[]): Values;
    /**
     * Messages
     */
    getMessages(): InstanceMessages;
    setMessages(messages: InstanceMessages): void;
    mergeMessages(messages: InstanceMessages): void;
    /**
     * Field labels
     */
    getLabels(): Labels;
    setLabels(labels: Labels): void;
    mergeLabels(labels: Labels): void;
    getLabel(field: string): string;
    /**
     * Errors
     */
    protected getPrecompileErrorMessage(field: string, rule: string, type?: string | null): string | MessageCreator;
    getAllErrors(): ValidateErrorList;
    getAllErrorMessages(): ErrorMessageList;
    clearAllErrors(): void;
    addError(field: string, rule: string, result: string | boolean, params: RuleParams): void;
    getErrors(field: string): ValidateError[] | null;
    setErrors(field: string, errors: ValidateError[]): void;
    hasErrors(field: string): boolean;
    removeError(field: string, rule: string): void;
    clearErrors(field: string): void;
    getErrorMessages(field: string): string[] | null;
    getErrorMessage(field: string, rule: string): string | null;
    /**
     * Rules
     */
    getRules(): RuleList;
    setRules(rules: RuleList): void;
    mergeRules(rules: RuleList): void;
    mappingRuleParams(): void;
    private getRuleKeysWith(callback);
    getSyncRuleKeys(): string[];
    getAsyncRuleKeys(): string[];
    /**
     * Normalizer
     */
    getNormalizers(): NormalizerList;
    setNormalizers(normalizers: NormalizerList): void;
    mergeNormalizers(normalizers: NormalizerList): void;
    /**
     * Events
     */
    protected beforeValidate(filters: string[] | null): void;
    protected afterValidate(filters: string[] | null): void;
    /**
     * Normalize
     */
    protected expandNormalizers(filters?: string[]): NormalizerList;
    normalize(filters?: string | string[]): void;
    protected executeNormalize(name: string, field: string, value: any, params: NormalizeParams, previousValue: any, previousValues: Values): any;
    /**
     * Validate
     */
    protected expandRules(filters: string[] | null): InternalRuleList;
    validate(filter?: string | string[]): boolean;
    asyncValidate(filter?: string | string[]): Promise<Values>;
    protected syncExecuteTest(rule: string, field: string, value: any, params: RuleParams): boolean | string;
    protected asyncExecuteTest(rule: string, field: string, value: any, params: RuleParams): Promise<void>;
    protected executeTest(sync: boolean, rule: string, field: string, value: any, params: RuleParams, force?: boolean): boolean | string | Promise<string | void>;
}
