"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lit_html_1 = require("lit-html");
var list = [];
for (var i = 0; i < 1000; i++) {
    list.push(i);
}
function r() {
    list.reverse();
    return lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<ul>", "</ul>"], ["<ul>",
        "</ul>"])), list.map(function (item) { return lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<li>Item ", "</li>"], ["<li>Item ", "</li>"])), item); }));
}
setInterval(function (_) { return lit_html_1.render(r(), document.body); }, 20);
var templateObject_2, templateObject_1;
//# sourceMappingURL=litperf.js.map