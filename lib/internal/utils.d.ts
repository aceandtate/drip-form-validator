export declare const hasProp: (obj: any, name: string) => boolean;
export declare const typeOf: (val: any) => string;
export declare const isBoolean: (val: any) => val is boolean;
export declare const isString: (val: any) => val is string;
export declare const isNumber: (val: any) => val is number;
export declare const isArray: (val: any) => val is any[];
export declare const isDate: (val: any) => val is Date;
export declare const isFunction: (val: any) => boolean;
export declare const isPromise: (val: any) => boolean;
export declare const isNumeric: (val: any) => boolean;
export declare const isInteger: (val: any) => boolean;
export declare const isFloat: (val: any) => boolean;
export declare const weakTypeOf: (val: any) => string;
export declare const isEmpty: (val: any) => boolean;
export declare const template: (format: string, data: {
    [index: string]: any;
} | null) => string;
