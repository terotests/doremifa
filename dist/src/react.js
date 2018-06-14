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
var PerfTest = /** @class */ (function (_super) {
    __extends(PerfTest, _super);
    function PerfTest(props) {
        var _this = _super.call(this, props) || this;
        var myList = [];
        _this.state = { myList: myList };
        for (var i = 0; i < 1000; i++) {
            myList.push(i);
        }
        _this.setState({ myList: myList });
        setInterval(function () {
            myList.reverse();
            _this.setState({ myList: myList });
        }, 50);
        return _this;
    }
    PerfTest.prototype.render = function () {
        return (React.createElement("ul", null, this.state.myList.map(function (item) { return React.createElement("li", null,
            "Item ",
            item); })));
    };
    return PerfTest;
}(React.Component));
ReactDOM.render(React.createElement(PerfTest, null), document.getElementById('content'));
//# sourceMappingURL=react.js.map