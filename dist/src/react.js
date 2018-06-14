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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
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
var PerfTest = /** @class */ (function (_super) {
    __extends(PerfTest, _super);
    function PerfTest(props) {
        var _this = _super.call(this, props) || this;
        var myList = [];
        _this.state = { myList: myList };
        setTimeout(function () {
            _this.setState({ myList: buildData(10000) });
        }, 2000);
        return _this;
    }
    PerfTest.prototype.render = function () {
        var _ = this.state;
        console.log(this.state);
        return (React.createElement("table", { className: "table table-hover table-striped test-data" },
            React.createElement("tbody", null, _.myList.map(function (item) {
                return React.createElement("tr", { className: item.id === 'selected' ? 'danger' : '' },
                    React.createElement("td", { className: "col-md-1" },
                        "$",
                        item.id),
                    React.createElement("td", { className: "col-md-4" },
                        React.createElement("a", { href: "#", onClick: function (_) { } }, item.label)),
                    React.createElement("td", { className: "col-md-1" },
                        React.createElement("a", { href: "#", onClick: function (_) { } },
                            React.createElement("span", { className: "glyphicon glyphicon-remove", "aria-hidden": "true" }))),
                    React.createElement("td", { className: "col-md-6" }));
            }))));
    };
    return PerfTest;
}(React.Component));
ReactDOM.render(React.createElement(PerfTest, null), document.getElementById('content'));
//# sourceMappingURL=react.js.map