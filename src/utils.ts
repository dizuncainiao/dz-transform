export const getType = (val: unknown): string => Object.prototype.toString.call(val)

export const getShortType = (type: string): string => type.slice(1, -1).split(' ')[1]

export const isString = (val: unknown): boolean => getType(val) === '[object String]'

export const isNumber = (val: unknown): boolean => getType(val) === '[object Number]'

export const isBoolean = (val: unknown): boolean => getType(val) === '[object Boolean]'

export const isArray = (val: unknown): boolean => Array.isArray(val)

export const isObject = (val: unknown): boolean => getType(val) === '[object Object]'

export interface PresetData {
  String: string
  Number: number
  Boolean: boolean
  Array: unknown[]
  Object: Record<string, unknown>
}

export type PresetDataKeyType = 'String' | 'Number' | 'Boolean' | 'Array' | 'Object'

export const PRESET_DATA: PresetData = {
  String: '-',
  Number: 0,
  Boolean: false,
  Array: [],
  Object: {}
}
