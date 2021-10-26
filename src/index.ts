import * as _ from './utils'
import {PRESET_DATA} from './utils'

interface IObject {
    [propName: string]: dataType;
}

interface IValidator {
    [propName: string]: { new(...args: any[]): Function };
}

type resultType = IObject | any[]

type dataType = string | number | boolean | Array<any> | IObject

export default class Transform {
    private result: resultType
    private dataInterface: IValidator
    private rawData: resultType
    private defaultData: resultType

    constructor(dataInterface: IValidator, rawData: resultType, defaultData?: IObject) {
        Object.assign(
            this,
            {
                dataInterface,
                rawData,
                defaultData
            }
        )
    }

    setInitResult(): void {

        const {rawData} = this;
        if (Array.isArray(rawData)) {

            this.result = [];
            this.arrayValidator();

        } else if (_.isObject(rawData)) {

            this.result = {};
            this.validator(
                rawData,
                this.result
            );

        } else {

            throw new Error(`The parameters passed in are limited to objects or arrays! But got the ${_.getType(this.rawData)} ${this.rawData}.`);

        }

    }

    validator(rawData: resultType, result: resultType) {

        const {dataInterface, defaultData} = this;
        Object.keys(dataInterface).forEach((key) => {

            // 预设类型
            const presetType: string = dataInterface[key]['name'],
                // 被转换数据的值
                value: dataType = rawData[key],
                // 实际类型
                dataType: string = _.getType(value);
            // 预设类型和实际类型一样则直接赋值
            if (dataType.includes(presetType)) {

                result[key] = value;

            } else {

                const defaultVal: dataType = defaultData && defaultData[key];
                // 不一样给出警告，有默认值赋值
                console.warn(`${key} is preset to ${presetType}, but got the ${dataType}`);
                if (defaultVal) {

                    result[key] = defaultVal;

                } else {

                    // 没有赋预设值值
                    result[key] = PRESET_DATA[presetType];

                }

            }

        });

    }

    arrayValidator(): void {

        const {rawData, result} = this;
        (rawData as Array<IObject>).forEach((item, index) => {

            (result as Array<IObject>).push({});
            this.validator(
                item,
                result[index]
            );

        });

    }

    getData(): resultType {

        return this.result;

    }
}
