"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var list = [1, 2, 3, 4];
var ok = false;
function page1() {
    return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ",
        "\n  "])), ok ? index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      <div>OK?</div>\n    "], ["\n      <div>OK?</div>\n    "]))) : '...');
}
function page2() {
    return index_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>Second page</div>\n  ", "\n  <button click=", ">+ item</button>\n  <button click=", ">- item</button>  \n  ", "\n  "], ["<div>Second page</div>\n  ", "\n  <button click=",
        ">+ item</button>\n  <button click=",
        ">- item</button>  \n  ", "\n  "])), list.map(function (_) { return index_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<div>Item ", "</div>"], ["<div>Item ", "</div>"])), _); }), function (_) {
        list.push(list.length + 1);
        index_1.setState({});
    }, function (_) {
        list.splice(0, 1);
        index_1.setState({});
    }, list.map(function (_) { return index_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<div>Item ", "</div>"], ["<div>Item ", "</div>"])), _); }));
}
function page3() {
    return index_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<div>Third page</div>"], ["<div>Third page</div>"])));
}
index_1.mount(document.body, function (state) { return index_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  <h1>Hello World!!!</h1>\n  <a href=\"#page1\">1</a>\n  <a href=\"#page2\">2</a>\n  <a href=\"#page3\">3</a>\n  <button click=", ">Ok</button>\n  ", "\n"], ["\n  <h1>Hello World!!!</h1>\n  <a href=\"#page1\">1</a>\n  <a href=\"#page2\">2</a>\n  <a href=\"#page3\">3</a>\n  <button click=",
    ">Ok</button>\n  ", "\n"])), function (_) {
    ok = !ok;
    index_1.setState({});
}, index_1.router({ page1: page1, page2: page2, page3: page3, default: page3 })); });
var templateObject_2, templateObject_1, templateObject_4, templateObject_5, templateObject_3, templateObject_6, templateObject_7;
//# sourceMappingURL=client_test1.js.map