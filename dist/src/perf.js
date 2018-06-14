"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var myList = [];
for (var i = 0; i < 1000; i++) {
    myList.push(i);
}
index_1.setState({ myList: myList });
setInterval(function () {
    myList.reverse();
    index_1.setState({ myList: myList });
}, 60);
index_1.mount(document.body, function (_) { return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<ul  >", "</ul>"], ["<ul  >", "</ul>"])), _.myList.map(function (item) { return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<li> ", " Item ", "</li>"], ["<li> ", " Item ", "</li>"])), index_1.key(item), item); })); });
var templateObject_2, templateObject_1;
//# sourceMappingURL=perf.js.map