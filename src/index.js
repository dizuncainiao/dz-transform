"use strict";
exports.__esModule = true;
var _ = require("./utils");
var utils_1 = require("./utils");
var Transform = /** @class */ (function () {
    function Transform(dataInterface, rawData, defaultData) {
        Object.assign(this, {
            dataInterface: dataInterface,
            rawData: rawData,
            defaultData: defaultData
        });
    }
    Transform.prototype.setInitResult = function () {
        var rawData = this.rawData;
        if (Array.isArray(rawData)) {
            this.result = [];
            this.arrayValidator();
        }
        else if (_.isObject(rawData)) {
            this.result = {};
            this.validator(rawData, this.result);
        }
        else {
            throw new Error("The parameters passed in are limited to objects or arrays! But got the " + _.getType(this.rawData) + " " + this.rawData + ".");
        }
    };
    Transform.prototype.validator = function (rawData, result) {
        var _a = this, dataInterface = _a.dataInterface, defaultData = _a.defaultData;
        Object.keys(dataInterface).forEach(function (key) {
            // 预设类型
            var presetType = dataInterface[key].name, 
            // 被转换数据的值
            value = rawData[key], 
            // 实际类型
            dataType = _.getType(value);
            // 预设类型和实际类型一样则直接赋值
            if (dataType.includes(presetType)) {
                result[key] = value;
            }
            else {
                var defaultVal = defaultData && defaultData[key];
                // 不一样给出警告，有默认值赋值
                console.warn(key + " is preset to " + presetType + ", but got the " + dataType);
                if (defaultVal) {
                    result[key] = defaultVal;
                }
                else {
                    // 没有赋预设值值
                    result[key] = utils_1.PRESET_DATA[presetType];
                }
            }
        });
    };
    Transform.prototype.arrayValidator = function () {
        var _this = this;
        var _a = this, rawData = _a.rawData, result = _a.result;
        rawData.forEach(function (item, index) {
            result.push({});
            _this.validator(item, result[index]);
        });
    };
    Transform.prototype.getData = function () {
        return this.result;
    };
    return Transform;
}());
