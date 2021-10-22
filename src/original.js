const _ = {
        getType(val) {

            return Object.prototype.toString.call(val);

        },
        getShortType(type) {

            return type.slice(
                1,
                -1
            ).split(" ")[1];

        },
        isString(val) {

            return this.getType(val) === "[object String]";

        },
        isNumber(val) {

            return this.getType(val) === "[object Number]";

        },
        isBoolean(val) {

            return this.getType(val) === "[object Boolean]";

        },
        isArray(val) {

            return Array.isArray(val);

        },
        isObject(val) {

            return this.getType(val) === "[object Object]";

        }
    },

    PRESET_DATA = {
        "String": "-",
        "Number": 0,
        "Boolean": false,
        "Array": [],
        "Object": {}
    };

export default class Transform {


    /**
     *
     * @param dataInterface 数据类型：支持验证 String Number Boolean Array Object 格式数据
     * @param rawData 需要转换数据：传入的数据仅支持对象和数组
     * @param defaultData 默认数据，转换数据的属性类型校验不通过时，赋的默认值
     */
    constructor(dataInterface, rawData, defaultData) {

        Object.assign(
            this,
            {
                dataInterface,
                rawData,
                defaultData
            }
        );
        this.setInitResult();

    }

    setInitResult() {

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

    validator(rawData, result) {

        const {dataInterface, defaultData} = this;
        Object.keys(dataInterface).forEach((key) => {

            // 预设类型
            const presetType = dataInterface[key].name,
                // 被转换数据的值
                value = rawData[key],
                // 实际类型
                dataType = _.getType(value);
            // 预设类型和实际类型一样则直接赋值
            if (dataType.includes(presetType)) {

                result[key] = value;

            } else {

                const defaultVal = defaultData && defaultData[key];
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

    arrayValidator() {

        const {rawData, result} = this;
        rawData.forEach((item, index) => {

            result.push({});
            this.validator(
                item,
                result[index]
            );

        });

    }

    getData() {

        return this.result;

    }

}
