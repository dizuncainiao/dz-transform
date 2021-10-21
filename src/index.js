const _ = {
    String(val) {
        return Object.prototype.toString.call(val) === '[object String]'
    },
    Number(val) {
        return Object.prototype.toString.call(val) === '[object Number]'
    },
    Boolean(val) {
        return Object.prototype.toString.call(val) === '[object Boolean]'
    },
    Array(val) {
        return Array.isArray(val)
    },
    Object(val) {
        return Object.prototype.toString.call(val) === '[object Object]'
    },
    Date(val) {
        return Object.prototype.toString.call(val) === '[object Date]'
    },
    Function(val) {
        return Object.prototype.toString.call(val) === '[object Function]'
    },
    Symbol(val) {
        return Object.prototype.toString.call(val) === '[object Symbol]'
    }
}

class Transform {
    /**
     *
     * @param dataInterface 数据类型：支持验证 String Number Boolean Array Object Date Function Symbol 格式数据
     * @param data 数据：传入的数据仅支持对象和数组
     */
    constructor(dataInterface, data) {
        Object.assign(this, {dataInterface, data})
        this.setInitResult()
        this.validator()
    }

    setInitResult() {
        if (Array.isArray(this.data)) {
            this.result = []
        } else if (_.Object(this.data)) {
            this.result = {}
        } else {
            throw new Error('传入的参数约束为对象和数组！')
        }
    }

    validator() {
        const {dataInterface, data} = this
        Object.keys(dataInterface).forEach(key => {
            const dataType = dataInterface[key].name

        })
    }

    getData() {
        return this.result
    }
}
