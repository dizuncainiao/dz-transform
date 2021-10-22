"use strict";
exports.__esModule = true;
exports.PRESET_DATA = exports.isObject = exports.isArray = exports.isBoolean = exports.isNumber = exports.isString = exports.getShortType = exports.getType = void 0;
var getType = function (val) { return Object.prototype.toString.call(val); };
exports.getType = getType;
var getShortType = function (type) { return type.slice(1, -1).split(" ")[1]; };
exports.getShortType = getShortType;
var isString = function (val) { return (0, exports.getType)(val) === "[object String]"; };
exports.isString = isString;
var isNumber = function (val) { return (0, exports.getType)(val) === "[object Number]"; };
exports.isNumber = isNumber;
var isBoolean = function (val) { return (0, exports.getType)(val) === "[object Boolean]"; };
exports.isBoolean = isBoolean;
var isArray = function (val) { return Array.isArray(val); };
exports.isArray = isArray;
var isObject = function (val) { return (0, exports.getType)(val) === "[object Object]"; };
exports.isObject = isObject;
exports.PRESET_DATA = {
    "String": "-",
    "Number": 0,
    "Boolean": false,
    "Array": [],
    "Object": {}
};
