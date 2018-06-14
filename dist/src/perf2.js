"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function _random(max) {
    return Math.round(Math.random() * 1000) % max;
}
function buildData(count) {
    if (count === void 0) { count = 1000; }
    var adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
    var colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
    var nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];
    var data = new Array(1000);
    var id = 0;
    for (var i = 0; i < count; i++) {
        data[i] = {
            id: id++,
            label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)]
        };
    }
    return data;
}
var myList = [];
this.state = { myList: myList };
//  
//  
// onclick=${ _ => {}}
index_1.setState({ myList: myList });
// <td class="col-md-4"><a href="#" onclick=${ _ => {}} >${item.label}</a></td>
index_1.mount(document.body, function (_) {
    return index_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n<table class=\"table table-hover table-striped test-data\">\n<tbody>", "</tbody>\n</table>\n"], ["\n<table class=\"table table-hover table-striped test-data\">\n<tbody>",
        "</tbody>\n</table>\n"])), _.myList.map(function (item) {
        return index_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<tr class=", " ><td class=\"col-md-1\">\n        ", "</td><td class=\"col-md-4\"><a href=\"#\" onclick=", ">", "</a></td><td class=\"col-md-1\">\n        <a href=\"#\" onclick=", "  >\n          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a></td>\n        <td class=\"col-md-6\"></td>\n    </tr>"], ["<tr class=", " ><td class=\"col-md-1\">\n        ", "</td><td class=\"col-md-4\"><a href=\"#\" onclick=", ">", "</a></td><td class=\"col-md-1\">\n        <a href=\"#\" onclick=", "  >\n          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a></td>\n        <td class=\"col-md-6\"></td>\n    </tr>"])), item.id === 'selected' ? 'danger' : '', item.id, function (_) { }, item.label, function (_) { });
    }));
});
setTimeout(function () {
    index_1.setState({ myList: buildData(10000) });
}, 2000);
var templateObject_2, templateObject_1;
//# sourceMappingURL=perf2.js.map