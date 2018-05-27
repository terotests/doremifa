"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
// 
index_1.start(document.body, function (state) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = index_1.forElem;
                _b = index_1.element;
                _c = [templateObject_1 || (templateObject_1 = __makeTemplateObject(["<div>\n  <div>Hello World</div>\n    <button id=\"inc\">+1</button>\n    <button id=\"dec\">-1</button>\n    <div></div>   \n    \n    ", "\n    ", "\n    ", " \n</div>\n  "], ["<div>\n  <div>Hello World</div>\n    <button id=\"inc\">+1</button>\n    <button id=\"dec\">-1</button>\n    <div></div>   \n    \n    ",
                        "\n    ",
                        "\n    ",
                        " \n</div>\n  "])), index_1.element(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>The counter is ", " and page <b>", "</b></div>"], ["<div>The counter is ", " and page <b>", "</b></div>"])), state.cnt, state.page), index_1.element(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>\n        This is the  page value\n        <b>It may work ? </b>\n        <textarea value=\"jee\" cols=\"80\" rows=\"5\" ></textarea>\n      </div>"], ["<div>\n        This is the  page value\n        <b>It may work ? </b>\n        <textarea value=\"jee\" cols=\"80\" rows=\"5\" ></textarea>\n      </div>"])))];
                return [4 /*yield*/, index_1.router({
                        "hello": function (_) { return index_1.element(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div>This is hello from hello route</div>"], ["<div>This is hello from hello route</div>"]))); },
                        "default": function (_) { return index_1.element(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<div>default route</div>"], ["<div>default route</div>"]))); },
                        "list": function (_) {
                            var values = _.params.len ? _.list.slice(0, _.params.len | 0) : _.list;
                            return index_1.element(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<div>\n          <ul>", "</ul>\n        </div>\n        "], ["<div>\n          <ul>", "</ul>\n        </div>\n        "])), values.map(function (_) { return index_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<li><a href=\"#hello\">", "</a></li>"], ["<li><a href=\"#hello\">", "</a></li>"])), _); }));
                        }
                    })];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, _c.concat([_d.sent()])), function (o) {
                        o.inc.onclick = function () { return index_1.setState({ cnt: state.cnt + 1 }); };
                        o.dec.onclick = function () { return index_1.setState({ cnt: state.cnt - 1 }); };
                    }])];
        }
    });
}); }, {
    cnt: 0,
    list: [1, 2, 3, 4, 5]
});
setInterval(function () {
    var list = [];
    var cnt = 100 + Math.random() * 20;
    while (cnt-- > 0) {
        list.push(Math.floor(Math.random() * 20));
    }
    index_1.setState({ list: list });
}, 5000);
var templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_7, templateObject_6, templateObject_1;
/*

    ${await router({
      "hello" : _ => element`<div>This is hello from hello route</div>`,
      "default" : _ => element`<div>default route</div>`
    })}

*/ 
//# sourceMappingURL=client.js.map