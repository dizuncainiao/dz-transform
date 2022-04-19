!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Transform = e()
}(this, function () {
    "use strict";

    function n(t, e) {
        for (var a = 0; a < e.length; a++) {
            var r = e[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function i(t, e, a) {
        return e in t ? Object.defineProperty(t, e, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = a, t
    }

    var u = function (t) {
        return Object.prototype.toString.call(t)
    }, c = {String: "-", Number: 0, Boolean: !1, Array: [], Object: {}};
    return function () {
        function r(t, e, a) {
            if (!function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, r), i(this, "result", void 0), i(this, "dataInterface", void 0), i(this, "rawData", void 0), i(this, "defaultData", void 0), this.dataInterface = t, this.rawData = e, this.defaultData = a, Array.isArray(e)) this.result = [], this.arrayValidator(); else {
                if ("[object Object]" !== u(e)) throw new Error("The parameters passed in are limited to objects or arrays! But got the ".concat(u(this.rawData), " ").concat(this.rawData, "."));
                this.result = {}, this.validator(e, this.result)
            }
        }

        var t, e, a;
        return t = r, (e = [{
            key: "validator", value: function (n, i) {
                var o = this.dataInterface, s = this.defaultData;
                Object.keys(o).forEach(function (t) {
                    var e = o[t].name, a = n[t], r = u(a);
                    r.includes(e) ? i[t] = a : (a = s && s[t], console.warn("".concat(t, " is preset to ").concat(e, ", but got the ").concat(r)), i[t] = a || c[e])
                })
            }
        }, {
            key: "arrayValidator", value: function () {
                var a = this, t = this.rawData, r = this.result;
                t.forEach(function (t, e) {
                    r.push({}), a.validator(t, r[e])
                })
            }
        }, {
            key: "getData", value: function () {
                return this.result
            }
        }]) && n(t.prototype, e), a && n(t, a), r
    }()
});
//# sourceMappingURL=dz-transform.js.map
