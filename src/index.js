const _ = {
    getType(val) {
        return Object.prototype.toString.call(val)
    },
    getShortType(type) {
        return type.slice(1, -1).split(' ')[1]
    },
    isString(val) {
        return this.getType(val) === '[object String]'
    },
    isNumber(val) {
        return this.getType(val) === '[object Number]'
    },
    isBoolean(val) {
        return this.getType(val) === '[object Boolean]'
    },
    isArray(val) {
        return Array.isArray(val)
    },
    isObject(val) {
        return this.getType(val) === '[object Object]'
    }
}

const PRESET_DATA = {
    String: '-',
    Number: 0,
    Boolean: false,
    Array: [],
    Object: {}
}

class Transform {
    /**
     *
     * @param dataInterface 数据类型：支持验证 String Number Boolean Array Object 格式数据
     * @param data 需要转换数据：传入的数据仅支持对象和数组
     * @param defaultData 默认数据，转换数据的属性类型校验不通过时，赋的默认值
     */
    constructor(dataInterface, data, defaultData) {
        Object.assign(this, {dataInterface, data, defaultData})
        this.setInitResult()
        this.validator()
    }

    setInitResult() {
        if (Array.isArray(this.data)) {
            this.result = []
        } else if (_.isObject(this.data)) {
            this.result = {}
        } else {
            throw new Error(`The parameters passed in are limited to objects or arrays! But got the ${_.getType(this.data)} ${this.data}.`)
        }
    }

    validator() {
        const {dataInterface, data, result, defaultData} = this
        Object.keys(dataInterface).forEach(key => {
            // 预设类型
            const presetType = dataInterface[key].name
            const value = data[key]
            // 实际类型
            const dataType = _.getType(value)
            console.log(presetType, dataType);
            // 预设类型和实际类型一样则直接赋值
            if (dataType.includes(presetType)) {
                result[key] = value
            } else {
                const defaultVal = defaultData && defaultData[key]
                // 不一样给出警告，有默认值赋
                console.warn(`${key} is preset to ${presetType}, but got the ${dataType}`)
                if (defaultVal) {
                    result[key] = defaultVal
                } else {
                    // 没有赋预设值
                    result[key] = PRESET_DATA[presetType]
                }
            }
        })
    }

    getData() {
        return this.result
    }
}
