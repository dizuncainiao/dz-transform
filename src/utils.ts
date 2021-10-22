export const getType = (val: any): string => Object.prototype.toString.call(val)

export const getShortType = (type: string): string => type.slice(1, -1).split(" ")[1]

export const isString = (val: any): boolean => getType(val) === "[object String]"

export const isNumber = (val: any): boolean => getType(val) === "[object Number]"

export const isBoolean = (val: any): boolean => getType(val) === "[object Boolean]"

export const isArray = (val: any): boolean => Array.isArray(val)

export const isObject = (val: any): boolean => getType(val) === "[object Object]"

interface PresetData {
    String: string
    Number: number
    Boolean: boolean
    Array: any[]
    Object: any
}

export const PRESET_DATA: PresetData = {
    "String": "-",
    "Number": 0,
    "Boolean": false,
    "Array": [],
    "Object": {}
}
