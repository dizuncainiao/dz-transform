import * as _ from './utils'
import {PRESET_DATA} from './utils'

type DataType = string | number | boolean | Array<never> | Record<string, unknown> | undefined

type Data = Record<string, DataType>

type TypeConstructor = StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor

interface Validator {
    [propName: string]: TypeConstructor;
}

type resultType = Data | Data[]

export default class Transform {
    private readonly result: resultType
    private readonly dataInterface: Validator
    private readonly rawData: resultType
    private readonly defaultData: Data | undefined

    constructor(dataInterface: Validator, rawData: resultType, defaultData?: Data) {
        this.dataInterface = dataInterface
        this.rawData = rawData
        this.defaultData = defaultData

        if (Array.isArray(rawData)) {
            this.result = []
            this.arrayValidator()
        } else if (_.isObject(rawData)) {
            this.result = {}
            this.validator(
                rawData,
                this.result
            )
        } else {
            throw new Error(`The parameters passed in are limited to objects or arrays! But got the ${_.getType(this.rawData)} ${this.rawData}.`)
        }
    }

    validator(rawData: Data, result: Data): void {
        const {
            dataInterface,
            defaultData
        } = this
        Object.keys(dataInterface).forEach((key) => {
            // 预设类型
            const presetType: string = dataInterface[key].name // Number
            // 被转换数据的值
            const value: DataType = rawData[key]
            // 实际类型
            const DataType: string = _.getType(value) // ‘[Object Number]’
            // 预设类型和实际类型一样则直接赋值（Number 类型得区别判断）
            if (DataType.includes(presetType)) {
                result[key] = value
            } else {
                const defaultVal: DataType = defaultData && defaultData[key]
                // 不一样给出警告，有默认值赋值
                console.warn(`${key} is preset to ${presetType}, but got the ${DataType}`)
                if (defaultVal) {
                    result[key] = defaultVal
                } else {
                    // 没有赋预设值值
                    result[key] = PRESET_DATA[presetType]
                }
            }
        })
    }

    arrayValidator(): void {
        const {
            rawData,
            result
        } = this;
        (rawData as Array<Data>).forEach((item, index) => {
            (result as Array<Data>).push({})
            this.validator(
                item,
                (result as Array<Data>)[index]
            )
        })
    }

    getData(): resultType {
        return this.result
    }
}
