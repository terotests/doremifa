"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var myList = [];
this.state = { myList: myList };
for (var i = 0; i < 1000; i++) {
    myList.push(i);
}
index_1.setState({ myList: myList });
setInterval(function () {
    myList.reverse();
    index_1.setState({ myList: myList });
}, 60);
var Benchmark = /** @class */ (function (_super) {
    __extends(Benchmark, _super);
    function Benchmark() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Benchmark.prototype.render = function () {
        var state = index_1.getState();
        return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<ul>", "</ul>"], ["<ul>", "</ul>"])), state.myList.map(function (item) { return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<li>Item ", "</li>"], ["<li>Item ", "</li>"])), item); }));
    };
    return Benchmark;
}(index_1.drmfComponent));
index_1.mount(document.body, function (_) { return index_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<h1>Benchmark</h1></h1><ul>", "</ul>"], ["<h1>Benchmark</h1></h1><ul>", "</ul>"])), _.myList.map(function (item) { return index_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<li>Item ", "</li>"], ["<li>Item ", "</li>"])), item); })); });
var templateObject_2, templateObject_1, templateObject_4, templateObject_3;
//# sourceMappingURL=perf.js.map