export declare const getType: (val: unknown) => string;
export declare const getShortType: (type: string) => string;
export declare const isString: (val: unknown) => boolean;
export declare const isNumber: (val: unknown) => boolean;
export declare const isBoolean: (val: unknown) => boolean;
export declare const isArray: (val: unknown) => boolean;
export declare const isObject: (val: unknown) => boolean;
export declare const valIsNumber: (val: unknown) => boolean;
export interface PresetData {
    String: string;
    Number: number;
    Boolean: boolean;
    Array: unknown[];
    Object: Record<string, unknown>;
}
export declare type PresetDataKeyType = "String" | "Number" | "Boolean" | "Array" | "Object";
export declare const PRESET_DATA: PresetData;
