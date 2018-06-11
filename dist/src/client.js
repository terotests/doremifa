"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var list = [1, 2, 3, 4];
function page1() {
    return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), list.map(function (_) { return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), _); }));
}
function page2() {
    return index_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>Second page</div>"], ["<div>Second page</div>"])));
}
function page3() {
    return index_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div>Third page</div>"], ["<div>Third page</div>"])));
}
index_1.mount(document.body, function (state) { return index_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  <h1>Hello World!!!</h1>\n  <a href=\"#page1\">1</a>\n  <a href=\"#page2\">2</a>\n  <a href=\"#page3\">3</a>\n  ", "\n"], ["\n  <h1>Hello World!!!</h1>\n  <a href=\"#page1\">1</a>\n  <a href=\"#page2\">2</a>\n  <a href=\"#page3\">3</a>\n  ", "\n"])), index_1.router({ page1: page1, page2: page2, page3: page3, default: page3 })); });
var templateObject_2, templateObject_1, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=client.js.map